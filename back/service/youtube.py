import os
import eyed3
from shutil import rmtree
from flask import request, make_response, send_from_directory
from pytube import YouTube
from pytube.exceptions import PytubeError, RegexMatchError, VideoUnavailable
from http import HTTPStatus
from uuid import uuid4

from util import data, convert
from alias import Request, Resource
from error import MissingYouTubeLinkError, ResourceTypeError, ConvertionToMP3Error, TicketError


STORAGE_DIRECTORY = 'storage'

if not os.path.exists(STORAGE_DIRECTORY):
    os.makedirs(STORAGE_DIRECTORY)

else:
    rmtree(STORAGE_DIRECTORY)


def info():
    """ Get YouTube video info """

    try:
        youtube_link = request.args.get(Request.LINK)

        if not youtube_link:
            raise MissingYouTubeLinkError

        youtube_video = YouTube(youtube_link)

    except MissingYouTubeLinkError:
        return make_response('Missing YouTube link', HTTPStatus.BAD_REQUEST)
    
    except RegexMatchError:
        return make_response('Bad YouTube link', HTTPStatus.BAD_REQUEST)

    except VideoUnavailable:
        return make_response('YouTube video unavailable', HTTPStatus.BAD_REQUEST)

    streams = {
        'complete': youtube_video.streams.first(),
        'audio': youtube_video.streams.get_audio_only()
    }

    metadata = youtube_video.metadata.metadata

    video = {
        'link': youtube_link,
        'title': youtube_video.title,
        'author': youtube_video.author,
        'description': youtube_video.description,
        'views': youtube_video.views,
        'thumbnail': youtube_video.thumbnail_url,
        'length': youtube_video.length,
        'streams': { key: data.stream(value) for key, value in streams.items() },
        'music': data.music(metadata)
    }

    return make_response(video, HTTPStatus.OK)


def mount():
    """ Download YouTube resource to server """

    id = str(uuid4())
    storage = os.path.join(STORAGE_DIRECTORY, id)

    if not os.path.exists(storage):
        os.makedirs(storage)

    try:
        youtube_link = request.args.get(Request.LINK)
        resource = request.args.get(Request.RESOURCE)

        if not youtube_link:
            raise MissingYouTubeLinkError    

        if resource not in Resource._value2member_map_:
            raise ResourceTypeError

        youtube_video = YouTube(youtube_link)

        if resource == Resource.VIDEO:
            stream = youtube_video.streams.first()
            stream.download(output_path = storage, filename = youtube_video.title)
             
        else:
            stream = youtube_video.streams.get_audio_only()
            mp4 = stream.download(output_path = storage, filename = youtube_video.title)
            
            mp3 = mp4[:-4] + '.mp3'

            audio = convert.mp4_to_mp3(mp4, mp3)

            if not audio:
                raise ConvertionToMP3Error

            if resource == Resource.MUSIC:

                metadata = youtube_video.metadata.metadata
                tags = data.music(metadata)

                music = eyed3.load(audio)

                music.tag.title = tags.get('song', youtube_video.title)
                music.tag.artist = tags.get('artist')
                music.tag.album = tags.get('album')

                music.tag.save(version=eyed3.id3.ID3_DEFAULT_VERSION, encoding = 'utf-8')
            
        return make_response(id, HTTPStatus.CREATED)

    except (MissingYouTubeLinkError, PytubeError):
        rmtree(storage)
        return make_response('Bad YouTube resource', HTTPStatus.BAD_REQUEST)

    except ResourceTypeError:
        rmtree(storage)
        return make_response('Bad resource type', HTTPStatus.BAD_REQUEST)

    except ConvertionToMP3Error:
        rmtree(storage)
        return make_response('Failed to convert to music', HTTPStatus.INTERNAL_SERVER_ERROR)

    except:
        rmtree(storage)
        return make_response('Failed to mount required resource', HTTPStatus.INTERNAL_SERVER_ERROR)


def download():
    """ Download YouTube resource to client """

    try:
        ticket = request.args.get(Request.TICKET)

        if not ticket:
            raise TicketError

        storage = os.path.join(STORAGE_DIRECTORY, ticket)

        _, _, files = next(os.walk(storage))

        if not len(files) > 0:
            raise TicketError

        filename = files[0]
        response = send_from_directory(storage, filename, as_attachment = True)
        response.headers['x-suggested-filename'] = filename.encode('latin-1', 'ignore')

        return response

    except TicketError:
        return make_response('Ticket not found or expired', HTTPStatus.NOT_FOUND)

    except:
        return make_response('Failed to access ticket resource', HTTPStatus.INTERNAL_SERVER_ERROR)


def delete():
    """ Delete resource from server """

    try: 
        ticket = request.args.get(Request.TICKET, '')
        storage = os.path.join(STORAGE_DIRECTORY, ticket)

        if not ticket or not os.path.exists(storage):
            raise TicketError

        rmtree(storage)
        return make_response({}, HTTPStatus.OK)

    except (TicketError):
        return make_response('Ticket not found', HTTPStatus.NOT_FOUND)

    except:
        return make_response('Failed to delete ticket resource', HTTPStatus.INTERNAL_SERVER_ERROR)

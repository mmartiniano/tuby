import os
from shutil import rmtree
from flask import request, make_response, send_from_directory
from pytube import YouTube
from pytube.exceptions import PytubeError, RegexMatchError, VideoUnavailable
from http import HTTPStatus
from uuid import uuid4

from util import data, convert
from alias import Request, Resource


STORAGE_DIRECTORY = 'storage'

if not os.path.exists(STORAGE_DIRECTORY):
    os.makedirs(STORAGE_DIRECTORY)

else:
    rmtree(STORAGE_DIRECTORY)


def info():
    """ Get YouTube video info """

    try:
        youtube_link = request.args[Request.LINK]
        youtube_video = YouTube(youtube_link)

    except KeyError:
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
        youtube_link = request.args[Request.LINK]
        youtube_video = YouTube(youtube_link)

        resource = request.args[Request.RESOURCE]

        if resource not in Resource._value2member_map_:
            return make_response('Bad resource type', HTTPStatus.BAD_REQUEST)

        if resource == Resource.VIDEO:
            stream = youtube_video.streams.first()
             
        else:
            stream = youtube_video.streams.get_audio_only()

        stream.download(output_path = storage, filename = youtube_video.title)

        if resource == Resource.MUSIC:
            mp4 = os.path.join(storage, youtube_video.title + '.mp4')
            mp3 = os.path.join(storage, youtube_video.title + '.mp3')

            music = convert.mp4_to_mp3(mp4, mp3)

            if not music:
                return make_response('Failed to convert to music', HTTPStatus.INTERNAL_SERVER_ERROR)

        return make_response(id, HTTPStatus.CREATED)

    except (KeyError, PytubeError):
        return make_response('Bad YouTube resource', HTTPStatus.BAD_REQUEST)


def download():
    """ Download YouTube resource to client """

    ticket = request.args[Request.TICKET]
    storage = os.path.join(STORAGE_DIRECTORY, ticket)

    _, _, files = next(os.walk(storage))

    if not len(files) > 0:
        return make_response('Ticket not found or expired', HTTPStatus.NOT_FOUND)

    response = send_from_directory(storage, files[0], as_attachment = True)
    response.headers['x-suggested-filename'] = files[0]
    return response


def delete():
    """ Delete resource from server """

    ticket = request.args[Request.TICKET]
    storage = os.path.join(STORAGE_DIRECTORY, ticket)

    if not os.path.exists(storage):
        make_response('Ticket not found', HTTPStatus.NOT_FOUND)

    rmtree(storage)
    make_response({}, 200)
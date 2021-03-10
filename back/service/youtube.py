import os
from shutil import rmtree
from flask import request, make_response
from pytube import YouTube
from pytube.exceptions import PytubeError, RegexMatchError, VideoUnavailable
from http import HTTPStatus
from uuid import uuid4

from util import data
from alias import Request, Resource


STORAGE_DIRECTORY = 'storage'

if not os.path.exists(STORAGE_DIRECTORY):
    os.makedirs(STORAGE_DIRECTORY)

else:
    rmtree(STORAGE_DIRECTORY)


def info():
    """ Get YouTube video info """

    try:
        youtube_link = request.args[Request.LINK.value]
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
        'title': youtube_video.title,
        'author': youtube_video.author,
        'description': youtube_video.description,
        'views': youtube_video.views,
        'thumbnail': youtube_video.thumbnail_url,
        'length': youtube_video.length,
        'streams': { key: data.stream_data(value) for key, value in streams.items() },
        'music': data.music_data(metadata)
    }

    return make_response(video, HTTPStatus.OK)


def mount():
    """ Download YouTube resource to server """

    id = uuid4()
    storage = STORAGE_DIRECTORY + '/' + str(id)

    if not os.path.exists(storage):
        os.makedirs(storage)

    try:
        youtube_link = request.args[Request.LINK.value]
        youtube_video = YouTube(youtube_link)

        resource = request.args[Request.RESOURCE.value]

        if resource is Resource.AUDIO:
            stream = youtube_video.streams.get_audio_only()

        else:
            stream = youtube_video.streams.first()

        output = stream.download(
            output_path = storage,
            filename = youtube_video.title
        )

        return make_response({'resource': output}, HTTPStatus.CREATED)

    except (KeyError, PytubeError):
        return make_response('Bad YouTube resource', HTTPStatus.BAD_REQUEST)
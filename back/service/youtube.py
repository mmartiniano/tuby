from flask import request, make_response
from pytube import YouTube
from pytube.exceptions import PytubeError, RegexMatchError, VideoUnavailable
from http import HTTPStatus


def info():
    """ Get YouTube video info """

    try:
        youtube_link = request.args['v']
        youtube_video = YouTube(youtube_link)

    except KeyError:
        return make_response('Missing YouTube link', HTTPStatus.BAD_REQUEST)
    
    except RegexMatchError:
        return make_response('Ill formed YouTube link', HTTPStatus.BAD_REQUEST)

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
        'streams': { key: stream_data(value) for key, value in streams.items() },
        'music': music_data(metadata)
    }

    return make_response(video, HTTPStatus.OK)


def music_data(metadata):
    music_fields = ('Song', 'Album', 'Artist')

    return (
        {}
        if not metadata or not metadata[0].get('Song')
        else {
            key.lower(): value for key, value in metadata[0].items()
            if key in music_fields
        }
    )


def stream_data(stream):
    return {
        'resolution': stream.resolution,
        'size': stream.filesize
    }
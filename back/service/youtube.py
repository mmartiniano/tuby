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

    metadata = youtube_video.metadata.metadata

    music_data = (
        False
        if not metadata or not metadata[0].get('Song')
        else metadata[0]
    )

    return make_response({
        'title': youtube_video.title,
        'author': youtube_video.author,
        'description': youtube_video.description,
        'views': youtube_video.views,
        'thumbnail': youtube_video.thumbnail_url,
        'music': music_data
    }, HTTPStatus.OK)
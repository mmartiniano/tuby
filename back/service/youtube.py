from flask import request, abort
from pytube import YouTube
from pytube.exceptions import PytubeError, RegexMatchError, VideoUnavailable
from http import HTTPStatus


def info():
    """ Get YouTube video info """

    try:
        youtube_link = request.args['v']
        youtube_video = YouTube(youtube_link)

    except KeyError:
        abort(HTTPStatus.BAD_REQUEST, 'Missing YouTube link')
    
    except RegexMatchError:
        abort(HTTPStatus.BAD_REQUEST, 'Ill formed YouTube link')

    except VideoUnavailable:
        abort(HTTPStatus.BAD_REQUEST, 'YouTube video unavailable')

    metadata = youtube_video.metadata.metadata

    music_data = (
        False
        if not metadata or not metadata[0].get('Song')
        else metadata[0]
    )

    return {
        'title': youtube_video.title,
        'author': youtube_video.author,
        'description': youtube_video.description,
        'views': youtube_video.views,
        'thumbnail': youtube_video.thumbnail_url,
        'music': music_data
    }, HTTPStatus.OK
from flask import  Blueprint, make_response
from http import HTTPStatus
import os

from service import youtube


api = Blueprint('api', __name__, url_prefix = '/api')

@api.route('/')
def root():
    """ Root URL response """

    return make_response({}, HTTPStatus.OK)


api.add_url_rule('/info', view_func = youtube.info, methods = ['GET'])
api.add_url_rule('/mount', view_func = youtube.mount, methods = ['GET'])
api.add_url_rule('/download', view_func = youtube.download, methods = ['GET'])
api.add_url_rule('/delete', view_func = youtube.delete, methods = ['GET'])
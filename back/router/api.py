from flask import  Blueprint, abort
from http import HTTPStatus
import os

from service import youtube


api = Blueprint('api', __name__, url_prefix = '/api')

@api.route('/')
def root():
    """ Root URL response """

    return {}, HTTPStatus.OK


api.add_url_rule('/info', view_func = youtube.info, methods = ['GET'])
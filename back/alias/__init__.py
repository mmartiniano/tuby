from enum import Enum


class Request(Enum):
    LINK = 'l'
    RESOURCE = 'r'


class Resource(Enum):
    VIDEO = 'v'
    AUDIO = 'a'
    MUSIC = 'm'
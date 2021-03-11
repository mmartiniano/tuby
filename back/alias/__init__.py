from enum import Enum


class Request(str, Enum):
    LINK = 'l'
    RESOURCE = 'r'
    TICKET = 't'


class Resource(str, Enum):
    VIDEO = 'v'
    AUDIO = 'a'
    MUSIC = 'm'
class Error(Exception):
    """ Custom base error """
    pass

class MissingYouTubeLinkError(Error):
    """ Raised when YouTube video link passed to the mount route is missing """

class ResourceTypeError(Error):
    """ Raised when resource type passed to the mount route does not exist """
    pass

class ConvertionToMP3Error(Error):
    """ Raised when convertion from mp4 to mp3 fails """
    pass

class TicketError(Error):
    """ Raised when accessing ticket resource fails """
    pass
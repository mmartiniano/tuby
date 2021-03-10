def music(metadata):
    """ Extract music data from metadata """

    music_fields = ('Song', 'Album', 'Artist')

    return (
        {}
        if not metadata or not metadata[0].get('Song')
        else {
            key.lower(): value for key, value in metadata[0].items()
            if key in music_fields
        }
    )


def stream(stream):
    """ Extract useful info from stream """

    return {
        'resolution': stream.resolution if stream.resolution else stream.abr,
        'size': stream.filesize
    }
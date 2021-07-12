from moviepy.audio.io.AudioFileClip import AudioFileClip
import os

def mp4_to_mp3(mp4, mp3) :

        """ Create a mp3 file containing only mp4 audio, then removes original mp4 file """

        try :
            with AudioFileClip(mp4) as audio :
                audio.write_audiofile(mp3, verbose = False, logger = None)

            os.remove(mp4)

        except:
            return None

        return mp3
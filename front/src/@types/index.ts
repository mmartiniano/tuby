export interface IVideo {
    link?: string,
    title?: string,
    author?: string,
    length?: number,
    description?: string,
    views?: number,
    thumbnail?: string,
    music?: IMusic,
    streams?: IStreams
}

export interface IMusic {
    album?: string,
    song?: string,
    artist?: string
}

export interface IStreams {
    complete: IStream,
    audio: IStream
}

export interface IStream {
    resolution: string,
    size: number
}
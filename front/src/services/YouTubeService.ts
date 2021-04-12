import { AxiosResponse } from 'axios';
import API from './API';


export default class YouTubeService {
    public static ticket: string

    public static search(link: string) : Promise<AxiosResponse> {
        return API.get("/info?l=" + link)
        .then(response => {
            return response.data
        })
    }

    public static download(link: string, resource: string) : Promise<AxiosResponse> {
        return API.get(`/mount?l=${link}&r=${resource}`)
        .then(response => {
            YouTubeService.ticket = response.data
            return API.get(`/download?t=${YouTubeService.ticket}`, { responseType: 'blob' })
        })
    }

    public static delete(): void {
        API.get(`/delete?t=${YouTubeService.ticket}`)
    }
}
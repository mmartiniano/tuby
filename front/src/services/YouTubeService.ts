import { AxiosResponse } from 'axios';
import API from './API';


export default class YouTubeService {
    public static search(link: string) : Promise<AxiosResponse> {
        return API
        .get("/info?v=" + link)
        .then(response => {
            return response.data
        })
    }
}
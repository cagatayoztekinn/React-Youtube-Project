import axios from 'axios'

const key = "AIzaSyAGUOKQ7e6eJsMnnNMao48pOGFz31JtDo4";

const service = axios.create( {
    baseURL : 'https://youtube.googleapis.com/youtube/v3/'
})

export default function getVideos(searchInput: string) {
    const prm = {
        part: 'snippet',
        q: searchInput,
        maxResult: 6,
        key:key
    }
    return service.get("search", {params: prm})
}
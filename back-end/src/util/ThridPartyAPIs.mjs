import * as Util from "../util/Util.mjs";
import axios from "axios";
const YoutubeApiKey = () => Util.getConfigParam("ytb_api_key") ?? "1145141919810";

const YTBPlayListAPI = (listID, num) =>
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${num}&playlistId=${listID}&key=${YoutubeApiKey()}`;

const getYTBThumbnail = (id) => {
    return axios({
        method: 'GET',
        url: `${YTBPlayListAPI(id, 1)}`,
    })
}

const GetPlayListPic = async (listIDs) => {
    if (typeof listIDs === "string") listIDs = [listIDs];
    const tbnArr = [];
    const tbnArrResolution = ['maxres', 'standard', 'high', 'medium', 'default'];
    listIDs.map((ele) => {
        tbnArr.push(getYTBThumbnail(ele));
    })
    const values = await Promise.all(tbnArr);
    let index = 0;
    const images = [];
    values.forEach(ele => {
        for (let i = 0; i < tbnArrResolution.length; i++) {
            if (ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]]) {
                images.push(ele.data.items[0].snippet.thumbnails[tbnArrResolution[i]].url)
                index += 1;
                break;
            }
        }
    });
    return images;
}

const GetLecturesWithID= async (playlistId) => {
    const response = await axios({
        method: 'GET',
        url: `${YTBPlayListAPI(playlistId, 50)}`,
    })
    const tbnArrResolution = ['maxres', 'standard', 'high', 'medium', 'default'];
    
    if (response.data) {
        const lectures = response.data.items;
        return lectures;
    }
    else undefined;
}

export { YTBPlayListAPI, GetPlayListPic,GetLecturesWithID };



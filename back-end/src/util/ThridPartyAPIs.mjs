import * as Util from "../util/Util.mjs";
const YoutubeApiKey = () => Util.getConfigParam("ytb_api_key") ?? "1145141919810";

const YTBPlayListAPI = (listID, num) =>
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=
    ${num}&playlistId=
    ${listID}&key=
    ${YoutubeApiKey()}`;

export { YTBPlayListAPI };
const YTBAPIKEY = "AIzaSyCowMYVI1TaMsd3XwxA6Fgkdiaxacr4iUM";
const YTBPlayListAPI = (listID, num) => {
  return `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${num}&playlistId=${listID}&key=${YTBAPIKEY}`;
};
export { YTBPlayListAPI, YTBAPIKEY };

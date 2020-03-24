import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import youtubeSearchApi from '../../config/youtube.config';
const maxResults = 12;
const youtubeSearchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&type=video&key=${youtubeSearchApi}`;
// const youtubeSearchVideoURL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=${maxResults}&key=${youtubeSearchApi}`;
const youtubeSearchVideoURL = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&maxResults=${maxResults}&key=${youtubeSearchApi}`;

const onSearchReqeust = async (searcText, pageToken) =>
  await fetch(
    `${youtubeSearchURL}&q=${encodeURIComponent(searcText)}${pageToken}`
  )
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);

  const onSearchVideoTimeReqeust = async (videoIds) =>
  await fetch(
    `${youtubeSearchVideoURL}&id=${encodeURIComponent(videoIds)}`
  )
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);


function* searchRequest({ payload }) {
  const { searcText, pageToken } = payload;
  try {
    // search video
    const searchResult = yield call(
      onSearchReqeust,
      searcText,
      pageToken ? `&pageToken=${pageToken}` : ''
    );
    
    // get video time and other data
    let videoIds = '';
    searchResult.items.forEach(element => {
      videoIds+=element.id.videoId+",";
    });
    videoIds.substring(0, videoIds.length-1);

    const searchVideoTimeResult = yield call(
      onSearchVideoTimeReqeust,
      videoIds
    );

    let videoTimeMap = {};
    searchVideoTimeResult.items.forEach(ele=> {
      let {duration} = ele.contentDetails
      videoTimeMap[ele.id] = duration;
    });

    searchResult.items.forEach((ele, index) => {
      searchResult.items[index].duration = videoTimeMap[ele.id.videoId];
    });

    if (searchResult.items) {
      yield put(
        actions.youtubeSearchSuccess(
          searchResult.items,
          searchResult.pageInfo.totalResults,
          searchResult.nextPageToken,
          searchResult.prevPageToken,
        ),
      );
    } else {
      yield put(actions.youtubeSearchSuccess());
    }
  } catch (error) {
    yield put(actions.youtubeSearchSuccess());
  }
}
export default function* rootSaga() {
  yield all([takeEvery(actions.YOUTUBE_SEARCH, searchRequest)]);
}

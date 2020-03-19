import actions from './actions';

const initState = {
  searcText: 'React JS Conf',
  totalCount: 0,
  result: [],
  loading: false,
  error: false,
  // searchHistory: {}
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.YOUTUBE_SEARCH:
      return {
        ...state,
        loading: true,
        searcText: action.payload.searcText,
      };
    case actions.YOUTUBE_SUCCESS_RESULT:
      return {
        ...state,
        loading: false,
        error: false,
        result: action.result,
        totalCount: action.totalCount,
        prevPageToken: action.prevPageToken,
        nextPageToken: action.nextPageToken,
      };
    // case actions.YOUTUBE_HISTORY_RESULT:
    //   return {
    //     ...state,
    //     [`${action.searcText}_${action.pageToken}`]: action.searchResult,
    //   };
    case actions.YOUTUBE_ERROR_RESULT:
      return {
        ...state,
        loading: false,
        error: false,
        result: [],
      };
    default:
      return state;
  }
}

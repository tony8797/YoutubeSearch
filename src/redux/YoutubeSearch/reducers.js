import actions from './actions';

const initState = {
  searcText: '鬼滅',
  totalCount: 0,
  result: [],
  loading: false,
  error: false,
  favoriteIds: [],
  favoriteItemList: [],
  favoritePage: true,
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
    case actions.FAVORITE_LIST:
      return {
        ...state,
        favoriteIds: action.favoriteIds,
      };
    case actions.FAVORITE_ITEM_LIST:
        console.log({action});
        return {
          ...state,
          favoriteItemList: action.favoriteItemList,
        };
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

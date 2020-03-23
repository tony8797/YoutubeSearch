const actions = {
    YOUTUBE_SEARCH: 'YOUTUBE_SEARCH',
    YOUTUBE_SUCCESS_RESULT: 'YOUTUBE_SUCCESS_RESULT',
    YOUTUBE_ERROR_RESULT: 'YOUTUBE_ERROR_RESULT',
    FAVORITE_LIST: 'FAVORITE_LIST',
    FAVORITE_ITEM_LIST: 'FAVORITE_ITEM_LIST',
    youtubeSearch: searcText => ({
      type: actions.YOUTUBE_SEARCH,
      payload: { searcText },
    }),
    onPageChange: (searcText, pageToken) => ({
      type: actions.YOUTUBE_SEARCH,
      payload: { searcText, pageToken },
    }),
    youtubeSearchSuccess: (
      result,
      totalCount,
      nextPageToken,
      prevPageToken,
    ) => ({
      type: actions.YOUTUBE_SUCCESS_RESULT,
      result,
      totalCount,
      nextPageToken,
      prevPageToken,
    }),
    onChangeFavorite: (favoriteIds) => ({
      type: actions.FAVORITE_LIST,
      favoriteIds
    }),
    onChangeFavoriteItemList: (favoriteItemList) => ({
      type: actions.FAVORITE_ITEM_LIST,
      favoriteItemList
    }),
    youtubeSearchError: () => ({
      type: actions.YOUTUBE_ERROR_RESULT,
    }),
  };
  export default actions;
  
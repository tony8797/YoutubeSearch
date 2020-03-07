const actions = {
    YOUTUBE_SEARCH: 'YOUTUBE_SEARCH',
    YOUTUBE_SUCCESS_RESULT: 'YOUTUBE_SUCCESS_RESULT',
    YOUTUBE_ERROR_RESULT: 'YOUTUBE_ERROR_RESULT',
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
      prevPageToken
    ) => ({
      type: actions.YOUTUBE_SUCCESS_RESULT,
      result,
      totalCount,
      nextPageToken,
      prevPageToken,
    }),
    // youtubeSearchHistory: (
    //   searcText,
    //   pageToken,
    //   searchResult
    // )=> ({
    //     type: actions.YOUTUBE_HISTORY_RESULT,
    //     searcText,
    //     pageToken,
    //     searchResult
    // }),
    youtubeSearchError: () => ({
      type: actions.YOUTUBE_ERROR_RESULT,
    }),
  };
  export default actions;
  
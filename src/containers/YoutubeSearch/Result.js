import React from 'react';
import HelperText from '../../components/helper-text';
import { Button, Spin } from 'antd';
import moment from 'moment';
import {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
} from './YoutubeSearch.style';

function SearchList(result) {
  return (
    <YoutubeSearchListStyleWrapper className="youtubeResultList">
      {result.map(item => {
        const {
          publishedAt,
          title,
          channelTitle,
          thumbnails,
        } = item.snippet;
        
        const id = item.id.videoId;
        const updateDate = moment(publishedAt).format('YYYY/MM/DD');
        const onClickVideo = event => {
          event.preventDefault();
          event.stopPropagation();
          window.open(`https://www.youtube.com/watch?v=${item.id.videoId}`, '_blank');
        };

        return (
          <div key={id} className="singleVideoResult" onClick={onClickVideo}>
            <div className="videoThumb">
              <img alt="#" src={thumbnails.high.url} />
              <figcaption>
                <div id="videoHoverDescription">
                  <div>{title}</div>
                  <div><b>{`${channelTitle}`}</b></div>
                  <div>{updateDate}</div>
                </div>
              </figcaption>
            </div>

            <div className="videoDescription">
              <h3 className="videoName">
                <a href="# ">{`${title} `}</a>
              </h3>
            </div>
          </div>
        );
      })}
    </YoutubeSearchListStyleWrapper>
  );
}

function YoutubeResult({ YoutubeSearch, onPageChange }) {
  const {
    searcText,
    result,
    loading,
    error,
    nextPageToken,
    prevPageToken,
    totalCount,
  } = YoutubeSearch;
  if (!searcText) {
    return null;
  }
  if (loading) {
    return <Spin style={{ width: '100%' }}/>;
  }
  if (error || !totalCount) {
    return <HelperText text="THERE ARE SOME ERRORS" />;
  }
  if (result.length === 0) {
    return <HelperText text="No Result Found" />;
  }
  return (
    <YoutubeSearchStyleWrapper className="isoYoutubeSearchResult">
      <p className="totalResultFind">
        <span>{`${totalCount}`} videos found</span>
      </p>

      {SearchList(result)}

      <div className="youtubeSearchPagination">
        {prevPageToken ? (
          <Button onClick={() => onPageChange(searcText, prevPageToken)}>
            Previous
          </Button>
        ) : (
          ''
        )}
        {nextPageToken ? (
          <Button onClick={() => onPageChange(searcText, nextPageToken)}>
            Next
          </Button>
        ) : (
          ''
        )}
      </div>
    </YoutubeSearchStyleWrapper>
  );
}

export default YoutubeResult;

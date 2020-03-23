import React from 'react';
import HelperText from '../../components/helper-text';
import { Button, Spin } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import moment from 'moment';
import {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
} from './YoutubeSearch.style';

function SearchList({
  result, 
  onClickFavorite, 
  favoriteIds, 
  favoritePage, 
  favoriteItemList,
}) {
  let videoList = favoritePage ? favoriteItemList : result;
  console.log()
  return (
    <YoutubeSearchListStyleWrapper className="youtubeResultList">
      {videoList.map(item => {
        const {
          publishedAt,
          title,
          channelTitle,
          thumbnails,
          description,
        } = item.snippet;
        
        const id = item.id.videoId;
        const updateDate = moment(publishedAt).format('YYYY/MM/DD');
        const onClickVideo = event => {
          event.preventDefault();
          event.stopPropagation();
          window.open(`https://www.youtube.com/watch?v=${item.id.videoId}`, '_blank');
        };
        
        return (
          <div key={id} className="singleVideoResult" onClick={(e) => onClickFavorite(id, item, e)}>
            <div className="videoThumb">
              <img alt="#" src={thumbnails.high.url} />
              {
                favoriteIds.includes(id)?
                <HeartTwoTone className="favoriteIcon" twoToneColor="#eb2f96" />
                :
                <HeartTwoTone className="favoriteIcon" twoToneColor="black" />
              }
              <figcaption>
                <div id="videoHoverDescription">
                  <div>{description.length > 0 ? description : '無描述'}</div>
                  <div><b>{`${channelTitle}`}</b></div>
                  <div>{updateDate}</div>
                </div>
              </figcaption>
            </div>

            <div className="videoDescription" onClick={onClickVideo}>
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

function YoutubeResult({ 
  YoutubeSearch, 
  onPageChange, 
  onClickFavorite, 
  favoriteIds, 
  favoritePage,
  favoriteItemList,
}) {
  console.log(favoriteItemList);
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
  if (!favoritePage && (error || !totalCount)) {
    return <HelperText text="THERE ARE SOME ERRORS" />;
  }
  if (!favoritePage && result.length === 0) {
    return <HelperText text="No Result Found" />;
  }
  if(favoritePage && favoriteItemList.length === 0) {
    return <HelperText text="No Favorite Videos" />;
  }
  let totalResult = favoritePage? favoriteItemList.length: totalCount;
  return (
    <YoutubeSearchStyleWrapper className="isoYoutubeSearchResult">
      <p className="totalResultFind">
        <span>{`${totalResult}`} videos found</span>
      </p>

      <SearchList 
        result={result}
        onClickFavorite={onClickFavorite}
        favoriteIds={favoriteIds}
        favoritePage={favoritePage}
        favoriteItemList={favoriteItemList}
      />

      <div className="youtubeSearchPagination">
        {prevPageToken && !favoritePage ? (
          <Button onClick={() => onPageChange(searcText, prevPageToken)}>
            Previous
          </Button>
        ) : (
          ''
        )}
        {nextPageToken && !favoritePage ? (
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

import React from 'react';
import { Link } from 'react-router-dom';
import HelperText from '../../components/helper-text';
import { Button, Spin } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import PlayYoutubeVideo from './PlayYoutubeVideo';
import moment from 'moment';
import {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
} from './YoutubeSearch.style';

function SearchList({
  result, 
  onClickFavorite, 
  favoriteIds, 
  handleSelectedVideo,
}) {
  return (
    <YoutubeSearchListStyleWrapper className="youtubeResultList">
      {result.map(item => {
        const {
          publishedAt,
          title,
          channelTitle,
          thumbnails,
          description,
        } = item.snippet;

        let timeString = "";
        
        if(item.duration) {
          const { duration } = item;
          let timeStringArr = duration.replace(/PT|S/g, '').split(/H|M/g);
          // 影片時間補 0
          for(let i=0; i< timeStringArr.length; i++) {
            if(timeStringArr[i].length === '0') timeStringArr[i] = "00";
            else if(timeStringArr[i]< 10) timeStringArr[i] = `0${timeStringArr[i]}`;
          }
          timeString = timeStringArr.join(":");
        }

        const id = item.id.videoId;
        const updateDate = moment(publishedAt).format('YYYY/MM/DD');

        // 播放影片
        const onClick = event => {
          event.preventDefault();
          event.stopPropagation();
          handleSelectedVideo(item);
        };

        // 開啟影片分頁
        const onClickVideo = event => {
          event.preventDefault();
          event.stopPropagation();
          window.open(`https://www.youtube.com/watch?v=${item.id.videoId}`, '_blank');
        };

        // 收藏 icon 顏色
        let heartTwoToneColor = favoriteIds.includes(id)? "#eb2f96": "#000000";
        return (
          <div key={id} className="singleVideoResult" onClick={onClick}>
            <div className="videoThumb">
              <img alt="#" src={thumbnails.high.url} />
              <HeartTwoTone 
                className="favoriteIcon" 
                twoToneColor={heartTwoToneColor} 
                onClick={(e) => onClickFavorite(id, item, e)}
              />
              <div className="videoTime">{timeString}</div>
              <figcaption>
                <div id="videoHoverDescription">
                  <div className="desc">{description.length > 0 ? description : '無描述'}</div>
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
  favoriteItemList,
}) {
  const [selectedVideo, setSelectrdVideo] = React.useState(null);

  const handleCancel = () => {
    handleSelectedVideo(null);
  };
  const handleSelectedVideo = selectedVideo => {
    setSelectrdVideo(selectedVideo);
  };

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
        <span>搜尋結果 {`${totalCount}`} 部影片</span>
        <Link className="linkBtn" to={`/YoutubeSearch/favoriteList`}>
          <Button icon={<HeartTwoTone className="favoriteIcon" twoToneColor="#eb2f96" />}>收藏列表</Button>
        </Link>
      </p>

      {selectedVideo ? (
        <PlayYoutubeVideo
          selectedVideo={selectedVideo}
          handleCancel={handleCancel}
        />
      ) : (
        ''
      )}

      <SearchList 
        result={result}
        onClickFavorite={onClickFavorite}
        favoriteIds={favoriteIds}
        favoriteItemList={favoriteItemList}
        handleSelectedVideo={handleSelectedVideo}
      />

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

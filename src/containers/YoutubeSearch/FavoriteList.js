import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'antd';
import { HeartTwoTone, HomeOutlined } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import Box from '../../components/box';
import LayoutWrapper from '../../components/layoutWrapper';
import basicStyle from '../../assets/styles/constants';
import actions from '../../redux/YoutubeSearch/actions';
import NoAPIKey from '../../components/noApiKey';
import youtubeSearchApi from '../../config/youtube.config';
import PlayYoutubeVideo from './PlayYoutubeVideo';
import moment from 'moment';

import {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
} from './YoutubeSearch.style';

const { 
  onChangeFavorite,
  onChangeFavoriteItemList } = actions;

export default function FavoriteList() {
  const YoutubeSearch = useSelector(state => state.YoutubeSearch);
  const dispatch = useDispatch();
  const { favoriteIds, favoriteItemList } = YoutubeSearch;
  const [selectedVideo, setSelectrdVideo] = React.useState(null);
  const handleCancel = () => {
    handleSelectedVideo(null);
  };
  const handleSelectedVideo = selectedVideo => {
    setSelectrdVideo(selectedVideo);
  };

  // 播放影片
  const onClick = (item, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleSelectedVideo(item);
  };

  // 初始化收藏影片
  React.useEffect(() => {
    let initFavoriteIds = localStorage.getItem('favoriteIds');
    let initFavoriteItemList = localStorage.getItem('favoriteItemList');

    if(initFavoriteIds) {
      dispatch(onChangeFavorite(initFavoriteIds.split(',')));
      dispatch(onChangeFavoriteItemList( JSON.parse(initFavoriteItemList.split(',') )));
    }
  }, [dispatch]);

  // 收藏選取及取消
  const onClickFavorite = React.useCallback(
    (videoId, item, event) => {
      event.preventDefault();
      event.stopPropagation();
      if(favoriteIds.includes(videoId)) {
        favoriteIds.splice(favoriteIds.indexOf(videoId), 1);
        let indexOfList = favoriteItemList.findIndex((element) => element.id.videoId === videoId);
        favoriteItemList.splice(indexOfList, 1);
      } else {
        favoriteIds.push(videoId);
        favoriteItemList.push(item);
      }
      localStorage.setItem('favoriteIds', favoriteIds.join(','));
      localStorage.setItem('favoriteItemList', JSON.stringify(favoriteItemList));

      dispatch(onChangeFavorite(favoriteIds));
      dispatch(onChangeFavoriteItemList(favoriteItemList));
  },[dispatch, favoriteIds, favoriteItemList]);
  
  const { rowStyle, colStyle, gutter } = basicStyle;

  return (
    <>
      <PageHeader>
        <div className="favoriteHeadTitle">收藏列表</div>
      </PageHeader>
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            {youtubeSearchApi ? (
              <Box style={{ minHeight: 220 }}>
                <YoutubeSearchStyleWrapper className="isoYoutubeSearchResult">
                  <p className="totalResultFind">
                    <span>{`已收藏 ${favoriteItemList.length} 部影片`}</span>
                    <Link className="linkBtn" to={`/youtube`}>
                      <Button icon={<HomeOutlined className="favoriteIcon" twoToneColor="#eb2f96" />}>
                        首頁
                      </Button>
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

                  <YoutubeSearchListStyleWrapper className="youtubeResultList">
                    {
                      favoriteItemList.length > 0 ?
                        favoriteItemList.map(item => {
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

                            for(let i=0; i< timeStringArr.length; i++) {
                              if(timeStringArr[i].length === '0') timeStringArr[i] = "00";
                              else if(timeStringArr[i]< 10) timeStringArr[i] = `0${timeStringArr[i]}`;
                            }
                            timeString = timeStringArr.join(":");
                          }

                          const id = item.id.videoId;
                          const updateDate = moment(publishedAt).format('YYYY/MM/DD');

                          const onClickVideo = event => {
                            event.preventDefault();
                            event.stopPropagation();
                            window.open(`https://www.youtube.com/watch?v=${item.id.videoId}`, '_blank');
                          };
                          
                          // favorite icon color
                          let heartTwoToneColor = favoriteIds.includes(id)? "#eb2f96": "#000000";

                          return (
                            <div key={id} className="singleVideoResult" onClick={(e) => onClick(item, e)}>
                              <div className="videoThumb">
                                <img alt="#" src={thumbnails.high.url} />
                                  <HeartTwoTone className="favoriteIcon" 
                                    twoToneColor={heartTwoToneColor} 
                                    onClick={(e) => onClickFavorite(id, item, e)} 
                                  />
                                  <div className="videoTime">{timeString}</div>
                                <figcaption>
                                  <div id="videoHoverDescription">
                                    <div className="desc">{description.length > 0 ? description : 'no description'}</div>
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
                        }): null
                    }
                  </YoutubeSearchListStyleWrapper>
                </YoutubeSearchStyleWrapper>
              </Box>
            ) : (
              <NoAPIKey />
            )}
          </Col>
        </Row>
      </LayoutWrapper>
    </>
  );
}

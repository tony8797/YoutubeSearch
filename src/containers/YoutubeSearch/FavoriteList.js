import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import PageHeader from '../../components/pageHeader';
import Box from '../../components/box';
import LayoutWrapper from '../../components/layoutWrapper';
import basicStyle from '../../assets/styles/constants';
import actions from '../../redux/YoutubeSearch/actions';
import NoAPIKey from '../../components/noApiKey';
import youtubeSearchApi from '../../config/youtube.config';
import moment from 'moment';

import {
  YoutubeSearchListStyleWrapper,
  YoutubeSearchStyleWrapper,
} from './YoutubeSearch.style';

const { 
  // onPageChange, 
  onChangeFavorite,
  onChangeFavoriteItemList } = actions;

export default function FavoriteList() {
  const YoutubeSearch = useSelector(state => state.YoutubeSearch);
  const dispatch = useDispatch();
  const { favoriteIds, favoriteItemList } = YoutubeSearch;

  React.useEffect(() => {
    let initFavoriteIds = localStorage.getItem('favoriteIds');
    let initFavoriteItemList = localStorage.getItem('favoriteItemList');

    if(initFavoriteIds) {
      dispatch(onChangeFavorite(initFavoriteIds.split(',')));
      dispatch(onChangeFavoriteItemList( JSON.parse(initFavoriteItemList.split(',') )));
    }
  }, [dispatch]);

  const onClickFavorite = React.useCallback(
    (videoId, item, e) => {
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
        <div className="favoriteHeadTitle">Favorite List</div>
      </PageHeader>
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            {youtubeSearchApi ? (
              <Box style={{ minHeight: 220 }}>
                  <YoutubeSearchStyleWrapper className="isoYoutubeSearchResult">
                    <p className="totalResultFind">
                      <span>{`${favoriteItemList.length}`} favorite videos</span>
                    </p>

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
                          }):null
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

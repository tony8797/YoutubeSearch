import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import PageHeader from '../../components/pageHeader';
import Box from '../../components/box';
import LayoutWrapper from '../../components/layoutWrapper';
import { notification, Input } from 'antd';
import YoutubeResult from './Result';
import basicStyle from '../../assets/styles/constants';
import actions from '../../redux/YoutubeSearch/actions';
import NoAPIKey from '../../components/noApiKey';
import youtubeSearchApi from '../../config/youtube.config';

const { youtubeSearch, onPageChange, onChangeFavorite, onChangeFavoriteItemList } = actions;
const { Search } = Input;

export default function YoutubeSearch() {
  const YoutubeSearch = useSelector(state => state.YoutubeSearch);
  const dispatch = useDispatch();
  const { favoriteIds, favoriteItemList, favoritePage } = YoutubeSearch;
  const onSearch = React.useCallback(
    value => {
      if (value && value.length > 0) {
        dispatch(youtubeSearch(value));
      } else {
        notification('error', 'Please type something');
      }
    },
    [dispatch]
  );

  const handlePageChange = React.useCallback(
    (text, token) => {
      dispatch(onPageChange(text, token));
    },
    [dispatch]
  );

  React.useEffect(() => {
    let initFavoriteIds = localStorage.getItem('favoriteIds');
    let initFavoriteItemList = localStorage.getItem('favoriteItemList');
    if(initFavoriteIds) {
      dispatch(onChangeFavorite(initFavoriteIds.split(',')));
      dispatch(onChangeFavoriteItemList( checkJsonString(initFavoriteItemList) ));
    }
  }, [dispatch]);
  
  const checkJsonString = (string) => {
    try {
      return JSON.parse(string);
    } catch (e) {
      return []
    }
  }

  React.useEffect(() => {
    if(!favoritePage) {
      onSearch(YoutubeSearch.searcText);
    }
  }, [onSearch, YoutubeSearch.searcText]);

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
        {
          favoritePage? 
          <div className="favoriteHeadTitle">Favorite List</div>:
          <Search
            placeholder="Search on Youtube"
            defaultValue={YoutubeSearch.searcText}
            onSearch={onSearch}
            className="headerSearch"
          />
        }
      </PageHeader>
      <LayoutWrapper>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            {youtubeSearchApi ? (
              <Box style={{ minHeight: 220 }}>
                <YoutubeResult
                  YoutubeSearch={YoutubeSearch}
                  onPageChange={handlePageChange}
                  onClickFavorite={onClickFavorite}
                  favoriteIds={favoriteIds}
                  favoritePage={favoritePage}
                  favoriteItemList={favoriteItemList}
                />
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

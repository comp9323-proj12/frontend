import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { isEmpty } from 'lodash';
import { Button, List, Avatar, Modal, Image } from 'antd';
import ResearcherHomePage from './ResearcherHomePage';
import styles from './ResearcherList.less';
import ResearcherItem from './components/ResearcherItem';
import {
  TeamOutlined,
  TrophyOutlined,
  TrophyTwoTone,
  StarOutlined,
} from '@ant-design/icons';

const ResearcherList = ({
  dispatch,
  researchers,
  searchMeetingsResults,
  searchVideosResults,
  searchArticlesResults,
}) => {
  const [researcherList, setResearcherList] = useState([]);
  const [popularResearcherList, setPopularResearcherList] = useState([]);
  const [popularVideoList, setPopularVideoList] = useState([]);
  const [modalItem, setModalItem] = useState({});
  const [modalCategory, setModalCategory] = useState('');
  const [isItemModalVisible, setIsItemModalVisible] = useState(false);
  const [popularMeetingList, setPopularMeetingList] = useState([]);
  const [popularArticleList, setPopularArticleList] = useState([]);
  useEffect(() => {
    setResearcherList(researchers);
  }, [researchers]);
  useEffect(async () => {
    dispatch({
      type: 'video/searchVideos',
      payload: {
        subCategory: 'title',
        value: '',
      },
    });
    dispatch({
      type: 'article/searchArticles',
      payload: {
        subCategory: 'title',
        value: '',
      },
    });
    dispatch({
      type: 'meeting/searchMeetings',
      payload: {
        subCategory: 'title',
        value: '',
      },
    });
  }, []);
  useEffect(() => {
    if (
      !isEmpty(searchArticlesResults) &&
      !isEmpty(searchMeetingsResults) &&
      !isEmpty(searchVideosResults)
    ) {
      handlePopularItems();
    }
  }, [searchArticlesResults, searchMeetingsResults, searchVideosResults]);
  const renderItemModal = (item, category) => {
    setModalItem(item);
    setModalCategory(category);
    setIsItemModalVisible(true);
    if (!isEmpty(item)) {
      if (item.text) {
        dispatch({
          type: 'question/fetchQuestionsByArticleId',
          payload: item._id,
        });
      } else if (isEmpty(item.instructor)) {
        dispatch({
          type: 'question/fetchQuestionsByVideoId',
          payload: item._id,
        });
      }
    }
  };
  const handlePopularItems = () => {
    const sortedMeetings = searchMeetingsResults.sort(
      (a, b) => a.like.length - b.like.length,
    );
    const popularMeeting =
      sortedMeetings.length >= 8
        ? shuffle(sortedMeetings.slice(-8)).slice(0, 4)
        : sortedMeetings.length >= 4
        ? shuffle(sortedMeetings).slice(0, 4)
        : shuffle(sortedMeetings);
    setPopularMeetingList(popularMeeting);

    const sortedVideos = searchVideosResults.sort(
      (a, b) => a.like.length - b.like.length,
    );
    const popularVideo =
      sortedVideos.length >= 8
        ? shuffle(sortedVideos.slice(-8)).slice(0, 4)
        : sortedVideos.length >= 4
        ? shuffle(sortedVideos).slice(0, 4)
        : shuffle(sortedVideos);
    setPopularVideoList(popularVideo);

    const sortedArticles = searchArticlesResults.sort(
      (a, b) => a.like.length - b.like.length,
    );
    const popularArticle =
      sortedArticles.length >= 8
        ? shuffle(sortedArticles.slice(-8)).slice(0, 4)
        : sortedArticles.length >= 4
        ? shuffle(sortedArticles).slice(0, 4)
        : shuffle(sortedArticles);
    setPopularArticleList(popularArticle);

    const popularUsers = popularArticle
      .concat(popularVideo)
      .concat(popularMeeting)
      .map((item) => {
        return isEmpty(item.author) ? item.instructor : item.author;
      })
      .filter((user, index, array) => {
        if (!isEmpty(user)) {
          return array.findIndex((item) => item._id === user._id) === index;
        } else return false;
      });
    const shuffleUser = shuffle(popularUsers);
    setPopularResearcherList(
      shuffleUser.length < 4 ? shuffleUser : shuffleUser.slice(0, 4),
    );
  };
  const handleCancel = () => {
    setIsItemModalVisible(false);
  };
  const renderImage = (item) => {
    const type = !isEmpty(item.instructor)
      ? 'meeting'
      : item.link
      ? 'video'
      : 'article';
    return item.category ? (
      <Image
        preview={false}
        className={styles['search-modal__image']}
        src={require(`@/images/${type}-${item.category}.png`)}
      />
    ) : null;
  };
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };
  const handleClickResearcher = (item) => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'researcher',
        activateContent: item,
      },
    });
  };
  return (
    <>
      <List
        header={
          <h2>
            <TeamOutlined /> Researchers
          </h2>
        }
        className={styles['researcher-list']}
        size="large"
        grid={{
          gutter: 32,
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        pagination={{
          pageSize: 8,
        }}
        dataSource={researcherList}
        renderItem={(item) => (
          <List.Item
            className={styles['researcher-list__item']}
            key={item.title}
            onClick={() => {
              handleClickResearcher(item);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar> {item.name[0]}</Avatar>}
              title={item.name}
              description={item.researchArea}
            />
            <span className={styles['researcher-list__publications']}>
              {item.publications}
            </span>
          </List.Item>
        )}
      />
      <List
        header={
          <h2>
            <TrophyOutlined twoToneColor={'yellow'} /> Popular Researchers
          </h2>
        }
        className={styles['researcher-list']}
        size="large"
        grid={{
          gutter: 32,
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        pagination={false}
        dataSource={popularResearcherList}
        renderItem={(item) => (
          <List.Item
            className={styles['researcher-list__item']}
            key={item.title}
            onClick={() => {
              handleClickResearcher(item);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar> {item.name[0]}</Avatar>}
              title={item.name}
              description={item.researchArea}
            />
            <span className={styles['researcher-list__publications']}>
              {item.publications}
            </span>
          </List.Item>
        )}
      />
      <List
        header={
          <h2>
            <TrophyTwoTone twoToneColor={'red'} /> Popular Videos
          </h2>
        }
        className={styles['researcher-list']}
        size="large"
        grid={{
          gutter: 32,
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        pagination={false}
        dataSource={popularVideoList}
        renderItem={(item) => (
          <List.Item
            className={styles['researcher-list__item']}
            key={item.title}
            onClick={() => {
              renderItemModal(item, 'video');
            }}
          >
            <List.Item.Meta
              className={styles['researcher-list__item--material']}
              title={item.title}
              description={item.description}
            />
            {renderImage(item)}
          </List.Item>
        )}
      />
      <List
        header={
          <h2>
            <TrophyTwoTone twoToneColor={'green'} /> Popular Meetings
          </h2>
        }
        className={styles['researcher-list']}
        size="large"
        grid={{
          gutter: 32,
          xs: 2,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        pagination={false}
        dataSource={popularMeetingList}
        renderItem={(item) => (
          <List.Item
            className={styles['researcher-list__item']}
            key={item.title}
            onClick={() => {
              renderItemModal(item, 'meeting');
            }}
          >
            <List.Item.Meta
              className={styles['researcher-list__item--material']}
              title={item.title}
              description={item.description}
            />
            {renderImage(item)}
          </List.Item>
        )}
      />
      {isItemModalVisible && (
        <ResearcherItem
          visible={isItemModalVisible}
          content={modalItem}
          category={modalCategory}
          user={
            !isEmpty(modalItem.author) ? modalItem.author : modalItem.instructor
          }
          handleCancel={handleCancel}
        ></ResearcherItem>
      )}
    </>
  );
};
export default connect(
  ({
    user: { researchers },
    video: { searchVideosResults },
    meeting: { searchMeetingsResults },
    article: { searchArticlesResults },
  }) => ({
    researchers,
    searchArticlesResults,
    searchMeetingsResults,
    searchVideosResults,
  }),
)(ResearcherList);

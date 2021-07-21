import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { List } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
const researchItem = ({
  dispatch,
  key,
  user,
  articles,
  videos,
  meetings,
  currentPage,
}) => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    keyMap[key]();
  }, key);
  useEffect(() => {
    setListData(articles);
  }, articles);
  useEffect(() => {
    setListData(videos);
  }, videos);
  useEffect(() => {
    setListData(meetings);
  }, meetings);
  const renderItemPage = (item) => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'researcherItem',
        activeContent: item,
      },
    });
  };
  const keyMap = {
    text: async () => {
      await dispatch({
        type: 'articles/fetchArticlesByUserId',
        payload: user._id,
      });
    },
    video: async () => {
      await dispatch({
        type: 'videos/fetchVideosByUserId',
        payload: user._id,
      });
    },
    meeting: async () => {
      await dispatch({
        type: 'meetings/fetchMeetingByUserId',
        payload: user,
      });
    },
  };
  return (
    <>
      <Row>文章</Row>
      <Row>评论区</Row>
    </>
  );
};

export default connect(({ login: { currentUser }, page: { currentPage } }) => ({
  currentUser,
  currentPage,
}))(researchItem);
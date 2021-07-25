import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { List, Tag } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
import ResearcherItem from '@/pages/Researcher/components/ResearcherItem';
const ResearchTabs = ({
  dispatch,
  content,
  user,
  userArticles,
  userVideos,
  userMeetings,
  currentPage,
}) => {
  const [listData, setListData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const handleCancel = () => {
    setVisible(false);
  };
  const contentMap = {
    article: async () => {
      console.log('user._iduser._id', user);
      await dispatch({
        type: 'article/fetchArticlesByUserId',
        payload: user._id,
      });
      // setListData(userArticles);
    },
    video: async () => {
      await dispatch({
        type: 'video/fetchVideosByUserId',
        payload: user._id,
      });
      // setListData(userVideos);
    },
    meeting: async () => {
      await dispatch({
        type: 'meeting/fetchMeetingByUserId',
        payload: user._id,
      });
      // setListData(userMeetings);
    },
  };
  useEffect(() => {
    contentMap[content]();
  }, []);
  useEffect(() => {
    setListData(userArticles);
  }, [userArticles]);
  useEffect(() => {
    setListData(userVideos);
  }, [userVideos]);
  useEffect(() => {
    setListData(userArticles);
  }, [userMeetings]);
  const renderItemModal = (item) => {
    setModalItem(item);
    setVisible(true);
  };
  console.log('content', content);
  console.log('listData', listData);
  return (
    <>
      <List
        itemLayout="vertical"
        pagination={{
          pageSize: 4,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            key={item._id}
            onClick={() => {
              renderItemModal(item);
            }}
            extra={item.tags.map((tag, index) => {
              return (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              );
            })}
          >
            {item.text && (
              <List.Item.Meta
                title={item.title}
                description={
                  item.text.length > 50
                    ? item.text.slice(50) + '...'
                    : item.text
                }
              />
            )}
          </List.Item>
        )}
      ></List>
      <ResearcherItem
        visible={visible}
        content={modalItem}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default connect(
  ({
    login: { currentUser },
    page: { currentPage },
    article: { userArticles },
  }) => ({
    currentUser,
    currentPage,
    userArticles,
  }),
)(ResearchTabs);

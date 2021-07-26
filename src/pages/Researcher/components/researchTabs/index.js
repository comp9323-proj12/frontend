import React, { useState, useEffect, useRef } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { List, Tag, Button, Modal } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
import ResearcherItem from '@/pages/Researcher/components/ResearcherItem';
import moment from 'moment';
import { isEmpty } from 'lodash';
const ResearchTabs = ({
  dispatch,
  content,
  user,
  userArticles,
  userVideos,
  userMeetings,
  currentPage,
  isProfile,
}) => {
  const [listData, setListData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const handleCancel = () => {
    setVisible(false);
  };
  const handleEdit = () => {
    // const editMap = {
    // 	article:
    // }
  };
  const handleDelete = (item) => {
    const deleteMap = {
      article: async () => {
        console.log('deleteitem', item);
        await dispatch({
          type: 'article/deleteArticle',
          payload: item._id,
        });
        dispatch({
          type: 'article/fetchArticlesByUserId',
          payload: user._id,
        });
      },
      video: async () => {
        console.log('deleteitem', item);
        await dispatch({
          type: 'video/deleteVideo',
          payload: item._id,
        });
        dispatch({
          type: 'video/fetchVideosByUserId',
          payload: user._id,
        });
      },
      meeting: async () => {
        console.log('deleteitem', item);
        await dispatch({
          type: 'meeting/deleteMeeting',
          payload: item._id,
        });
        dispatch({
          type: 'meeting/fetchMeetingsByUserId',
          payload: user._id,
        });
      },
    };
    deleteMap[content]();
  };
  const contentMap = {
    article: async () => {
      console.log('user._iduser._id', user);
      await dispatch({
        type: 'article/fetchArticlesByUserId',
        payload: user._id,
      });
      console.log('userArticlesuserArticles', userArticles);
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
    console.log('1123');
    contentMap[content]();
  }, []);
  useEffect(() => {
    const tabMap = {
      article: userArticles,
      video: userVideos,
      meeting: userMeetings,
    };
    setListData(tabMap[content]);
  }, [content]);
  useEffect(() => {
    setListData(userArticles);
  }, [userArticles]);
  useEffect(() => {
    setListData(userVideos);
  }, [userVideos]);
  useEffect(() => {
    setListData(userMeetings);
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
            extra={item?.tags?.map((tag, index) => {
              return (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              );
            })}
          >
            <Tag>
              {'Create time: ' + moment(item.createTime).format('DD/MM/YYYY')}
            </Tag>
            {item.startTime && (
              <Tag>
                {'Start time: ' +
                  moment(item.startTime).format('DD/MM/YYYY HH:mm:ss')}
              </Tag>
            )}
            {!isEmpty(item.students) &&
              item.students.map((student) => {
                return <Tag>{student}</Tag>;
              })}
            {item.text && (
              <List.Item.Meta
                title={item.title}
                description={
                  item.text.length > 50
                    ? item.text.slice(0, 50) + '...'
                    : item.text
                }
              />
            )}
            {item.description && (
              <List.Item.Meta
                title={item.title}
                description={
                  item?.description?.length > 50
                    ? item.text.slice(0, 50) + '...'
                    : item.text
                }
              />
            )}
            {isProfile && (
              <Button
                onClick={() => {
                  handleEdit(item);
                }}
              >
                edit
              </Button>
            )}
            {isProfile && (
              <Button
                onClick={() => {
                  handleDelete(item);
                }}
              >
                delete
              </Button>
            )}
          </List.Item>
        )}
      ></List>
      <ResearcherItem
        visible={visible}
        content={modalItem}
        handleCancel={handleCancel}
      />
      <Modal></Modal>
    </>
  );
};

export default connect(
  ({
    login: { currentUser },
    page: { currentPage },
    article: { userArticles },
    video: { userVideos },
    meeting: { userMeetings },
  }) => ({
    currentUser,
    currentPage,
    userArticles,
    userMeetings,
    userVideos,
  }),
)(ResearchTabs);

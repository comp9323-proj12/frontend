import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { List, Row, Col, Modal, Form, Button, Input, Image } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
import { isEmpty } from 'lodash';
import moment from 'moment';
import {
  FieldTimeOutlined,
  CommentOutlined,
  LikeFilled,
  HeartFilled,
  ContainerOutlined,
} from '@ant-design/icons';

/**
 * @description modal component to display infos of all sorts of items include meeting, video and article
 * @param {object} user info of user who is the master of this item.
 * @param {boolean} visible modal is visible or not
 * @param {object} content info of showed item
 * @param {string} category item is a meeting, video or article
 * @param {function} handleCancel close modal callback function
 * @param {Array<object>} questions questions with replies of corresponeding item
 */
const ResearcherItem = ({
  dispatch,
  user,
  visible,
  content,
  category,
  handleCancel,
  questions,
}) => {
  const [extendInputIndex, setExtendInputIndex] = useState('');
  const currentUser = getSessionStorage('currentUser');
  const handleReplySubmit = async (value) => {
    await dispatch({
      type: 'question/createReply',
      payload: {
        whoPost: currentUser._id,
        question: extendInputIndex,
        text: value,
      },
    });
    if (content.text) {
      dispatch({
        type: 'question/fetchQuestionsByArticleId',
        payload: content._id,
      });
    } else if (isEmpty(content.instructor)) {
      dispatch({
        type: 'question/fetchQuestionsByVideoId',
        payload: content._id,
      });
    }
    setExtendInputIndex('');
  };
  const contentMap = {
    article: async () => {
      await dispatch({
        type: 'article/fetchArticlesByUserId',
        payload: user._id,
      });
    },
    video: async () => {
      await dispatch({
        type: 'video/fetchVideosByUserId',
        payload: user._id,
      });
    },
    meeting: async () => {
      await dispatch({
        type: 'meeting/fetchMeetingsByUserId',
        payload: user._id,
      });
    },
  };
  const handleQuestionSubmit = (value) => {
    if (content.text) {
      dispatch({
        type: 'question/createQuestion',
        payload: {
          text: value,
          whoPost: currentUser._id,
          whichArticle: content._id,
        },
      });
    } else if (isEmpty(content.instructor)) {
      dispatch({
        type: 'question/createQuestion',
        payload: {
          text: value,
          whoPost: currentUser._id,
          whichVideo: content._id,
        },
      });
    }
  };
  const renderImage = (item) => {
    const type = item.instructor ? 'meeting' : item.link ? 'video' : 'article';
    return item.category ? (
      <Image
        preview={false}
        src={require(`@/images/${type}-${item.category}.png`)}
      />
    ) : null;
  };
  const handleLike = async (e) => {
    e.stopPropagation();
    let newLike = content.like;
    newLike.push(currentUser._id);
    const likeMap = {
      meeting: async () => {
        await dispatch({
          type: 'meeting/updateMeeting',
          payload: {
            ...content,
            like: newLike,
          },
        });
      },
      article: async () => {
        await dispatch({
          type: 'article/updateArticle',
          payload: {
            ...content,
            like: newLike,
          },
        });
      },
      video: async () => {
        await dispatch({
          type: 'video/updateVideo',
          payload: {
            ...content,
            like: newLike,
          },
        });
      },
    };
    await likeMap[category]();
    contentMap[category]();
  };
  return (
    <Modal
      visible={visible}
      title={
        <>
          <h1>{content.title}</h1>
          {user._id !== currentUser._id &&
            !content?.like?.includes(currentUser._id) && (
              <Button
                className={styles['researcher-item__like']}
                onClick={(e) => {
                  handleLike(e);
                }}
              >
                <LikeFilled /> Like?
              </Button>
            )}
          {user._id !== currentUser._id &&
            content?.like?.includes(currentUser._id) && (
              <span className={styles['researcher-item__like']}>
                <HeartFilled /> Like!
              </span>
            )}
        </>
      }
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      className={styles['researcher-item']}
    >
      <Row className={styles['researcher-item__main--info']}>
        <h4>{content.title}</h4>
        {!isEmpty(content.category) && (
          <>
            <ContainerOutlined />
            <span>Category: {content.category}</span>
          </>
        )}
        <FieldTimeOutlined />
        <span>
          Create time: {moment(content.createTime).format('DD/MM/YYYY')}
        </span>
        <span>Author: {user.name}</span>
      </Row>
      {content.text && (
        <p className={styles['researcher-item__main--content']}>
          <span dangerouslySetInnerHTML={{ __html: content.text }} />
        </p>
      )}
      {content.description && (
        <p className={styles['researcher-item__main--description']}>
          {content.description}
        </p>
      )}
      {content.category && category !== 'article' && renderImage(content)}
      {content.link && (
        <a
          target="_blank"
          href={
            content.link.startsWith('http://') ||
            content.link.startsWith('https://')
              ? content.link
              : `http://${content.link}`
          }
          className={styles['researcher-item__main--description']}
        >
          {content.link}
        </a>
      )}
      {isEmpty(content.instructor) && (
        <Row className={styles['researcher-item__comment']}>
          <List
            itemLayout="vertical"
            pagination={{
              pageSize: 4,
            }}
            dataSource={questions}
            renderItem={(que) => {
              return (
                <List.Item
                  key={que._id}
                  className={styles['researcher-item__questions']}
                >
                  <Row>
                    <p>{que.text}</p>
                    <span>{que.whoPost.name}</span>
                    <span>{moment(que.createTime).format('DD/MM/YYYY')}</span>
                  </Row>
                  {que.replies.map((reply) => {
                    return (
                      <Row className={styles['researcher-item__replies']}>
                        <p>{reply.text}</p>
                        <span>{reply.whoPost.name}</span>
                        <span>
                          {moment(reply.createTime).format('DD/MM/YYYY')}
                        </span>
                      </Row>
                    );
                  })}
                  <Button
                    onClick={() => {
                      setExtendInputIndex(que._id);
                    }}
                  >
                    <CommentOutlined />
                    Reply
                  </Button>
                  {extendInputIndex === que._id && (
                    <Input.TextArea
                      onPressEnter={(e) => {
                        handleReplySubmit(e.target.value);
                      }}
                    />
                  )}
                </List.Item>
              );
            }}
          ></List>
          <Input
            placeholder={'Ask Question'}
            onPressEnter={(e) => {
              handleQuestionSubmit(e.target.value);
              e.value = '';
            }}
          />
        </Row>
      )}
    </Modal>
  );
};

export default connect(
  ({
    login: { currentUser },
    page: { currentPage, activateContent },
    question: { questions },
  }) => ({
    currentUser,
    currentPage,
    activateContent,
    questions,
  }),
)(ResearcherItem);

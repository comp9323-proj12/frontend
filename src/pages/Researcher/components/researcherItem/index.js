import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { List, Row, Col, Modal, Form, Button, Input } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
import { isEmpty } from 'lodash';
import moment from 'moment';
const ResearcherItem = ({
  dispatch,
  user,
  articles,
  videos,
  meetings,
  activateContent,
  currentPage,
  visible,
  content,
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
  return (
    <Modal
      visible={visible}
      title={content.title}
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={null}
      width={1200}
      className={styles['researcher-item']}
    >
      <Row className={styles['researcher-item__main--info']}>
        <h4>{content.title}</h4>
        <span>
          Create time: {moment(content.createTime).format('DD/MM/YYYY')}
        </span>
        <span>Author: {user.name}</span>
      </Row>
      {content.text && (
        <p className={styles['researcher-item__main--content']}>
          {content.text}
        </p>
      )}
      {content.description && (
        <p className={styles['researcher-item__main--description']}>
          {content.description}
        </p>
      )}
      {content.link && isEmpty(content.instructor) && (
        <img src={require('@/images/video-thumbnail.jpeg')} />
      )}
      {content.link && (
        <p className={styles['researcher-item__main--description']}>
          Link: {content.link}
        </p>
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

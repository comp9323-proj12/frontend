import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { List, Row, Col, Modal, Form, Input } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
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
}) => {
  const [extendInputIndex, setExtendInputIndex] = useState('');
  console.log('content', content);
  const handleReplySubmit = (value) => {
    dispatch({});
  };
  const handleQuestionSubmit = (value) => {
    dispatch({
      // type:,
      // payload:,
    });
  };
  return (
    <Modal
      visible={visible}
      title={content.title}
      destroyOnClose={true}
      onCancel={handleCancel}
      footer={null}
      width={1200}
    >
      <Row>
        <h4>{content.title}</h4>
        <span>
          Create time: {moment(content.createTime).format('DD/MM/YYYY')}
        </span>
        <span>Author: {user.name}</span>
      </Row>
      {content.text && <p>{content.text}</p>}
      <Row>
        <List
          itemLayout="vertical"
          pagination={{
            pageSize: 4,
          }}
          dataSource={content.question}
          renderItem={(que) => {
            return (
              <List.Item key={que._id}>
                {console.log(que)}
                <Button onClick={setExtendInputIndex(que._id)}>Reply</Button>
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
          }}
        />
      </Row>
    </Modal>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activateContent } }) => ({
    currentUser,
    currentPage,
    activateContent,
  }),
)(ResearcherItem);

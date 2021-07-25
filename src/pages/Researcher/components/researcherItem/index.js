import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { List, Row, Col, Modal } from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
const researchItem = ({
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
      </Row>
      <Row>text author createTime tags question recap</Row>
      <Row>评论区</Row>
    </Modal>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activateContent } }) => ({
    currentUser,
    currentPage,
    activateContent,
  }),
)(researchItem);

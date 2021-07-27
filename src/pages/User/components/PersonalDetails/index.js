import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import styles from './index.less';
export const PersonalDetails = ({ user }) => {
  return (
    <Row>
      <Col span={8} className={styles['personal-details__info--main']}>
        <Avatar src={user.avatar} />
        {user.name}
      </Col>
      <Col span={16} className={styles['personal-details__info--sub']}>
        <h4>Research Area</h4>
        {user?.researchArea?.map((item) => {
          <Tag>{item}</Tag>;
        })}
        {/* TODO: 这块显示他的什么信息 */}
        <h4>啥信息</h4>
        <p>啥信息</p>
      </Col>
    </Row>
  );
};

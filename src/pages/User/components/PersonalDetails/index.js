import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
import {
  BookOutlined,
  ReadOutlined,
  GlobalOutlined,
  MailOutlined,
} from '@ant-design/icons';
/**
 * @description component shows personal detail info
 * @param {object} user info of user
 */
export const PersonalDetails = ({ user }) => {
  return (
    <Row className={styles['personal-details']}>
      <Col span={8} className={styles['personal-details__info--main']}>
        <Avatar> {user.name[0]}</Avatar>
        <h4>{user.name}</h4>
        <span>
          <MailOutlined />
          {user.email}
        </span>
        <span>
          <GlobalOutlined />
          {user.country}
        </span>
      </Col>
      <Col span={16} className={styles['personal-details__info--sub']}>
        {!isEmpty(user?.researchArea) && (
          <h4>
            {' '}
            <ReadOutlined /> Research Area
          </h4>
        )}
        {user?.researchArea?.map((item) => {
          return <Tag>{item}</Tag>;
        })}

        {!isEmpty(user?.publications) && (
          <h4>
            {' '}
            <BookOutlined /> Publications
          </h4>
        )}
        {user?.publications?.map((item) => {
          return <Tag>{item}</Tag>;
        })}
      </Col>
    </Row>
  );
};

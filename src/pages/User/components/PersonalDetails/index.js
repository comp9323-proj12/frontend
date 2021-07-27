import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Avatar } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
export const PersonalDetails = ({ user }) => {
  console.log('user', user);
  return (
    <Row className={styles['personal-details']}>
      <Col span={8} className={styles['personal-details__info--main']}>
        <Avatar> {user.name[0]}</Avatar>
        <h4>{user.name}</h4>
        <span>{user.email}</span>
        <span>{user.country}</span>
      </Col>
      <Col span={16} className={styles['personal-details__info--sub']}>
        {!isEmpty(user?.researchArea) && <h4>Research Area</h4>}
        {user?.researchArea?.map((item) => {
          return <Tag>{item}</Tag>;
        })}

        {!isEmpty(user?.publications) && <h4>Publications</h4>}
        {user?.publications?.map((item) => {
          return <Tag>{item}</Tag>;
        })}
      </Col>
    </Row>
  );
};

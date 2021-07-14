import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import LoginPage from './User/Login';
import { isEmpty } from 'lodash';

const IndexPage = ({ dispatch, currentUser }) => {
  if (isEmpty(currentUser)) {
    return <LoginPage />;
  } else {
    return <p>login success!!!!</p>;
  }
};

export default connect(({ login: { currentUser } }) => ({
  currentUser,
}))(IndexPage);

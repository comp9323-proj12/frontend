import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import Login from './User/Login';
import { isEmpty } from 'lodash';
import Home from './Home';

const IndexPage = ({ dispatch, currentUser }) => {
  return isEmpty(currentUser) ? <Login /> : <Home />;
};

export default connect(({ login: { currentUser } }) => ({
  currentUser,
}))(IndexPage);

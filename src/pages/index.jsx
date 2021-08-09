import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import styles from './index.less';
import Login from './User/Login';
import { isEmpty } from 'lodash';
import Home from './Home';
import { getSessionStorage } from '@/utils/storageHelper';

/**
 * @description index page to show login page or home page
 * @param {object} currentUser current logged in user
 */
const IndexPage = ({ currentUser }) => {
  const [currentUserSession, setCurrentUserSession] = useState(
    getSessionStorage('currentUser'),
  );
  useEffect(() => {
    setCurrentUserSession(getSessionStorage('currentUser'));
  }, [currentUser]);
  return isEmpty(currentUserSession) ? <Login /> : <Home />;
};

export default connect(({ login: { currentUser } }) => ({
  currentUser,
}))(IndexPage);

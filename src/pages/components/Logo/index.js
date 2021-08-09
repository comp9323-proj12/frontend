import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import styles from './index.less';
import { Avatar } from 'antd';
/**
 * @description Logo button, click to return home page
 */
const Logo = ({ dispatch }) => {
  const returnHome = () => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'home',
        activateContent: {},
      },
    });
    dispatch({
      type: 'user/fetchResearchers',
    });
  };
  return (
    <Avatar
      onClick={returnHome}
      className={styles.logo}
      shape="square"
      size={110}
      alt="LOGO"
      src={require('@/images/logo_transparent2.png')}
    />
  );
};

export default connect(({ login: { currentUser }, page: { currentPage } }) => ({
  currentUser,
  currentPage,
}))(Logo);

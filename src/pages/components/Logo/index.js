import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import { Button } from 'antd';
const Logo = ({ dispatch }) => {
  const returnHome = () => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'home',
        activateContent: {},
      },
    });
  };
  return <Button onClick={returnHome}>Logo</Button>;
};

export default connect(({ login: { currentUser }, page: { currentPage } }) => ({
  currentUser,
  currentPage,
}))(Logo);

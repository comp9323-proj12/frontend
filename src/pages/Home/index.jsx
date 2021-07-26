import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, Carousel, Row, Col, Avatar } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
import Logo from '../components/Logo';
// import SearchBar from '../components/SearchBar';
import UserMenu from '../User/components/UserMenu';
import ResearcherHomePage from '../Researcher/ResearcherHomePage';
import ResearcherList from '../Researcher/ResearcherList';
import {
  createSessionStorage,
  removeSessionStorage,
  getSessionStorage,
} from '@/utils/storageHelper';

const Home = ({ dispatch, currentPage, activateContent }) => {
  const [currentPageRoute, setCurrentPageRoute] = useState('home');
  useEffect(() => {
    setCurrentPageRoute(getSessionStorage('currentPage') || 'home');
  }, [currentPage]);
  console.log(currentPageRoute);
  const routeMap = {
    home: <ResearcherList />,
    researcher: <ResearcherHomePage />,
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Logo />
        </Col>
        <Col span={12}>{/* <SearchBar /> */}</Col>
        <Col span={6}>
          <UserMenu />
        </Col>
      </Row>
      {routeMap[currentPageRoute]}
    </>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activateContent } }) => ({
    currentUser,
    currentPage,
    activateContent,
  }),
)(Home);

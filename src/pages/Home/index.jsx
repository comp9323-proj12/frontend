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
  const routeMap = {
    home: <ResearcherList />,
    researcher: <ResearcherHomePage />,
  };

  return (
    <div className={styles['container']}>
      <Row className={styles['navigation']}>
        <Col span={6} className={styles['navigation__logo']}>
          <Logo />
        </Col>
        <Col span={12} className={styles['navigation__search-bar']}>
          {/* <SearchBar /> */}
        </Col>
        <Col span={6} className={styles['navigation__user-menu']}>
          <UserMenu />
        </Col>
      </Row>
      {routeMap[currentPageRoute]}
    </div>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activateContent } }) => ({
    currentUser,
    currentPage,
    activateContent,
  }),
)(Home);

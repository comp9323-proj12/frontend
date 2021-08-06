import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, Carousel, Row, Col, Avatar, Layout } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import UserMenu from '../User/components/UserMenu';
import Copyright from '../components/Footer';
import ResearcherHomePage from '../Researcher/ResearcherHomePage';
import ResearcherList from '../Researcher/ResearcherList';
import {
  createSessionStorage,
  removeSessionStorage,
  getSessionStorage,
} from '@/utils/storageHelper';

const { Header, Content, Footer } = Layout;

const Home = ({ dispatch, currentPage, activateContent }) => {
  const [currentPageRoute, setCurrentPageRoute] = useState('home');
  useEffect(() => {
    setCurrentPageRoute(getSessionStorage('currentPage') || 'home');
  }, [currentPage]);
  useEffect(() => {
    dispatch({
      type: 'user/fetchResearchers',
    });
  }, []);
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
          <SearchBar />
        </Col>
        <Col span={6} className={styles['navigation__user-menu']}>
          <UserMenu />
        </Col>
      </Row>

      {/* footer */}
      <section className={styles['push']}>{routeMap[currentPageRoute]}</section>
      <Row className={styles['footer']}>
        <Col span={6} className={styles['footer__logo']}>
          <Logo />
        </Col>
        <Col span={18} className={styles['footer__content']}>
          <Copyright />
        </Col>
      </Row>
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

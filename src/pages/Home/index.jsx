import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, Carousel, Row, Col, List, Avatar } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import { List } from 'rc-field-form';
import UserMenu from '../User/components/UserMenu';
import ResearcherHomePage from '../Researcher/ResearcherHomePage';
import ResearcherList from '../Researcher/ResearcherList';

const Home = ({ dispatch, currentUser, page }) => {
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
        <Col span={12}>
          <SearchBar />
        </Col>
        {/* TODO: 别的页面是否也需要显示个人的下拉菜单按钮 */}
        <Col span={6}>
          <UserMenu />
        </Col>
      </Row>
      {routeMap[page]}
    </>
  );
};

export default connect(({ login: { currentUser }, page: { page } }) => ({
  currentUser,
  page,
}))(Home);

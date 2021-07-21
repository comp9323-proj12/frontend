import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, Carousel, Row, Col, Avatar } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
// import Logo from '../components/Logo';
// import SearchBar from '../components/SearchBar';
import UserMenu from '../User/components/UserMenu';
import ResearcherHomePage from '../Researcher/ResearcherHomePage';
import ResearcherList from '../Researcher/ResearcherList';
import ResearcherItem from '@/pages/Researcher/components/researcherItem';

const Home = ({ dispatch, currentPage, activeContent }) => {
  const routeMap = {
    home: <ResearcherList />,
    researcher: <ResearcherHomePage user={activeContent} />,
    researcherItem: <ResearcherItem item={activeContent} />,
  };

  return (
    <>
      <Row>
        <Col span={6}>{/* <Logo /> */}</Col>
        <Col span={12}>{/* <SearchBar /> */}</Col>
        {/* TODO: 别的页面是否也需要显示个人的下拉菜单按钮 */}
        <Col span={6}>
          <UserMenu />
        </Col>
      </Row>
      {routeMap[currentPage]}
    </>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activeContent } }) => ({
    currentUser,
    currentPage,
    activeContent,
  }),
)(Home);

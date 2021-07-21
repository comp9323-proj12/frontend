import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Tabs } from 'antd';
// import styles from './index.less';
import { isEmpty } from 'lodash';
import { getSessionStorage } from '@/utils/storageHelper';
import PersonalDetails from '@/pages/User/components/PersonalDetails';
import researchTabs from './components/researchTabs';
const { TabPane } = Tabs;
const ResearcherHomePage = ({ dispatch, user, currentPage }) => {
  const handleTabChange = (key) => {};
  return (
    <>
      <PersonalDetails user={user} />
      <Tabs defaultActiveKey="text" onChange={handleTabChange}>
        <TabPane tab="Text Story" key="text">
          <researchTabs key="text" />
        </TabPane>
        <TabPane tab="Video Story" key="video">
          <researchTabs key="video" />
        </TabPane>
        <TabPane tab="Meeting" key="meeting">
          <researchTabs key="meeting" />
        </TabPane>
      </Tabs>
    </>
  );
};

export default connect(({ login: { currentUser }, page: { currentPage } }) => ({
  currentUser,
  currentPage,
}))(ResearcherHomePage);

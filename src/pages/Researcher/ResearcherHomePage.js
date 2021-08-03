import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Tabs, Empty } from 'antd';
import styles from './ResearcherHomePage.less';
import { isEmpty } from 'lodash';
import { getSessionStorage } from '@/utils/storageHelper';
import { PersonalDetails } from '@/pages/User/components/PersonalDetails';
import ResearchTabs from './components/ResearchTabs';
import {
  VideoCameraOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
const { TabPane } = Tabs;
const ResearcherHomePage = ({ dispatch, activateContent }) => {
  const [activateUser, setActivateUser] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const currentUser = getSessionStorage('currentUser');
  const [tabContent, setTabContent] = useState('article');
  useEffect(() => {
    setActivateUser(getSessionStorage('activateContent'));
  }, [activateContent]);
  const handleTabChange = (key) => {
    setTabContent(key);
  };
  useEffect(() => {
    if (currentUser._id === activateUser._id) {
      setIsProfile(true);
    }
  }, [activateUser]);
  return (
    <>
      {!isEmpty(activateUser) && (
        <>
          <PersonalDetails user={activateUser} />
          <Tabs
            defaultActiveKey="article"
            onChange={handleTabChange}
            className={styles['researcher-home-page__tabs']}
          >
            <TabPane
              tab={
                <>
                  <FileTextOutlined />
                  Text Story
                </>
              }
              key="article"
            >
              <ResearchTabs
                user={activateUser}
                content={tabContent}
                isProfile={isProfile}
              />
            </TabPane>
            <TabPane
              tab={
                <>
                  <VideoCameraOutlined />
                  Video Story{' '}
                </>
              }
              key="video"
            >
              <ResearchTabs
                user={activateUser}
                content={tabContent}
                isProfile={isProfile}
              />
            </TabPane>
            <TabPane
              tab={
                <>
                  <UsergroupAddOutlined />
                  Meeting
                </>
              }
              key="meeting"
            >
              <ResearchTabs
                user={activateUser}
                content={tabContent}
                isProfile={isProfile}
              />
            </TabPane>
          </Tabs>
        </>
      )}
      {isEmpty(activateUser) && <Empty />}
    </>
  );
};

export default connect(
  ({ login: { currentUser }, page: { currentPage, activateContent } }) => ({
    currentUser,
    currentPage,
    activateContent,
  }),
)(ResearcherHomePage);

import React, { useState, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Tabs, Empty } from 'antd';
import styles from './ResearcherHomePage.less';
import { isEmpty } from 'lodash';
import { getSessionStorage } from '@/utils/storageHelper';
import { PersonalDetails } from '@/pages/User/components/PersonalDetails';
import ResearchTabs from './components/ResearchTabs';
const { TabPane } = Tabs;
const ResearcherHomePage = ({ dispatch, activateContent }) => {
  const [activateUser, setActivateUser] = useState({});
  const [isProfile, setIsProfile] = useState(false);
  const currentUser = getSessionStorage('currentUser');
  const [tabContent, setTabContent] = useState('article');
  useEffect(() => {
    setActivateUser(getSessionStorage('activateContent'));
  }, [activateContent]);
  console.log('useruserv', activateUser);
  const handleTabChange = (key) => {
    setTabContent(key);
  };
  useEffect(() => {
    console.log('isProileid', currentUser);
    console.log(currentUser._id === activateContent._id);
    console.log('activateUser', activateUser);
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
            <TabPane tab="Text Story" key="article">
              <ResearchTabs
                user={activateUser}
                content={tabContent}
                isProfile={isProfile}
              />
            </TabPane>
            <TabPane tab="Video Story" key="video">
              <ResearchTabs
                user={activateUser}
                content={tabContent}
                isProfile={isProfile}
              />
            </TabPane>
            <TabPane tab="Meeting" key="meeting">
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

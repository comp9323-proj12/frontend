import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, List, Avatar } from 'antd';
import ResearcherHomePage from './ResearcherHomePage';

const ResearcherList = ({ dispatch, researchers, currentPage }) => {
  // const [user, setUser] = useState(null);
  console.log('currentPagecurrentPage', currentPage);
  useEffect(() => {
    dispatch({
      type: 'user/fetchResearchers',
    });
  }, []);
  const handleClickResearcher = (item) => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'researcher',
        activeContent: item,
      },
    });
    // setUser(item)
  };
  console.log('researchersresearchers', researchers);
  return (
    <List
      size="large"
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      pagination={{
        pageSize: 4,
      }}
      dataSource={researchers}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          onClick={() => {
            handleClickResearcher(item);
          }}
        >
          <List.Item.Meta
            // 头像
            avatar={<Avatar src={item.avatar} />}
            // 个人主页
            title={item.name}
            // 工作领域
            description={item.researchArea}
          />
          {/* 文章标题和视频标题 */}
          {item.publications}
        </List.Item>
      )}
    />
  );
};
export default connect(({ user: { researchers }, page: { currentPage } }) => ({
  researchers,
  currentPage,
}))(ResearcherList);

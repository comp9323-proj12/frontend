import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, List, Avatar } from 'antd';

const ResearcherList = ({ dispatch, researchers }) => {
  useEffect(() => {
    dispatch({
      type: 'user/fetchResearchers',
    });
  }, []);
  const handleClickResearcher = () => {
    dispatch({
      type: 'page/routeComponent',
      payload: 'researcher',
    });
  };
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
        <List.Item key={item.title} onClick={handleClickResearcher}>
          <List.Item.Meta
            // 头像
            avatar={<Avatar src={item.avatar} />}
            // 个人主页
            title={<a href={item.href}>{item.title}</a>}
            // 工作领域
            description={item.description}
          />
          {/* 文章标题和视频标题 */}
          {item.content}
        </List.Item>
      )}
    />
  );
};
export default connect(({ user: { researchers } }) => ({
  researchers,
}))(ResearcherList);

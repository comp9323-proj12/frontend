import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

/* 404 page ,not used currently
[
  { exact: true, path: '/', component: '@/pages/index' },
  { exact: true, path: '/users', component: '@/pages/users' },
  { component: '@/pages/404' },
] */
const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        Back Home
      </Button>
    }
  /> //跳转到index页面
);

export default NoFoundPage;

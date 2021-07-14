import React, { useState, useEffect } from 'react';
import { connect, Link, Dispatch } from 'umi';
import { Button, Carousel, Row, Col, Modal, Form, Input } from 'antd';
import styles from './Login.less';
import { isEmpty } from 'lodash';

const LoginPage = ({ dispatch, currentUser }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = async (values) => {
    await dispatch({
      type: 'login/login',
      payload: values,
    });
    if (isEmpty(currentUser)) {
      renderModal();
    }
  };
  const renderModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <Row>
      <Col className={styles['login__banner']} span={8}>
        <Carousel autoplay autoplaySpeed={4000}>
          <img src="/icons/login-banner_1.png" alt="banner-1" />
          <img src="/icons/login-banner_2.png" alt="banner-2" />
        </Carousel>
      </Col>
      <Col className={styles['login__main']} span={16}>
        <Form
          name="login"
          className={styles['login__form']}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              className={styles['login__button']}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {/* TODO: Open Register Modal */}
            <Button className={styles['login__button']}>Register</Button>
          </Form.Item>
        </Form>
      </Col>
      <Modal
        title="Login Failed"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p>Login Failed, please check your username and password!</p>
      </Modal>
    </Row>
  );
};

export default connect(({ login: { currentUser } }) => ({
  currentUser,
}))(LoginPage);

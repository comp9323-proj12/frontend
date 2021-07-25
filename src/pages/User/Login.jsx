import React, { useState, useEffect, useRef } from 'react';
import { connect, Link, Dispatch } from 'umi';
import {
  Button,
  Carousel,
  Row,
  Col,
  Modal,
  Form,
  Input,
  notification,
  DatePicker,
  Select,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './Login.less';
import { isEmpty } from 'lodash';
import { getSessionStorage } from '@/utils/storageHelper';

const Login = ({ dispatch, registerFlag, reversalRegistered }) => {
  const currentUser = getSessionStorage('currentUser');
  console.log('currentUsercurrentUser', currentUser);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [form] = Form.useForm();
  const mounted = useRef();
  useEffect(() => {
    if (mounted.current) {
      if (registerFlag === null) {
        notification.error({
          message: 'Server Error',
          description:
            'Oops! There is something wrong with our server, please try later!',
        });
      } else if (registerFlag === false) {
        notification.warning({
          message: 'Register Failed',
          description: 'E-mail already exists, please input a new one!',
        });
      } else if (registerFlag === true) {
        notification.success({
          message: 'Register Success!',
          duration: 1,
        });
        handleCancel();
      }
    } else {
      mounted.current = true;
    }
  }, [reversalRegistered]);
  const onLoginFinish = async (values) => {
    await dispatch({
      type: 'login/login',
      payload: values,
    });
    if (JSON.stringify(getSessionStorage('currentUser')) === '{}') {
      notification.error({
        message: 'Login Failed',
        description: 'Login failed, please check your E-mail and password!',
      });
    }
  };

  const onRegisterFinish = (values) => {
    dispatch({
      type: 'login/register',
      payload: values,
    });
  };
  const onReset = () => {
    form.resetFields();
  };
  const renderLoginModal = () => {
    setIsLoginModalVisible(true);
  };
  const renderRegisterModal = () => {
    setIsRegisterModalVisible(true);
  };
  const handleCancel = () => {
    setIsRegisterModalVisible(false);
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
          wrapperCol={{
            span: 18,
          }}
          onFinish={onLoginFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Email" />
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
            <Button
              className={styles['login__button']}
              onClick={renderRegisterModal}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
      {/* <Modal
        title="Login Failed"
        footer={null}
        visible={isLoginModalVisible}
        onCancel={handleCancel}
      >
        <p>Login failed, please check your username and password!</p>
      </Modal> */}
      <Modal
        title="Register"
        footer={null}
        destroyOnClose={true}
        visible={isRegisterModalVisible}
        onCancel={handleCancel}
      >
        <Form
          preserve={false}
          form={form}
          name="register"
          className={styles['register__form']}
          onFinish={onRegisterFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth">
            <DatePicker />
          </Form.Item>
          <Form.Item name="gender" label="Gender">
            <Select>
              <Select.Option value="Unknown">Unknown</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Input />
          </Form.Item>
          <Form.Item name="contactNumber" label="Contact Number">
            <Input />
          </Form.Item>
          <Form.Item label="Research Area">
            <Form.List name="researchArea">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="research area"
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add research area
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item label="Publications">
            <Form.List name="publications">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item {...field} noStyle>
                        <Input
                          placeholder="publications"
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: '60%' }}
                      icon={<PlusOutlined />}
                    >
                      Add publications
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
          {/* TODO: biography, career是啥？ */}
        </Form>
      </Modal>
    </Row>
  );
};

export default connect(
  ({ login: { currentUser, registerFlag, reversalRegistered } }) => ({
    currentUser,
    registerFlag,
    reversalRegistered,
  }),
)(Login);

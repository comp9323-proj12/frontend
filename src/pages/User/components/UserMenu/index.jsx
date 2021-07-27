import React, { useState, useEffect } from 'react';
import { connect, Link } from 'umi';
import {
  Menu,
  Dropdown,
  Avatar,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import moment from 'moment';
import { getSessionStorage } from '@/utils/storageHelper';
import styles from './index.less';
import UploadMaterialModal from '@/pages/components/UploadMaterialModal';

const UserMenu = ({ dispatch }) => {
  const [currentModal, setCurrentModal] = useState('');
  const currentUser = getSessionStorage('currentUser');
  const [visible, setVisible] = useState(false);
  const logout = (_) => {
    dispatch({
      type: 'login/logout',
    });
  };
  const handleClick = (operation) => {
    const operationMap = {
      profile: routeProfile,
      article: setCurrentModal,
      video: setCurrentModal,
      meeting: setCurrentModal,
      logout: logout,
    };
    console.log('operation', operation);
    operationMap[operation](operation);
    setVisible(false);
  };
  const routeProfile = (_) => {
    dispatch({
      type: 'page/routeComponent',
      payload: {
        currentPage: 'researcher',
        activateContent: currentUser,
      },
    });
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const closeCurrentModal = () => {
    setCurrentModal('');
  };
  const menu = (
    <>
      <Menu>
        <Menu.Item
          key="profile"
          onClick={() => {
            handleClick('profile');
          }}
        >
          My Profile
        </Menu.Item>
        <Menu.Item
          key="article"
          onClick={() => {
            handleClick('article');
          }}
        >
          Upload Text Story
        </Menu.Item>
        <Menu.Item
          key="video"
          onClick={() => {
            handleClick('video');
          }}
        >
          Upload Video Story
        </Menu.Item>
        <Menu.Item
          key="meeting"
          onClick={() => {
            handleClick('meeting');
          }}
        >
          Hold a meeting
        </Menu.Item>
        <Menu.Item
          danger
          key="logout"
          onClick={() => {
            handleClick('logout');
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
      <UploadMaterialModal
        currentModal={currentModal}
        closeCurrentModal={closeCurrentModal}
      />
      {/* <Modal
        title="Upload Text Story"
        visible={isTextModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form {...layout} name="article" onFinish={onFinishText}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input your story title!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="text" label="Content">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="tags" label="Tags">

          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Upload Video Story"
        visible={isVideoModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form {...layout} name="video" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input your story title!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Hold Meeting"
        visible={isMeetingModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form {...layout} name="meeting" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Please input your meeting title!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Link">
            <Input />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Host">
            <Input defaultValue={currentUser.name} />
          </Form.Item>
          <Form.Item label="Time">
            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <span className={'user-menu__drop-down-button'}>
        <Avatar />
        {currentUser.name}
      </span>
    </Dropdown>
  );
};

export default connect(({ login: { currentUser } }) => ({
  currentUser,
}))(UserMenu);

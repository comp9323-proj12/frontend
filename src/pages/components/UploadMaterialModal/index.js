import React, { useState, useEffect, useRef } from 'react';
import {
  Row,
  Col,
  Avatar,
  Modal,
  notification,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import { isEmpty } from 'lodash';
import { connect, Dispatch } from 'umi';
import { getSessionStorage } from '@/utils/storageHelper';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less';
import moment from 'moment';
// import styles from './index.less';
const UploadMaterialModal = ({
  dispatch,
  currentModal,
  closeCurrentModal,
  createMeetingStatus,
  createVideoStatus,
  createArticleStatus,
  reversalMeetingStatus,
  reversalVideoStatus,
  reversalArticleStatus,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [form] = Form.useForm();
  const videoMounted = useRef();
  const articleMounted = useRef();
  const meetingMounted = useRef();
  const titleMap = {
    article: 'Upload Text Story',
    video: 'Upload Video Story',
    meeting: 'Hold Meeting',
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const articleLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const user = getSessionStorage('currentUser');
  const onDateChange = (date, dateString) => {
    setDateString(dateString);
  };
  const onTimeChange = (time, timeString) => {
    setTimeString(timeString);
  };

  const handleCancel = () => {
    setDateString('');
    setTimeString('');
    setIsModalVisible(false);
    closeCurrentModal();
  };
  const createArticle = (values) => {
    const formatTags = isEmpty(values.tags) ? [] : values.tags;
    dispatch({
      type: 'article/createArticle',
      payload: {
        ...values,
        author: user._id,
        tags: formatTags,
      },
    });
  };
  const createVideo = (values) => {
    dispatch({
      type: 'video/createVideo',
      payload: {
        ...values,
        author: user._id,
      },
    });
  };
  const createMeeting = (values) => {
    dispatch({
      type: 'meeting/createMeeting',
      payload: {
        ...values,
        instructor: user._id,
        startTime: moment(
          dateString + ' ' + timeString,
          'YYYY-MM-DD HH:mm:ss',
        ).format('MM/DD/YYYY HH:mm:ss'),
      },
    });
  };
  const onFinish = (values) => {
    const finishMap = {
      article: () => createArticle(values),
      video: () => createVideo(values),
      meeting: () => createMeeting(values),
    };
    finishMap[currentModal]();
    handleCancel();
  };
  useEffect(() => {
    if (!isEmpty(currentModal)) {
      setIsModalVisible(true);
    }
  }, [currentModal]);
  const notifyInfos = (status) => {
    if (status !== 200) {
      notification.error({
        message: 'Server Error',
        description:
          'Oops! There is something wrong with our server, please try later!',
      });
    } else {
      notification.success({
        message: 'Create Success!',
        duration: 1,
      });
      handleCancel();
    }
  };
  useEffect(() => {
    meetingMounted.current
      ? notifyInfos(createMeetingStatus)
      : (meetingMounted.current = true);
  }, [reversalMeetingStatus]);
  useEffect(() => {
    videoMounted.current
      ? notifyInfos(createVideoStatus)
      : (videoMounted.current = true);
  }, [reversalVideoStatus]);
  useEffect(() => {
    articleMounted.current
      ? notifyInfos(createArticleStatus)
      : (articleMounted.current = true);
  }, [reversalArticleStatus]);
  return (
    <Modal
      className={styles['upload-material-modal']}
      title={titleMap[currentModal]}
      visible={isModalVisible}
      footer={null}
      width={currentModal === 'article' ? 1200 : 520}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        labelCol={
          currentModal === 'article' ? articleLayout.labelCol : layout.labelCol
        }
        wrapperCol={
          currentModal === 'article'
            ? articleLayout.wrapperCol
            : layout.wrapperCol
        }
        name={currentModal}
        onFinish={onFinish}
        form={form}
        preserve={false}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input title!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {currentModal === 'article' && (
          <Form.Item name="text" label="Content">
            <Input.TextArea />
          </Form.Item>
        )}
        {currentModal === 'meeting' && (
          <>
            {/* TODO:Notice是不是description */}
            {/* <Form.Item name="notice" label="Notice">
              <Input.TextArea />
            </Form.Item> */}
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                  message: 'Please pick start date!',
                },
              ]}
            >
              <DatePicker onChange={onDateChange} />
            </Form.Item>
            <Form.Item
              name="startTime"
              label="Start Time"
              rules={[
                {
                  required: true,
                  message: 'Please pick start time!',
                },
              ]}
            >
              <TimePicker onChange={onTimeChange} />
            </Form.Item>
          </>
        )}
        {(currentModal === 'video' || currentModal === 'meeting') && (
          <Form.Item name="link" label="Link">
            <Input />
          </Form.Item>
        )}
        {(currentModal === 'video' || currentModal === 'meeting') && (
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        )}
        <Form.Item label="Tags">
          <Form.List name="tags">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item required={false} key={field.key}>
                    <Form.Item {...field} noStyle>
                      <Input placeholder="tag" style={{ width: '40%' }} />
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
                    style={{ width: '40%' }}
                    icon={<PlusOutlined />}
                  >
                    Add tag
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  ({
    login: { currentUser },
    article: { createArticleStatus, reversalArticleStatus },
    video: { createVideoStatus, reversalVideoStatus },
    meeting: { createMeetingStatus, reversalMeetingStatus },
  }) => ({
    currentUser,
    createArticleStatus,
    createVideoStatus,
    createMeetingStatus,
    reversalVideoStatus,
    reversalMeetingStatus,
    reversalArticleStatus,
  }),
)(UploadMaterialModal);

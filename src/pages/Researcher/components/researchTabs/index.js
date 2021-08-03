import React, { useState, useEffect, useRef } from 'react';
import { connect, Dispatch } from 'umi';
// import styles from './index.less';
import {
  List,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
} from 'antd';
import { getSessionStorage } from '@/utils/storageHelper';
import {
  MinusCircleOutlined,
  PlusOutlined,
  TagsTwoTone,
  CalendarOutlined,
  FieldTimeOutlined,
  QuestionCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import ResearcherItem from '@/pages/Researcher/components/ResearcherItem';
import moment from 'moment';
import styles from './index.less';
import { isEmpty } from 'lodash';
const ResearchTabs = ({
  dispatch,
  content,
  user,
  userArticles,
  userVideos,
  userMeetings,
  currentPage,
  isProfile,
  questions,
}) => {
  const currentUser = getSessionStorage('currentUser');
  const [editForm] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const [enrollMeeting, setEnrollMeeting] = useState({});
  const [listData, setListData] = useState([]);
  const [questionListData, setQuestionListData] = useState([]);
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [profileItem, setProfileItem] = useState({});
  const [currentModal, setCurrentModal] = useState('');
  const [isReplyVisibleId, setIsReplyVisibleId] = useState('');
  const handleCancel = () => {
    setVisible(false);
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setQuestionModalVisible(false);
    editForm.setFieldsValue({});
    replyForm.resetFields();
    setIsReplyVisibleId('');
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
  const onEditFinish = (values) => {
    handleEdit(values);
    setEditModalVisible(false);
  };
  const onReplyFinish = (values, question) => {
    dispatch({
      type: 'question/createReply',
      payload: {
        whoPost: currentUser._id,
        question,
        text: values.reply,
      },
    });
    setIsReplyVisibleId('');
    replyForm.resetFields();
  };
  const handleEdit = (values) => {
    const editMap = {
      article: async () => {
        await dispatch({
          type: 'article/updateArticle',
          payload: { ...profileItem, ...values },
        });
        dispatch({
          type: 'article/fetchArticlesByUserId',
          payload: user._id,
        });
      },
      video: async () => {
        await dispatch({
          type: 'video/updateVideo',
          payload: { ...profileItem, ...values },
        });
        dispatch({
          type: 'video/fetchVideosByUserId',
          payload: user._id,
        });
      },
      meeting: async () => {
        await dispatch({
          type: 'meeting/updateMeeting',
          payload: { ...profileItem, ...values },
        });
        dispatch({
          type: 'meeting/fetchMeetingsByUserId',
          payload: user._id,
        });
      },
    };
    editMap[content]();
  };
  const onDateChange = (date, dateString) => {
    setDateString(dateString);
  };
  const onTimeChange = (time, timeString) => {
    setTimeString(timeString);
  };
  const handleDelete = (item) => {
    const deleteMap = {
      article: async () => {
        await dispatch({
          type: 'article/deleteArticle',
          payload: item._id,
        });
        dispatch({
          type: 'article/fetchArticlesByUserId',
          payload: user._id,
        });
      },
      video: async () => {
        await dispatch({
          type: 'video/deleteVideo',
          payload: item._id,
        });
        dispatch({
          type: 'video/fetchVideosByUserId',
          payload: user._id,
        });
      },
      meeting: async () => {
        await dispatch({
          type: 'meeting/deleteMeeting',
          payload: item._id,
        });
        dispatch({
          type: 'meeting/fetchMeetingsByUserId',
          payload: user._id,
        });
      },
    };
    deleteMap[content]();
    setDeleteModalVisible(false);
  };
  const contentMap = {
    article: async () => {
      await dispatch({
        type: 'article/fetchArticlesByUserId',
        payload: user._id,
      });
    },
    video: async () => {
      await dispatch({
        type: 'video/fetchVideosByUserId',
        payload: user._id,
      });
    },
    meeting: async () => {
      await dispatch({
        type: 'meeting/fetchMeetingsByUserId',
        payload: user._id,
      });
    },
  };
  useEffect(() => {
    contentMap[content]();
  }, [user]);
  useEffect(() => {
    const tabMap = {
      article: userArticles,
      video: userVideos,
      meeting: userMeetings,
    };
    setListData(tabMap[content]);
  }, [content]);
  useEffect(() => {
    setListData(userArticles);
  }, [userArticles]);
  useEffect(() => {
    setListData(userVideos);
  }, [userVideos]);
  useEffect(() => {
    setListData(userMeetings);
  }, [userMeetings]);
  useEffect(() => {
    setQuestionListData(questions);
  }, [questions]);
  const renderItemModal = (item) => {
    setModalItem(item);
    setVisible(true);
    if (!isEmpty(item)) {
      if (item.text) {
        dispatch({
          type: 'question/fetchQuestionsByArticleId',
          payload: item._id,
        });
      } else if (isEmpty(item.instructor)) {
        dispatch({
          type: 'question/fetchQuestionsByVideoId',
          payload: item._id,
        });
      }
    }
  };
  const handleEnrollMeeting = () => {
    let students = enrollMeeting.students;
    students.push(currentUser._id);
    dispatch({
      type: 'meeting/updateMeeting',
      payload: {
        ...enrollMeeting,
        students,
      },
    });
    setEnrollModalVisible(false);
  };
  const renderDescription = (item) => {
    return item.instructor ? (
      <p>{item.link}</p>
    ) : (
      <>
        <img src={require('@/images/video-thumbnail.jpeg')} />
        <p>{item.link}</p>
      </>
    );
  };
  const openQuestionModal = async (e, item) => {
    e.stopPropagation();
    item.text
      ? await dispatch({
          type: 'question/fetchQuestionsByArticleId',
          payload: item._id,
        })
      : isEmpty(item.instructor)
      ? await dispatch({
          type: 'question/fetchQuestionsByVideoId',
          payload: item._id,
        })
      : '';
    setQuestionModalVisible(true);
  };
  const openEnrollModal = async (e, meeting) => {
    e.stopPropagation();
    setEnrollModalVisible(true);
    setEnrollMeeting(meeting);
  };
  return (
    <>
      <List
        pagination={{
          pageSize: 4,
        }}
        dataSource={listData}
        renderItem={(item) => (
          <List.Item
            className={styles['research-tabs__list-item']}
            key={item._id}
            onClick={() => {
              renderItemModal(item);
            }}
            extra={
              <>
                {!isProfile &&
                  content === 'meeting' &&
                  !item.students?.includes(currentUser._id) && (
                    <>
                      <Button
                        className={styles['research-tabs__profile-button']}
                        onClick={(e) => {
                          openEnrollModal(e, item);
                        }}
                      >
                        Enroll meeting
                      </Button>
                    </>
                  )}
                {isProfile && (
                  <>
                    {content !== 'meeting' && (
                      <Button
                        className={styles['research-tabs__profile-button']}
                        onClick={(e) => {
                          openQuestionModal(e, item);
                        }}
                      >
                        <QuestionCircleTwoTone />
                        Check Question
                      </Button>
                    )}
                    <Button
                      className={styles['research-tabs__profile-button']}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentModal(
                          item.instructor
                            ? 'meeting'
                            : item.link
                            ? 'video'
                            : 'article',
                        );
                        editForm.setFieldsValue({
                          ...item,
                          startDate: '',
                          startTime: '',
                        });
                        setProfileItem(item);
                        setEditModalVisible(true);
                      }}
                    >
                      <EditTwoTone />
                      edit
                    </Button>
                    <Button
                      className={styles['research-tabs__profile-button']}
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileItem(item);
                        setDeleteModalVisible(true);
                        // handleDelete(item);
                      }}
                    >
                      <DeleteTwoTone />
                      delete
                    </Button>
                  </>
                )}
              </>
            }
          >
            <Tag className={styles['research-tabs__time']}>
              <FieldTimeOutlined />
              {'Create time: ' + moment(item.createTime).format('DD/MM/YYYY')}
            </Tag>
            {item.startTime && (
              <Tag className={styles['research-tabs__time']}>
                {'Start time: ' +
                  moment(item.startTime).format('DD/MM/YYYY HH:mm:ss')}
              </Tag>
            )}
            {content === 'meeting' && (
              <span> Enroll number: {item.students?.length} </span>
            )}
            {item.text && (
              <List.Item.Meta
                className={styles['research-tabs__meta']}
                title={item.title}
                description={
                  item.text.length > 50
                    ? item.text.slice(0, 50) + '...'
                    : item.text
                }
              />
            )}
            {!item.text && (
              <List.Item.Meta
                className={styles['research-tabs__meta']}
                title={item.title}
                description={renderDescription(item)}
              />
            )}
            {item?.tags && <TagsTwoTone />}
            {item?.tags?.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  className={styles['research-tabs__tags']}
                  color="#b3d7ff"
                >
                  {tag}
                </Tag>
              );
            })}
          </List.Item>
        )}
      ></List>
      <ResearcherItem
        visible={visible}
        content={modalItem}
        user={user}
        handleCancel={handleCancel}
      />
      <Modal
        title="Enroll"
        visible={enrollModalVisible}
        destroyOnClose={true}
        onOk={handleEnrollMeeting}
        onCancel={handleCancel}
        className={styles['research-tabs__question-modal']}
      >
        <p>Are you sure to enroll {enrollMeeting.title} ?</p>
      </Modal>
      <Modal
        title="Question"
        visible={questionModalVisible}
        destroyOnClose={true}
        footer={null}
        onCancel={handleCancel}
        className={styles['research-tabs__question-modal']}
      >
        <List
          //   itemLayout="vertical"
          pagination={{
            pageSize: 8,
          }}
          dataSource={questionListData}
          renderItem={(question) => {
            return (
              <List.Item>
                <List.Item.Meta
                  title={question.text}
                  description={
                    <>
                      <span>
                        {moment(question.createTime).format('DD/MM/YYYY')}
                      </span>
                      <span>{question.whoPost.name}</span>
                    </>
                  }
                />
                {!isReplyVisibleId && (
                  <Button
                    onClick={() => {
                      setIsReplyVisibleId(question._id);
                    }}
                  >
                    {' '}
                    Reply{' '}
                  </Button>
                )}
                {isReplyVisibleId === question._id && (
                  <Form
                    form={replyForm}
                    onFinish={(values) => {
                      onReplyFinish(values, question._id);
                    }}
                  >
                    <Form.Item
                      name="reply"
                      rules={[
                        {
                          required: true,
                          message: 'Cannot post empty reply!',
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Reply" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </List.Item>
            );
          }}
        ></List>
      </Modal>
      <Modal
        title="Delete"
        visible={deleteModalVisible}
        onOk={() => {
          handleDelete(profileItem);
        }}
        onCancel={handleCancel}
      >
        Confirm delete {profileItem.title}?
      </Modal>
      <Modal
        title={profileItem.title}
        visible={editModalVisible}
        destroyOnClose={true}
        footer={null}
        width={content === 'article' ? 1200 : 520}
        onCancel={handleCancel}
      >
        <Form
          labelCol={
            content === 'article' ? articleLayout.labelCol : layout.labelCol
          }
          wrapperCol={
            content === 'article' ? articleLayout.wrapperCol : layout.wrapperCol
          }
          // {...layout}
          //   initialValues={}
          name={currentModal}
          onFinish={onEditFinish}
          form={editForm}
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
              <Form.Item
                name="startDate"
                label={
                  <>
                    <CalendarOutlined />
                    Start Date
                  </>
                }
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
                label={
                  <>
                    <FieldTimeOutlined /> Start Time
                  </>
                }
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
    </>
  );
};

export default connect(
  ({
    login: { currentUser },
    page: { currentPage },
    article: { userArticles },
    video: { userVideos },
    meeting: { userMeetings },
    question: { questions },
  }) => ({
    currentUser,
    questions,
    currentPage,
    userArticles,
    userMeetings,
    userVideos,
  }),
)(ResearchTabs);

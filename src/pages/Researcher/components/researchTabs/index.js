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
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
}) => {
  console.log(isProfile);
  const [editForm] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [listData, setListData] = useState([]);
  const [dateString, setDateString] = useState('');
  const [timeString, setTimeString] = useState('');
  const [visible, setVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const [profileItem, setProfileItem] = useState({});
  const [currentModal, setCurrentModal] = useState('');
  const handleCancel = () => {
    setVisible(false);
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setQuestionModalVisible(false);
    editForm.setFieldsValue({});
    replyForm.setFieldsValue({});
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onEditFinish = (values) => {
    handleEdit(values);
    setEditModalVisible(false);
  };
  const onReplyFinish = (values) => {};
  const handleEdit = (values) => {
    const editMap = {
      article: async () => {
        console.log('edititem', profileItem);
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
        console.log('edititem', profileItem);
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
        console.log('edititem', profileItem);
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
        console.log('deleteitem', item);
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
        console.log('deleteitem', item);
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
        console.log('deleteitem', item);
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
      console.log('user._iduser._id', user);
      await dispatch({
        type: 'article/fetchArticlesByUserId',
        payload: user._id,
      });
      console.log('userArticlesuserArticles', userArticles);
      // setListData(userArticles);
    },
    video: async () => {
      await dispatch({
        type: 'video/fetchVideosByUserId',
        payload: user._id,
      });
      // setListData(userVideos);
    },
    meeting: async () => {
      await dispatch({
        type: 'meeting/fetchMeetingByUserId',
        payload: user._id,
      });
      // setListData(userMeetings);
    },
  };
  useEffect(() => {
    console.log('1123');
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
  const renderItemModal = (item) => {
    setModalItem(item);
    setVisible(true);
  };
  console.log('content', content);
  console.log('listData', listData);
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
              isProfile && (
                <>
                  <Button
                    className={styles['research-tabs__profile-button']}
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuestionModalVisible(true);
                    }}
                  >
                    Check Question
                  </Button>
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
                      editForm.setFieldsValue(item);
                      setProfileItem(item);
                      setEditModalVisible(true);
                    }}
                  >
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
                    delete
                  </Button>
                </>
              )
            }
          >
            <Tag className={styles['research-tabs__time']}>
              {'Create time: ' + moment(item.createTime).format('DD/MM/YYYY')}
            </Tag>
            {item.startTime && (
              <Tag className={styles['research-tabs__time']}>
                {'Start time: ' +
                  moment(item.startTime).format('DD/MM/YYYY HH:mm:ss')}
              </Tag>
            )}
            {!isEmpty(item.students) &&
              item.students.map((student) => {
                return <Tag>{student}</Tag>;
              })}
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
            {item.description && (
              <List.Item.Meta
                title={item.title}
                description={
                  item?.description?.length > 50
                    ? item.text.slice(0, 50) + '...'
                    : item.text
                }
              />
            )}
            {item?.tags?.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  className={styles['research-tabs__tags']}
                  color="blue"
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
        title="Question"
        visible={questionModalVisible}
        destroyOnClose={true}
        footer={null}
        onCancel={handleCancel}
      >
        <List
          itemLayout="vertical"
          pagination={{
            pageSize: 8,
          }}
          dataSource={listData.map((data) => {
            return data.question;
          })}
          renderItem={(question) => {
            console.log('question', question);
            return (
              <List.Item>
                <List.Item.Meta title={item.title} />
                {/* {question.replies.map((reply) => {
									return(
										<List>
											<List.Item>
												{reply.text}
											</List.Item>
										</List>
									)
								})} */}
                <Form form={replyForm} onFinish={onReplyFinish}>
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
        onCancel={handleCancel}
      >
        {console.log('profileItemprofileItem', profileItem)}
        <Form
          {...layout}
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
              {/* TODO:Notice是不是description */}
              {/* <Form.Item name="notice" label="Notice">
              <Input.TextArea />
            </Form.Item> */}
              <Form.Item name="startDate" label="Start Date">
                <DatePicker onChange={onDateChange} />
              </Form.Item>
              <Form.Item name="startTime" label="Start Time">
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

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
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
  }) => ({
    currentUser,
    currentPage,
    userArticles,
    userMeetings,
    userVideos,
  }),
)(ResearchTabs);

import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Input, Form, Select, List, Button, Modal } from 'antd';
import styles from './index.less';
import { isEmpty } from 'lodash';
import { connect, Dispatch } from 'umi';
import { getSessionStorage } from '@/utils/storageHelper';
import moment from 'moment';
import ResearcherItem from '@/pages/Researcher/components/ResearcherItem';
const { Search } = Input;
const { Option } = Select;
const SearcherBar = ({ set, researchers, searchArticlesResults, dispatch }) => {
  const [form] = Form.useForm();
  const currentUser = getSessionStorage('currentUser');
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const [isItemModalVisible, setIsItemModalVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [modalItem, setModalItem] = useState({});
  const [listData, setListData] = useState([]);
  const [enrollModalVisible, setEnrollModalVisible] = useState(false);
  const renderItemModal = (item) => {
    setModalItem(item);
    setIsItemModalVisible(true);
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
  const onSearch = async (mainCategory, subCategory, value) => {
    mainCategory === 'user'
      ? await dispatch({
          type: 'page/routeComponent',
          payload: {
            currentPage: 'home',
            activateContent: {},
          },
        })
      : setIsSearchModalVisible(true);
    const searchMap = {
      user: () => {
        dispatch({
          type: 'user/searchResearchers',
          payload: value,
        });
      },
      article: () => {
        dispatch({
          type: 'article/searchArticles',
          payload: {
            subCategory,
            value,
          },
        });
      },
      video: () => {
        dispatch({
          type: 'video/searchVideos',
          payload: {
            subCategory,
            value,
          },
        });
      },
      meeting: () => {
        dispatch({
          type: 'meeting/searchMeetings',
          payload: {
            subCategory,
            value,
          },
        });
      },
    };
    searchMap[mainCategory]();
  };
  const openEnrollModal = async (e, meeting) => {
    e.stopPropagation();
    setEnrollModalVisible(true);
    setEnrollMeeting(meeting);
  };
  // form.getFieldValue('catrgory')
  const handleMainChange = (value) => {
    console.log(value);
    form.setFieldsValue({ mainCategory: value });
    setCategory(value);
    console.log('form.getFieldValue', form.getFieldValue());
  };
  const handleSubChange = (value) => {
    form.setFieldsValue({ subCategory: value });
  };
  const handleSearchCancel = () => {
    setIsSearchModalVisible(false);
  };
  const handleItemCancel = () => {
    setIsItemModalVisible(false);
  };
  useEffect(() => {
    setListData(searchArticlesResults);
  }, [searchArticlesResults]);
  // useEffect(() => {
  // 	setListData(searchMeetingsResults);
  // }, [searchMeetingsResults]);
  // useEffect(() => {
  // 	setListData(searchVideosResults);
  // }, [searchVideosResults]);
  return (
    <>
      <Form form={form} name="search">
        <Form.Item
          name="mainCategory"
          label="Main category"
          initialValue="user"
        >
          <Select onChange={handleMainChange}>
            <Option value="user">user</Option>
            <Option value="article">article</Option>
            <Option value="video">video</Option>
            <Option value="meeting">meeting</Option>
          </Select>
        </Form.Item>
        {!isEmpty(category) && category !== 'user' && (
          <Form.Item
            name="subCategory"
            label="Sub category"
            initialValue="title"
          >
            <Select onChange={handleSubChange}>
              <Option value="title">title</Option>
              <Option value="tag">tag</Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item>
          <Search
            placeholder="input search text"
            onSearch={(value) => {
              onSearch(
                form.getFieldValue('mainCategory'),
                form.getFieldValue('subCategory'),
                value,
              );
            }}
            enterButton
          />
        </Form.Item>
      </Form>
      <Modal
        className={styles['search-modal']}
        title="Search result"
        visible={isSearchModalVisible}
        footer={null}
        maskClosable={false}
        onCancel={handleSearchCancel}
        destroyOnClose={true}
      >
        <List
          size="large"
          pagination={{
            pageSize: 8,
          }}
          dataSource={listData}
          renderItem={(item) => (
            <List.Item
              className={styles['search-modal__list-item']}
              key={item._id}
              onClick={() => {
                renderItemModal(item);
              }}
              extra={
                <>
                  {item.instructor?._id !== currentUser._id &&
                    !item.students?.includes(currentUser._id) && (
                      <>
                        <Button
                          className={styles['search-modal__profile-button']}
                          onClick={(e) => {
                            openEnrollModal(e, item);
                          }}
                        >
                          Enroll meeting
                        </Button>
                      </>
                    )}
                </>
              }
            >
              <Tag className={styles['search-modal__time']}>
                {'Create time: ' + moment(item.createTime).format('DD/MM/YYYY')}
              </Tag>
              {item.startTime && (
                <Tag className={styles['search-modal__time']}>
                  {'Start time: ' +
                    moment(item.startTime).format('DD/MM/YYYY HH:mm:ss')}
                </Tag>
              )}
              {category === 'meeting' && (
                <span> Enroll number: {item.students?.length} </span>
              )}
              {item.text && (
                <List.Item.Meta
                  className={styles['search-modal__meta']}
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
                  className={styles['search-modal__meta']}
                  title={item.title}
                  description={renderDescription(item)}
                />
              )}
              {item?.tags?.map((tag, index) => {
                return (
                  <Tag
                    key={index}
                    className={styles['search-modal__tags']}
                    color="#b3d7ff"
                  >
                    {tag}
                  </Tag>
                );
              })}
            </List.Item>
          )}
        ></List>
      </Modal>
      {isItemModalVisible && (
        <ResearcherItem
          visible={isItemModalVisible}
          content={modalItem}
          user={
            !isEmpty(modalItem.author) ? modalItem.author : modalItem.instructor
          }
          handleCancel={handleItemCancel}
        ></ResearcherItem>
      )}
    </>
  );
};

export default connect(
  ({ user: { researchers }, article: { searchArticlesResults } }) => ({
    researchers,
    searchArticlesResults,
  }),
)(SearcherBar);

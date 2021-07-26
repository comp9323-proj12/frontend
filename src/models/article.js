import {
  getArticlesByUserId,
  createArticle,
  deleteArticle,
} from '@/services/article';

const Article = {
  namespace: 'article',
  state: {
    userArticles: [],
    createArticleStatus: null,
    reversalArticleStatus: false,
  },
  effects: {
    *fetchArticlesByUserId({ payload }, { call, put }) {
      const response = yield call(getArticlesByUserId, payload);
      console.log('articles', response);
      if (response.status === 200) {
        yield put({
          type: 'listUserArticles',
          payload: response.data,
        });
      }
    },
    *createArticle({ payload }, { call, put }) {
      const response = yield call(createArticle, payload);
      console.log('responseresponseresponse', response);
      yield put({
        type: 'putCreateArticleStatus',
        payload: response.status,
      });
    },
    *deleteArticle({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
    },
  },

  reducers: {
    listUserArticles(state, action) {
      const { payload } = action;
      return {
        ...state,
        userArticles: payload,
      };
    },
    putCreateArticleStatus(state, action) {
      const { payload } = action;
      console.log('createArticleStatus', payload);
      return {
        ...state,
        createArticleStatus: payload,
        reversalArticleStatus: !state.reversalArticleStatus,
      };
    },
  },
};

export default Article;

import {
  getArticlesByUserId,
  createArticle,
  deleteArticle,
  updateArticle,
  searchArticles,
} from '@/services/article';

const Article = {
  namespace: 'article',
  state: {
    userArticles: [],
    createArticleStatus: null,
    reversalArticleStatus: false,
    searchArticlesResults: [],
  },
  effects: {
    *fetchArticlesByUserId({ payload }, { call, put }) {
      const response = yield call(getArticlesByUserId, payload);
      if (response.status === 200) {
        yield put({
          type: 'listUserArticles',
          payload: response.data,
        });
      }
    },
    *createArticle({ payload }, { call, put }) {
      const response = yield call(createArticle, payload);
      yield put({
        type: 'putCreateArticleStatus',
        payload: response.status,
      });
    },
    *updateArticle({ payload }, { call, put }) {
      yield call(updateArticle, payload);
    },
    *deleteArticle({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
    },
    *searchArticles({ payload }, { call, put }) {
      const response = yield call(searchArticles, payload);
      yield put({
        type: 'listSearchArticlesResults',
        payload: response.data,
      });
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
    listSearchArticlesResults(state, action) {
      const { payload } = action;
      return {
        ...state,
        searchArticlesResults: payload,
      };
    },
    putCreateArticleStatus(state, action) {
      const { payload } = action;
      return {
        ...state,
        createArticleStatus: payload,
        reversalArticleStatus: !state.reversalArticleStatus,
      };
    },
  },
};

export default Article;

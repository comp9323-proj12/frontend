import {
  createReply,
  createQuestion,
  getQuestionsByArticle,
  getQuestionsByVideo,
} from '@/services/question';

const Question = {
  namespace: 'question',
  state: {
    questions: [],
  },
  effects: {
    *createReply({ payload }, { call, put }) {
      const response = yield call(createReply, payload);
      //   yield put({
      //     type: 'listQuestions',
      //     payload: response.data,
      //   });
    },
    *createQuestion({ payload }, { call, put }) {
      const response = yield call(createQuestion, payload);
      console.log('quesResponse', response);
      yield put({
        type: 'listQuestions',
        payload: response.data,
      });
    },
    *fetchQuestionsByArticleId({ payload }, { call, put }) {
      const response = yield call(getQuestionsByArticle, payload);
      console.log('ques1Response', response);
      yield put({
        type: 'listQuestions',
        payload: response.data,
      });
    },
    *fetchQuestionsByVideoId({ payload }, { call, put }) {
      const response = yield call(getQuestionsByVideo, payload);
      console.log('ques1Response', response);
      yield put({
        type: 'listQuestions',
        payload: response.data,
      });
    },
  },

  reducers: {
    listQuestions(state, action) {
      const { payload } = action;
      return {
        ...state,
        questions: payload,
      };
    },
    //   putCreateMeetingStatus(state, action) {
    // 	const { payload } = action;
    // 	return {
    // 	  ...state,
    // 	  createMeetingStatus: payload,
    // 	  reversalMeetingStatus: !state.reversalMeetingStatus,
    // 	};
    //   },
    // },
  },
};
export default Question;

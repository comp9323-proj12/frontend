import { createReply, createQuestion } from '@/services/question';

const Question = {
  namespace: 'question',
  state: {
    questions: [],
  },
  effects: {
    *createReply({ payload }, { call, put }) {
      const response = yield call(createReply, payload);
      // yield put({
      //   type: 'putCreateMeetingStatus',
      //   payload: response.status,
      // });
    },
    *createQuestion({ payload }, { call, put }) {
      const response = yield call(createQuestion, payload);
      // yield put({
      //   type: 'putCreateMeetingStatus',
      //   payload: response.status,
      // });
    },
  },

  reducers: {
    //   listUserMeetings(state, action) {
    // 	const { payload } = action;
    // 	return {
    // 	  ...state,
    // 	  userMeetings: payload,
    // 	};
    //   },
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

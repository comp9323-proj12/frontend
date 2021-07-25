import { getMeetingsByUserId, createMeeting } from '@/services/meeting';

const Meeting = {
  namespace: 'meeting',
  state: {
    userMeetings: [],
    createMeetingStatus: null,
    reversalMeetingStatus: false,
  },
  effects: {
    *fetchMeetingsById({ payload }, { call, put }) {
      const response = yield call(getMeetingsByUserId, payload);
      if (response.status === 200) {
        yield put({
          type: 'listUserMeetings',
          payload: response.data,
        });
      }
    },
    *createMeeting({ payload }, { call, put }) {
      const response = yield call(createMeeting, payload);
      yield put({
        type: 'putCreateMeetingStatus',
        payload: response.status,
      });
    },
  },

  reducers: {
    listUserMeetings(state, action) {
      const { payload } = action;
      return {
        ...state,
        userMeetings: payload,
      };
    },
    putCreateMeetingStatus(state, action) {
      const { payload } = action;
      return {
        ...state,
        createMeetingStatus: payload,
        reversalMeetingStatus: !state.reversalMeetingStatus,
      };
    },
  },
};

export default Meeting;

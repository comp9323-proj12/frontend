import {
  getMeetingsByUserId,
  createMeeting,
  deleteMeeting,
  updateMeeting,
  searchMeetings,
} from '@/services/meeting';

const Meeting = {
  namespace: 'meeting',
  state: {
    userMeetings: [],
    createMeetingStatus: null,
    reversalMeetingStatus: false,
    searchMeetingsResults: [],
  },
  effects: {
    *fetchMeetingsByUserId({ payload }, { call, put }) {
      const response = yield call(getMeetingsByUserId, payload);
      if (response.status === 200) {
        yield put({
          type: 'listUserMeetings',
          payload: response.data,
        });
      }
    },
    *searchMeetings({ payload }, { call, put }) {
      const response = yield call(searchMeetings, payload);
      yield put({
        type: 'listSearchMeetingsResults',
        payload: response.data,
      });
    },
    *deleteMeeting({ payload }, { call, put }) {
      yield call(deleteMeeting, payload);
    },
    *updateMeeting({ payload }, { call, put }) {
      yield call(updateMeeting, payload);
    },
    *createMeeting({ payload }, { call, put }) {
      const response = yield call(createMeeting, payload);
      yield put({
        type: 'putCreateMeetingStatus',
        payload: response.status,
      });
    },
    //   yield put({
    //     type: 'putCreateMeetingStatus',
    //     payload: response.status,
    //   });
    // },
  },

  reducers: {
    listUserMeetings(state, action) {
      const { payload } = action;
      return {
        ...state,
        userMeetings: payload,
      };
    },
    listSearchMeetingsResults(state, action) {
      const { payload } = action;
      return {
        ...state,
        searchMeetingsResults: payload,
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

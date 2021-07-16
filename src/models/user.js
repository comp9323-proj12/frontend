import { getResearchers } from '@/services/user';

const User = {
  namespace: 'user',
  state: {
    researchers: [],
  },
  effects: {
    // Send { userName:xxx, password:xxx } to backend
    *fetchResearchers(_, { call, put }) {
      const response = yield call(getResearchers);
      if (response.status === 200) {
        yield put({
          type: 'listResearchers',
          payload: response.data.researchers,
        });
      }
    },
  },

  reducers: {
    listResearchers(state, action) {
      const { payload } = action;
      return {
        ...state,
        researchers: payload,
      };
    },
  },
};

export default User;

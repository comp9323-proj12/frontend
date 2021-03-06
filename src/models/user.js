import { getResearchers } from '@/services/user';

const User = {
  namespace: 'user',
  state: {
    researchers: [],
  },
  effects: {
    *fetchResearchers(_, { call, put }) {
      const response = yield call(getResearchers);
      if (response.status === 200) {
        yield put({
          type: 'listResearchers',
          payload: response.data.researchers,
        });
      }
    },
    *searchResearchers({ payload }, { call, put }) {
      const response = yield call(getResearchers);
      const result = response.data.researchers.filter((user) =>
        user.name.includes(payload),
      );
      yield put({
        type: 'listResearchers',
        payload: result,
      });
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

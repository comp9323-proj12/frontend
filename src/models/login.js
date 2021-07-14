import { loginUser } from '@/services/user';

const Login = {
  namespace: 'login',
  state: {
    currentUser: '',
  },
  effects: {
    // Send { userName:xxx, password:xxx } to backend
    *login({ payload }, { call, put }) {
      const response = yield call(loginUser, payload);
      if (response.status === 200) {
        // TODO: suppose response is like { status:200, userId:xxxxxx } or 404
        yield put({
          type: 'listCurrentUser',
          payload: response.data.userId,
        });
      }
    },
  },

  reducers: {
    listCurrentUser(state, action) {
      const { payload } = action;
      return {
        ...state,
        currentUser: payload,
      };
    },
  },
};

export default Login;

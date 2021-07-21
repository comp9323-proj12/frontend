import { loginUser, registerUser } from '@/services/user';
import {
  createSessionStorage,
  removeSessionStorage,
} from '@/utils/storageHelper';
// login是一个比较特殊的model，理论上所有model都应该是一个名词或者一个role，所以login行为理论上应该属于user model里的。
// 但是因为现实中的login的逻辑会非常复杂，写在user里就太冗长了，所以会单独提出来。虽然咱的login非常简单，但是形式上我还是单独提出来了。
const Login = {
  namespace: 'login',
  state: {
    registerFlag: undefined,
    currentUser: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(loginUser, payload);
      console.log('response', response);
      if (response.status === 200) {
        yield put({
          type: 'listCurrentUser',
          payload: response.data,
        });
      }
    },
    *logout(_, { call, put }) {
      yield put({
        type: 'clearCurrentUser',
      });
    },
    *register({ payload }, { call, put }) {
      const response = yield call(registerUser, payload);
      console.log('responseregister', response);
      if (response.status === 200) {
        yield put({
          type: 'listRegisterFlag',
          payload: response.data.registerFlag,
        });
      }
    },
  },

  reducers: {
    listCurrentUser(state, action) {
      const { payload } = action;
      console.log('payload', payload);
      createSessionStorage('currentUser', payload);
      return {
        ...state,
        currentUser: payload,
      };
    },
    clearCurrentUser(state, _) {
      removeSessionStorage('currentUser');
      return {
        ...state,
        currentUser: null,
      };
    },
    listRegisterFlag(state, action) {
      const { payload } = action;
      return {
        ...state,
        registerFlag: payload,
      };
    },
  },
};

export default Login;

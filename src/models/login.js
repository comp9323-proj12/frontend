import { loginUser } from '@/services/user';

// login是一个比较特殊的model，理论上所有model都应该是一个名词或者一个role，所以login行为理论上应该属于user model里的。
// 但是因为现实中的login的逻辑会非常复杂，写在user里就太冗长了，所以会单独提出来。虽然咱的login非常简单，但是形式上我还是单独提出来了。
const Login = {
  namespace: 'login',
  state: {
    // TODO: 返回常用的当前用户信息，包括id,头像等
    currentUser: {},
  },
  effects: {
    // Send { userName:xxx, password:xxx } to backend
    *login({ payload }, { call, put }) {
      const response = yield call(loginUser, payload);
      if (response.status === 200) {
        // TODO: suppose response is like { status:200, data:{userId:xxxxxx} } or 404
        yield put({
          type: 'listCurrentUser',
          payload: response.data.currentUser,
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

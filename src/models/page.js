const Page = {
  namespace: 'page',
  state: {
    page: 'home',
  },
  effects: {
    *routeComponent({ payload }, { _, put }) {
      yield put({
        type: 'routePage',
        payload,
      });
    },
  },

  reducers: {
    routePage(state, action) {
      const { payload } = action;
      return {
        ...state,
        page: payload,
      };
    },
  },
};

export default Page;

const Page = {
  namespace: 'page',
  state: {
    currentPage: 'home',
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
        currentPage: payload,
      };
    },
  },
};

export default Page;

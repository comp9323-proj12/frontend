const Page = {
  namespace: 'page',
  state: {
    currentPage: 'home',
    activateContent: {},
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
      const {
        payload: { currentPage, activateContent },
      } = action;
      return {
        ...state,
        currentPage,
        activateContent,
      };
    },
  },
};

export default Page;

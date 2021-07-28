import {
  createSessionStorage,
  removeSessionStorage,
  getSessionStorage,
} from '@/utils/storageHelper';

const Page = {
  namespace: 'page',
  state: {
    currentPage: '',
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
      createSessionStorage('currentPage', currentPage);
      createSessionStorage('activateContent', activateContent);
      return {
        ...state,
        currentPage,
        activateContent,
      };
    },
  },
};

export default Page;

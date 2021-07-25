import { getVideosByUserId, createVideo } from '@/services/video';

const Video = {
  namespace: 'video',
  state: {
    userVideos: [],
    createVideoStatus: null,
    reversalVideoStatus: false,
  },
  effects: {
    *fetchVideosByUserId({ payload }, { call, put }) {
      const response = yield call(getVideosByUserId, payload);
      if (response.status === 200) {
        yield put({
          type: 'listUserVideos',
          payload: response.data,
        });
      }
    },
    *createVideo({ payload }, { call, put }) {
      const response = yield call(createVideo, payload);
      yield put({
        type: 'putCreateVideoStatus',
        payload: response.status,
      });
    },
  },

  reducers: {
    listUserVideos(state, action) {
      const { payload } = action;
      return {
        ...state,
        userVideos: payload,
      };
    },
    putCreateVideoStatus(state, action) {
      const { payload } = action;
      return {
        ...state,
        createVideoStatus: payload,
        reversalVideoStatus: !state.reversalVideoStatus,
      };
    },
  },
};

export default Video;

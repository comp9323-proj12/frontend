import {
  getVideosByUserId,
  createVideo,
  deleteVideo,
  updateVideo,
  searchVideos,
} from '@/services/video';

const Video = {
  namespace: 'video',
  state: {
    userVideos: [],
    createVideoStatus: null,
    reversalVideoStatus: false,
    searchVideosResults: [],
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
    *searchVideos({ payload }, { call, put }) {
      const response = yield call(searchVideos, payload);
      yield put({
        type: 'listSearchVideosResults',
        payload: response.data,
      });
    },

    *createVideo({ payload }, { call, put }) {
      const response = yield call(createVideo, payload);
      yield put({
        type: 'putCreateVideoStatus',
        payload: response.status,
      });
    },
    *updateVideo({ payload }, { call, put }) {
      yield call(updateVideo, payload);
    },
    *deleteVideo({ payload }, { call, put }) {
      const response = yield call(deleteVideo, payload);
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
    listSearchVideosResults(state, action) {
      const { payload } = action;
      return {
        ...state,
        searchVideosResults: payload,
      };
    },
  },
};

export default Video;

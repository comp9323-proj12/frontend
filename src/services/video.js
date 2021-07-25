import request from '@/utils/request';

export async function getVideosByUserId(data) {
  return request({
    method: 'GET',
    url: `/videos/user/${data}`,
  });
}

export async function createVideo(data) {
  return request({
    method: 'POST',
    url: '/videos',
    data,
  });
}

export async function getResearchers() {
  return request({
    method: 'GET',
    url: '/users/researchers',
  });
}

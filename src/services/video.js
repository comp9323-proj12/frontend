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

export async function updateVideo(data) {
  return request({
    method: 'PATCH',
    url: `/videos/${data._id}`,
    data,
  });
}

export async function deleteVideo(data) {
  return request({
    method: 'DELETE',
    url: `/videos/delete/${data}`,
  });
}

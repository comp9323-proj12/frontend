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
  console.log('dataasycn', data);
  return request({
    method: 'PATCH',
    url: `/videos/${data.author}`,
    data,
  });
}

export async function deleteVideo(data) {
  return request({
    method: 'DELETE',
    url: `/videos/delete/${data}`,
  });
}

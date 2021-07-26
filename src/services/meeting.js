import request from '@/utils/request';

export async function getMeetingsByUserId(data) {
  return request({
    method: 'GET',
    url: `/meetings/user/${data}`,
    data,
  });
}

export async function createMeeting(data) {
  return request({
    method: 'POST',
    url: '/meetings',
    data,
  });
}

export async function deleteMeeting(data) {
  return request({
    method: 'DELETE',
    url: `/meetings/delete/${data}`,
  });
}

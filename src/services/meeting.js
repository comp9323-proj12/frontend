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

export async function getResearchers() {
  return request({
    method: 'GET',
    url: '/users/researchers',
  });
}

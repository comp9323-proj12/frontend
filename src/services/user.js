import request from '@/utils/request';

export async function loginUser(data) {
  return request({
    method: 'POST',
    url: '/users/login',
    data,
  });
}

export async function registerUser(data) {
  return request({
    method: 'POST',
    url: '/users/register',
    data,
  });
}

export async function getResearchers() {
  return request({
    method: 'GET',
    url: '/users/researchers',
  });
}

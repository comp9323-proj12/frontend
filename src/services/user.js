import request from '@/utils/request';

export async function loginUser(data) {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data,
  });
}

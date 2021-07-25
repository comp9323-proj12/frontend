import request from '@/utils/request';

export async function getArticlesByUserId(data) {
  console.log('paramas', data);
  return request({
    method: 'GET',
    url: `/articles/user/${data}`,
    data,
  });
}

export async function createArticle(data) {
  console.log('dataasycn', data);
  return request({
    method: 'POST',
    url: '/articles',
    data,
  });
}

export async function getResearchers() {
  return request({
    method: 'GET',
    url: '/users/researchers',
  });
}

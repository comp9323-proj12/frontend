import request from '@/utils/request';

export async function getArticlesByUserId(data) {
  return request({
    method: 'GET',
    url: `/articles/user/${data}`,
  });
}

export async function createArticle(data) {
  return request({
    method: 'POST',
    url: '/articles',
    data,
  });
}

export async function searchArticles(data) {
  return request({
    method: 'GET',
    url: `/articles?subCategory=${data.subCategory}&value=${data.value}`,
  });
}

export async function updateArticle(data) {
  return request({
    method: 'PATCH',
    url: `/articles/${data._id}`,
    data,
  });
}

export async function deleteArticle(data) {
  return request({
    method: 'DELETE',
    url: `/articles/delete/${data}`,
  });
}

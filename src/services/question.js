import request from '@/utils/request';

export async function createReply(data) {
  console.log('dataasycn', data);
  return request({
    method: 'POST',
    url: '/questions/reply',
    data,
  });
}
export async function createQuestion(data) {
  console.log('dataasycn', data);
  return request({
    method: 'POST',
    url: '/questions',
    data,
  });
}
export async function getQuestionsByArticle(data) {
  console.log('dataasycn', data);
  return request({
    method: 'GET',
    url: `/questions/article/${data}`,
  });
}
export async function getQuestionsByVideo(data) {
  console.log('dataasycn', data);
  return request({
    method: 'GET',
    url: `/questions/video/${data}`,
  });
}
// export async function updateArticle(data) {
//   console.log('dataasycn', data);
//   return request({
//     method: 'PATCH',
//     url: `/articles/${data._id}`,
//     data,
//   });
// }

// export async function deleteArticle(data) {
//   return request({
//     method: 'DELETE',
//     url: `/articles/delete/${data}`,
//   });
// }

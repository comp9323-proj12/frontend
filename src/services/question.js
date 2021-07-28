import request from '@/utils/request';

export async function createReply(data) {
  return request({
    method: 'POST',
    url: '/questions/reply',
    data,
  });
}
export async function createQuestion(data) {
  return request({
    method: 'POST',
    url: '/questions',
    data,
  });
}
export async function getQuestionsByArticle(data) {
  return request({
    method: 'GET',
    url: `/questions/article/${data}`,
  });
}
export async function getQuestionsByVideo(data) {
  return request({
    method: 'GET',
    url: `/questions/video/${data}`,
  });
}

import request, { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = (error) => {
  if (error.response.status > 400) {
    message.error(error.data.message ? error.data.message : error.data);
  } else {
    message.error('network error');
  }
};
const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  const reqData = extendRequest(
    'http://public-api-v1.aspirantzhang.com/users',
    {
      method: 'get',
    },
  )
    .then((item) => item)
    .catch((error) => console.log(error));
  return reqData;
};

export const addRemoteItem = async ({ values }) => {
  console.log('touch service', values);
  const newData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users`,
    {
      method: 'post',
      data: values,
    },
  )
    .then((response) => message.success('successed added table item'))
    .catch((error) => message.error('falied to add new item'));
  return newData;
};
export const editRemoteList = async ({ values, id }) => {
  const reqData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users/${id}`,
    {
      method: 'put',
      data: values,
    },
  )
    .then(message.success('success edit table item'))
    .catch((error) => message.error('failed to edit item'));
  return reqData;
};

export const deleteRemoteList = async ({ id }) => {
  const deleData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users/${id}`,
    {
      method: 'delete',
    },
  )
    .then((response) => message.success('successed delete table item'))
    .catch((error) => message.error('failed to delete table item'));
  return deleData;
};

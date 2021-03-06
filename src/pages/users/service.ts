import request, { extend } from 'umi-request';
import { message } from 'antd';

const errorHandler = (error: any) => {
  if (error.response.status > 400) {
    message.error(error.data.message ? error.data.message : error.data);
  } else {
    message.error('network error');
  }
  throw error;
};
const extendRequest = extend({ errorHandler });

export const getRemoteList = async ({
  page,
  per_page,
}: {
  page: number;
  per_page: number;
}) => {
  const reqData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users?page=${page}&per_page=${per_page}`,
    {
      method: 'get',
    },
  )
    .then((item) => item)
    .catch((error) => console.log(error));
  return reqData;
};

export const addRemoteItem = async ({ values }: { values: any }) => {
  console.log('touch service', values);
  const newData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users`,
    {
      method: 'post',
      data: values,
    },
  )
    .then((response) => true)
    .catch((error) => false);
  return newData;
};
export const editRemoteList = async ({
  values,
  id,
}: {
  values: any;
  id: number;
}) => {
  const reqData = extendRequest(
    `http://public-api-v1.aspirantzhang.com/users/${id}`,
    {
      method: 'put',
      data: values,
    },
  )
    .then((res) => true)
    .catch((error) => false);
  return reqData;
};

export const deleteRemoteList = async ({ id }: { id: number }) => {
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

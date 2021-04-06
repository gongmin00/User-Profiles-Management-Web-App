import { request } from 'umi';

export const getRemoteList = async () => {
  const reqData = request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then((item) => item)
    .catch((error) => console.log(error));
  return reqData;
};

export const editRemoteList = async ({ values, id }) => {
  const reqData = request(
    `http://public-api-v1.aspirantzhang.com/users/${id}`,
    {
      method: 'put',
      data: values,
    },
  )
    .then((response) => console.log('success edit remote list'))
    .catch((error) => console.log(error));
  return reqData;
};
// const getRemoteList = async () => {
//   const listData = [
//     {
//       key: '1',
//       name2: 'John Brown',
//       age: 32,
//       location: 'New York No. 1 Lake Park',
//       tags: ['nice', 'developer'],
//     },
//   ];
//   return listData;
// };

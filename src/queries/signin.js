import service from 'services';

const signin = async (fields) => {
  const { data } = await service({
    url: '/signin',
    method: 'post',
    data: fields,
  });
  return data;
};

export default signin;

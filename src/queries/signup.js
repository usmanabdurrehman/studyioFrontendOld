import service from 'services';

const signup = async (formdata) => {
  const { data } = await service({
    url: '/signup',
    method: 'post',
    data: formdata,
  });
  return data;
};

export default signup;

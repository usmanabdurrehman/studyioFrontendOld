import service from 'services';

const addPost = async (formdata) => {
  const { data } = await service({
    url: '/user/posts',
    method: 'post',
    data: formdata,
  });
  return data;
};

export default addPost;

import service from 'services';

const hidePost = async (postId) => {
  const { data } = await service({
    url: '/user/hidePost',
    method: 'put',
    data: { postId },
  });
  return data;
};

export default hidePost;

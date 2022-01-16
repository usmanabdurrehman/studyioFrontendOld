import service from 'services';

const deletePost = async (id) => {
  const { data } = await service({
    url: '/user/posts',
    method: 'delete',
    data: { postId: id },
  });
  return data;
};

export default deletePost;

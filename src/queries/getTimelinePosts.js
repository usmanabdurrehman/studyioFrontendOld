import service from 'services';

const getTimelinePosts = async () => {
  const { data } = await service({
    url: '/user/timelinePosts',
  });
  return data;
};

export default getTimelinePosts;

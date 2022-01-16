import service from 'services';

const getProfileInfo = async (id) => {
  const { data } = await service({
    url: `/user/profile/${id}`,
  });
  return data;
};

export default getProfileInfo;

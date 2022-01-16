import service from 'services';

const createConversation = async (profile) => {
  const { data } = await service({
    url: '/user/conversations',
    method: 'post',
    data: { id: profile._id },
  });
  return data;
};

export default createConversation;

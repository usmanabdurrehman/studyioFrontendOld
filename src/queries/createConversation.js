import service from 'services';

const createConversation = async (id) => {
  const { data } = await service({
    url: '/user/conversations',
    method: 'post',
    data: { id },
  });
  return data;
};

export default createConversation;

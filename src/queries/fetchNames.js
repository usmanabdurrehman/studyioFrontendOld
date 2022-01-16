import service from 'services';

const fetchNames = async (name) => {
  const { data } = await service({
    url: '/user/fetchNames',
    method: 'post',
    data: { name },
  });
  return data;
};

export default fetchNames;

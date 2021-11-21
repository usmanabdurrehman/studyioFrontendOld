import { service } from "services";

export const getPostById = async (id) => {
  const { data } = await service({
    url: `/user/post/${id}`,
  });
  return data;
};

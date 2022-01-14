import { service } from "services";

export const editPost = async (formdata) => {
  const { data } = await service({
    url: "/user/posts",
    method: "put",
    data: formdata,
  });
  return data;
};

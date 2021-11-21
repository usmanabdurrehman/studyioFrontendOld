import { service } from "services";

export const addPost = async (formdata) => {
  const { data } = await service({
    url: "/user/posts",
    method: "post",
    data: formdata,
  });
  return data;
};

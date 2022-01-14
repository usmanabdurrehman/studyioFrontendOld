import { service } from "services";

export const hidePost = async (postId) => {
  const { data } = await service({
    url: "/user/hidePost",
    method: "put",
    data: { postId },
  });
  console.log("data", data);
  return data;
};

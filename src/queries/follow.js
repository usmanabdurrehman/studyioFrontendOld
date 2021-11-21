import { service } from "services";

export const follow = async (id) => {
  const { data } = await service({
    method: "post",
    url: "/user/follow",
    data: { userId: id },
  });
  return data;
};

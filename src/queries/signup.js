import { service } from "services";

export const signup = async (formdata) => {
  const { data } = await service({
    url: "/signup",
    method: "post",
    data: formdata,
  });
  return data;
};

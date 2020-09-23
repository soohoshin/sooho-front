import { useUserInfoShared } from "../context/global-context";

const useLogin = () => {
  const [, setUserInfoData] = useUserInfoShared();
  return setUserInfoData;
};

export { useLogin };

import { createBreakpoint, createGlobalState } from "react-use";

const useBreakpoint = createBreakpoint({ XL: 1200, L: 992, S: 768, XS: 600 });

const useUserInfoShared = createGlobalState({
  isOurLogin: false,
  userId: null,
  userName: null,
});

export { useBreakpoint, useUserInfoShared };

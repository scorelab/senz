import { NAV_HEADING } from "./types/index";
export const toggleHeadingAction = heading => {
  return {
    type: NAV_HEADING,
    payload: heading
  };
};

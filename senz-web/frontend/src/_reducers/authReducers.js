import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  UPDATE_USER,
  CLEAR_ALL
} from "../_actions/types/index";
export default function(state = {}, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true, user: action.payload };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false, user: {} };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_USER:
      return {
        ...state,
        authenticated: true,
        user: { ...state.user, name: action.payload.name }
      };
    case CLEAR_ALL:
      return {};
    default:
      return state;
  }
}

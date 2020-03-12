import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  PASSWORD_RESETTED,
  PASSWORD_RESET_ERROR,
  RESET_PASSWORD_TOKEN_VERIFIED,
  RESET_PASSWORD_TOKEN_VERIFICATION_ERROR,
  PASSWORD_UPDATED,
  PASSWORD_UPDATION_ERROR,
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
    case PASSWORD_RESETTED:
      return { ...state, password_resetted: true };
    case PASSWORD_RESET_ERROR:
      return { ...state, password_resetted: false };
    case RESET_PASSWORD_TOKEN_VERIFIED:
      return { ...state, token_verified: true };
    case RESET_PASSWORD_TOKEN_VERIFICATION_ERROR:
      return { ...state, token_verified: false };
    case PASSWORD_UPDATED:
      return { ...state, password_updated: true };
    case PASSWORD_UPDATION_ERROR:
      return { ...state, password_updated: false };
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

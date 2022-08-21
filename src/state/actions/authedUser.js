export const SET_AUTHED_USER = "SET_AUTHED_USER";

export const AUTHED_ID = "tylermcginnis";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

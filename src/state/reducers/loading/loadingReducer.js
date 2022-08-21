import { START_LOADING, STOP_LOADING } from "../../actions/loading";

export default function loading(state, action) {
  switch (action.type) {
    case STOP_LOADING:
      return false;
    case START_LOADING:
      return true;
    default:
      return state;
  }
}

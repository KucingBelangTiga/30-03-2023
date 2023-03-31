import { takeEvery, all, take } from "redux-saga/effects";
// import * as ActionRegion from '../Constant/RegionConstant'
// import { EditRegion, FindRegion, createRegion, handleRegion } from "./RegionSaga";
import * as ActionUser from "../Constant/UserConstant";
import { handleSignin, handleSignout, handleSignup } from "./UserSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionUser.SIGNIN_REQUEST, handleSignin),
    takeEvery(ActionUser.SIGNUP_REQUEST, handleSignup),
    takeEvery(ActionUser.SIGNOUT_REQUEST, handleSignout),
  ]);
}

export default watchAll;

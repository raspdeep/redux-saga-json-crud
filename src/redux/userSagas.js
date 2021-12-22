import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";
import * as types from "./actionTypes";

import {
  loadUserSuccess,
  loadUserError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "./actions";
import {
  loadUsersAPI,
  createUserAPI,
  deleteUserAPI,
  updateUserAPI,
} from "./api";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersAPI);
    if (response.status === 200) {
      //yield delay(1000);
      yield put(loadUserSuccess(response.data));
    }
  } catch (error) {
    //console.log("onLoadUser err>>", error);
    yield put(loadUserError(error));
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserAPI, payload);
    if (response.status === 200) {
      //yield delay(1000);
      yield put(createUserSuccess());
    }
  } catch (error) {
    yield put(createUserError(error));
  }
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserAPI, userId);
    if (response.status === 200) {
      //yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error));
  }
}

function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserAPI, id, formValue);
    if (response.status === 200) {
      //yield delay(1000);
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error));
  }
}

//listening to LOAD_USERS_START dispatch
function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

//listening to CREATE_USER_START dispatch
function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

//listening to DELETE_USER_START dispatch
function* onDeleteUser() {
  //   yield takeLatest(types.DELETE_USER_START, onDeleteUserStartAsync);
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

//listening to UPDATE_USER_START dispatch
function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}

import { applyMiddleware, createStore } from "redux";
import createSagaMiddleWare from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducers";
import rootSaga from "./userSagas";

const sagaMiddleware = createSagaMiddleWare();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "../_reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const middlewares = [thunk];

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

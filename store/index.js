import { createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducer from "./reducer";

const persistConfig = {
	key: "root",
	storage: storage,
	timeout: null,
	// blacklist:["reducer"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persister = persistStore(store);

export { store, persister };

export default store;

import { createStore } from "redux";

// reducer
import rootReducer from "./reducers";

// create store
const appStore = createStore(rootReducer);

export default appStore;

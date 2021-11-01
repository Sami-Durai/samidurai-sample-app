import { createStore } from "redux";

// reducer
import rootReducer from "store/reducers";

// create store
const appStore = createStore(rootReducer);

export default appStore;

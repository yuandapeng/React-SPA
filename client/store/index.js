import {createStore, combineReducers} from "redux";
import global from "../model/global";
export default createStore(combineReducers({
    global
}), {
    global: {
        count: 1
    }
});

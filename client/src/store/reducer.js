import { combineReducers } from "redux";
import dashboardReducer from './reducers/dashboardReducer';

const rootReducer =  combineReducers({
    dashboard : dashboardReducer
});

export default rootReducer
import { combineReducers } from "redux";
import dashboardReducer from './reducers/dashboardReducer';
import callReducer from './reducers/callReducer';

const rootReducer =  combineReducers({
    dashboard : dashboardReducer,
    call: callReducer
});

export default rootReducer
// 引入其他reducer进行统一管理
import mapReducer from "./mapReducer";

// 负责合并reducer
import { combineReducers } from "redux";

// 导出
export default combineReducers({mapReducer})
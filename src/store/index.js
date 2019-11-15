// 引入reducer
import reducer from "./reducer";

//引入store生成器， 中间件加载器
import { createStore,applyMiddleware } from "redux";

//引入redux
import reduxThunk from "redux-thunk";

// 导出
export default createStore(reducer,applyMiddleware(reduxThunk));

import {SET_CITY} from "../actionTypes";

// 定义默认数据
const defaultState = {
  cityName: ''
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case SET_CITY:
      newState.cityName = action.value.cityName;
      newState.point = action.value.point;
      break;
    default:
      return  state;
      break;
  }

  return newState;
}
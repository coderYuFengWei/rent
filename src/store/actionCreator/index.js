import {SET_CITY} from "../actionTypes";
import {getCity} from "../../utils/baiduMap";

// 异步设置城市名称
export const setCity = () => {
  return (dispatch) => {
    getCity()
      .then(({cityName,point}) => {
        cityName = cityName.substr(0, cityName.length - 1);
        dispatch({
          type: SET_CITY,
          value: {cityName,point}
        })
      })
  }
}

// 同步获取城市数据
export const syncSetCity = (cityName)=>{
  return {
    type: SET_CITY,
    value: {cityName}
  }
}
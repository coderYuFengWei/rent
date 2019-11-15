import {SET_CITY} from "../actionTypes";
import {getCity} from "../../utils/baiduMap";

// 异步设置城市名称
export const setCity = () => {
  return (dispatch) => {
    getCity()
      .then(cityName => {
        dispatch({
          type: SET_CITY,
          value: cityName
        })
      })
  }
}
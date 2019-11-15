const BMap = window.BMap;
const geolocation = new BMap.Geolocation();

// 获取当前位置的经纬度
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    geolocation.getCurrentPosition(function (r) {
      resolve(r.point)
    })
  })
}

// 根据经纬度获取所在的城市
export const getCity = () => {
  return new Promise((resolve, reject) => {
    getCurrentPosition()
      .then(point => {
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(point.lng, point.lat), function (result) {
          const cityName = result.addressComponents.city;
          resolve(cityName);
        })
      })
  })
}
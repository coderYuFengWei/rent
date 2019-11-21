import React, {Component,Fragment} from 'react';
import BDMapCss from "./BDMap.module.scss";
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from "react-router-dom"
import axios from '../../utils/request';
import { connect } from "react-redux"


const BMap = window.BMap;
class BDMap extends Component {

  componentDidMount() {
  this.getCity();
  }

  getCity = async ()=>{
    const cityName = this.props.cityName;
    const id = (await axios.get("area/info?name=" + cityName)).data.body.value;
    const houses = (await axios.get("area/map?id=" + id)).data.body;
    this.drawCircle(houses)
  }

  drawCircle=(houses)=>{
    // 百度地图API功能
  var map = new BMap.Map("container");
	var point = new BMap.Point(this.props.point.lng,this.props.point.lat);
  map.centerAndZoom(point, 10);
  
  houses.forEach(v=>{
    const citypoint = new BMap.Point(v.coord.longitude,v.coord.latitude);
    var opts = {
      position : citypoint,    // 指定文本标注所在的地理位置
    }
    var label = new BMap.Label(`<div class='${BDMapCss.circle}'>${v.label}<br/>${v.count}套</div>`, opts);  // 创建文本标注对象
    label.setStyle({
      border: "none",
      backgroundColor: "transparent"
     });
     
     map.addOverlay(label); 
  }) 
  }

  render() {
    return ( 
      <Fragment >
         <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() =>this.props.history.go(-1)}
    >城市选择</NavBar>
        <div className={BDMapCss.container} id="container"></div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state)=>({
  cityName:state.mapReducer.cityName,
  point:state.mapReducer.point,
})

export default connect(mapStateToProps,null)(withRouter(BDMap));
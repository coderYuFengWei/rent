import React, { Component,Fragment } from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { withRouter} from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../utils/request";
import HKListCss from "./HKList.module.scss";
import { syncSetCity } from "../../store/actionCreator";

// 可视区域渲染
import { List,AutoSizer } from "react-virtualized"


class HKList extends Component {

  state = {
    // 城市总数据
    totalCities:[],
    // 右侧字母列表
    letterList:[],
    currentIndex: 0
  }

  componentDidMount(){
    this.getCities();
  }

  // 获取城市列表
  async getCities() {
    let totalCities  = [];
    let letterList = ["#","热"];

    const cityName = this.props.cityName;
    const hotCity = (await axios.get("area/hot")).data.body;
    const allCities = (await axios.get("area/city?level=1")).data.body;

    totalCities.push({"当前城市":[cityName]});
    totalCities.push({"热门城市":hotCity.map(v=>v.label)});

    allCities.sort((a,b)=>b.short>a.short?-1:1);
    allCities.forEach((item,index)=>{
      let firstLetter = item.short[0].toUpperCase();
      const indexer = totalCities.findIndex(v=>{
        return v[firstLetter]
      })

      if(indexer!==-1){
        totalCities[indexer][firstLetter].push(item.label)
      }else {
        totalCities.push(
          {
            [firstLetter]:[item.label]
          }
        )
        letterList.push(firstLetter)
      }
    })

    this.setState({
      totalCities,letterList
    })

  }

  rowRenderer=({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    })=> {
    const { totalCities} = this.state;
    const property = Object.keys(totalCities[index])[0];
    const item = totalCities[index];
    return (
      <div className={HKListCss.ciyies_item} key={key} style={style}>
        <div className={HKListCss.cities_item_title}>{property}</div>
        <div className={HKListCss.cities_item_group}>
          {item[property].map((v,i)=>
          <div onClick={()=>this.handleCityChange(v)} className={HKListCss.city_name} key={i}>{v}</div>
          )}
        </div>
      </div>
    );
  }

  // 行高
  rowHeight=({index})=>{
    const { totalCities} = this.state;
    const property = Object.keys(totalCities[index])[0];
    const item = totalCities[index];
    const rowHeight = item[property].length*50+50;
    return rowHeight;
  }

  // 字母点击事件
  handleLetter=(index)=>{
    this.setState({
      currentIndex:index
    })
  }

  // 滚动事件
  rowsRendered=({startIndex})=>{
    this.setState({
      currentIndex:startIndex
    })
  }

  // 点击城市事件
  handleCityChange=(cityName)=>{
    if(['北京','上海','深圳','广州'].includes(cityName)){
      this.props.setCity(cityName);
      this.props.history.push('/');
    }else{
      Toast.info('该城市下没有房源信息',1);
    }
  }

  render() {
    const { totalCities,letterList,currentIndex } = this.state;
    // const width = window.screen.width;
    // let height = window.screen.height-45-50;
    return (
      <Fragment>
       <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() =>this.props.history.go(-1)}
    >城市选择</NavBar>

    {/* 城市列表 */}
    <div className={HKListCss.cities_list}>
      <AutoSizer>
        {
          ({width,height})=>
          <List
          width={width}
          height={height}
          rowCount={totalCities.length}
          rowHeight={this.rowHeight}
          rowRenderer={this.rowRenderer}
          scrollToIndex={currentIndex}
          scrollToAlignment='start'
          onRowsRendered={this.rowsRendered}
          />
        }
      </AutoSizer>

      {/* 字母列表 */}
      <div className={HKListCss.letter_list}>
        {letterList.map((v,i)=>
        <div onClick={()=>this.handleLetter(i)} className={[HKListCss.letter_item,i===currentIndex?HKListCss.active:''].join(' ')} key={v}>{v}</div>
        )}
      </div>
    </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  cityName:state.mapReducer.cityName
})

const mapDispatchToProps = dispatch=> {
  return {
    setCity(cityName){
      dispatch(syncSetCity(cityName))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HKList));

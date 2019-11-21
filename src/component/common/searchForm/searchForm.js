import React, { Component,Fragment } from 'react';
import SearchCss from "./searchForm.module.scss";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";

class searchForm extends Component {
  render() {
    return (
      <Fragment>
        <div className={SearchCss.search}>
          <div className={SearchCss.search_btn}>
            <span onClick={()=>this.props.history.push("/HKList")} className={SearchCss.location}>{this.props.cityName}</span>
            <i className={['iconfont icon-arrow',SearchCss.arrow].join(' ')}></i>
            <span className={SearchCss.line}>|</span>
            <i className={['iconfont icon-seach',SearchCss.search_icon].join(' ')}></i>
            <p>请输入小区或地址</p>
          </div>
          <i onClick={()=>this.props.history.push('/BDMap')} className={['iconfont icon-map',SearchCss.mapicon].join(' ')}></i>
        </div>
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cityName:state.mapReducer.cityName
  }
}



export default connect(mapStateToProps, null)(withRouter(searchForm));


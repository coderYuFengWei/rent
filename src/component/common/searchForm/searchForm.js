import React, { Component,Fragment } from 'react';
import SearchCss from "./searchForm.module.scss"

class searchForm extends Component {
  render() {
    return (
      <Fragment>
        <div className={SearchCss.search}>
          <div className={SearchCss.search_btn}>
            <span className={SearchCss.location}>广州</span>
            <i className={['iconfont icon-arrow',SearchCss.arrow].join(' ')}></i>
            <span className={SearchCss.line}>|</span>
            <i className={['iconfont icon-seach',SearchCss.search_icon].join(' ')}></i>
            <p>请输入小区或地址</p>
          </div>
          <i className={['iconfont icon-map',SearchCss.mapicon].join(' ')}></i>
        </div>
      </Fragment>
    )
  }
}

export default searchForm;

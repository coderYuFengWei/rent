import React, { Component,Fragment } from 'react';
import { Carousel } from 'antd-mobile';
// import axios from "axios";
import axios from "../../utils/request";
import HomeCss from "./Home.module.scss";

import nav1 from "../../assets/images/nav-1.png"
import nav2 from "../../assets/images/nav-2.png"
import nav3 from "../../assets/images/nav-3.png"
import nav4 from "../../assets/images/nav-4.png"

export default class Home extends Component {
  state = {
    swiperList: [],
    imgHeight: 176,
    infoBarList:[
      { id: 0, text: "整租", src: nav1},
      { id: 1, text: "合租", src: nav2},
      { id: 2, text: "地图找房", src: nav3},
      { id: 3, text: "去出租", src: nav4},
    ],
    rentList:[],
    newsList:[]
  }

  componentDidMount(){
    axios.get("/home/swiper")
    .then(res=>{
      this.setState({
        swiperList: res.data.body
      })
    })

    axios.get("/home/groups")
    .then(res=>{
      this.setState({
        rentList:res.data.body
      })
    })

    axios.get("/home/news")
    .then(res=>{
      this.setState({
        newsList:res.data.body
      })
    })
  }

  render() {
    const {swiperList} = this.state;
    return (
      <Fragment>

        {/* 轮播图 */}
        <div className="swiper">
         {swiperList.length &&<Carousel
          autoplay
          infinite
        >
          {swiperList.map(val => (
            <a
              key={val.id}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={axios.defaults.baseURL + val.imgSrc}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>}
        </div>

        {/* 分类栏 */}
        <div className={HomeCss.infoBar}>
          {this.state.infoBarList.map(v=>
            <div key={v.id} className={HomeCss.infoBar_item}>
              <img src={v.src} alt=""/>
              <p>{v.text}</p>
            </div>
          )}
        </div>

        {/* 租房小组 */}
        <div className={HomeCss.rentList}>
         <div className={HomeCss.title}>
           <span>租房小组</span>
           <span>更多</span>
         </div>
         <div className={HomeCss.rentInfo_list}>
           {this.state.rentList.map(v=>
             <div key={v.id} className={HomeCss.rentInfo_list_item}>
             <div className={HomeCss.list_desc}>
               <span>{v.title}</span>
               <span>{v.desc}</span>
             </div>
             <img src={axios.defaults.baseURL + v.imgSrc} alt=""/>
           </div>)}        
         </div> 
        </div>

        {/* 最新资讯 */}
        <div className={HomeCss.news}>
          <p>最新资讯</p>
          {this.state.newsList.map(v=>
             <div key={v.id} className={HomeCss.news_item}>
             <img src={axios.defaults.baseURL + v.imgSrc} alt=""/>
             <div className={HomeCss.news_desc}>
                  <p>{v.title}</p>
                  <div className={HomeCss.tiny}>
                    <span>{v.from}</span>
                    <span>{v.date}</span>
                  </div>
             </div>
           </div>)}
        </div>

        <div className={HomeCss.footer}>没有更多了</div>

      </Fragment>
    )
  }
}

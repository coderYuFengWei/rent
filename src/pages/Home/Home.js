import React, { Component,Fragment } from 'react';
import { Carousel } from 'antd-mobile';
import axios from "axios";

export default class Home extends Component {
  state = {
    swiperList: [],
    imgHeight: 176,
  }

  componentDidMount(){
    axios.get("http://hkzf.zbztb.cn/home/swiper")
    .then(res=>{
      this.setState({
        swiperList: res.data.body
      })
    })
  }

  render() {
    const {swiperList} = this.state;
    return (
      <Fragment>
         {swiperList.length &&<Carousel
          autoplay
          infinite
        >
          {swiperList.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={"http://hkzf.zbztb.cn" + val.imgSrc}
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
      </Fragment>
    )
  }
}

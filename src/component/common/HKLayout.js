import React from 'react';
import { TabBar } from 'antd-mobile';
import { withRouter } from "react-router-dom";

class HKLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
      fullScreen: false,
    };
  }

  render() {
    const {history} = this.props;
    const path = this.props.match.path;
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar tintColor="#21b97a">
          <TabBar.Item
            title="首页"
            key="Home"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={path==="/"}
            onPress={() => {
              history.push("/")
            }}
          >
            {/* 放首页 */}
            {path==="/"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={ <i className="iconfont icon-findHouse"></i> }
            selectedIcon={<i className="iconfont icon-findHouse"></i>}
            title="找房"
            key="HKList"
            selected={path==="/HKList"}
            onPress={() => {
              history.push("/HKList")             
            }}
          >
            {/* 放找房 */}
            {path==="/HKList"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-infom"></i>}
            selectedIcon={<i className="iconfont icon-infom"></i>}
            title="资讯"
            key="News"
            selected={path==="/News"}
            onPress={() => {
              history.push("/News")
            }}
          >
            {/* 放资讯 */}
            {path==="/News"&&this.props.children}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iocnfont icon-my"></i>}
            selectedIcon={<i className="iconfont icon-my"></i>}
            title="我的"
            key="My"
            selected={path==="/My"}
            onPress={() => {
              history.push("/My")
            }}
          >
            {/* 放我的 */}
            {path==="/My"&&this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(HKLayout);

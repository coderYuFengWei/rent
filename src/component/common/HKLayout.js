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

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>Clicked “{pageText}” tab， show “{pageText}” information</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 20, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              hidden: !this.state.hidden,
            });
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={(e) => {
            e.preventDefault();
            this.setState({
              fullScreen: !this.state.fullScreen,
            });
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    );
  }

  render() {
    const {history} = this.props;
    const path = this.props.match.path;
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar>
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
            {this.props.children}
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
            {this.props.children}
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
            {this.props.children}
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
            {this.props.children}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(HKLayout);

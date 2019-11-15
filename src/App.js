import React, { Component,Fragment } from 'react';
import HKLayout from "./component/common/HKLayout/HKLayout";
import { HashRouter as Router, Route } from "react-router-dom";
import BDMap from "./pages/BDMap/BDMap";
import {connect} from "react-redux";
import { setCity } from "./store/actionCreator";

import Home from "./pages/Home/Home"
import HKList from "./pages/HKList/HKList"
import News from "./pages/News/News"
import My from "./pages/My/My"

class App extends Component {
  componentDidMount(){
    this.props.setCity();
  }
  render() {
    const {cityName} = this.props;
    return (
      <Fragment>
        {cityName && <Router>
          <Route exact path="/" render={(props) => <HKLayout {...props}><Home/></HKLayout>}></Route>
          <Route path="/HKList" render={(props) => <HKLayout {...props}><HKList/></HKLayout>}></Route>
          <Route path="/News" render={(props) => <HKLayout {...props}><News/></HKLayout>}></Route>
          <Route path="/My" render={(props) => <HKLayout {...props}><My/></HKLayout>}></Route>
          <Route path="/BDMap" Component={BDMap}><BDMap/></Route>
        </Router>}
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => ({
  cityName:state.mapReducer.cityName
})

const mapDispatchToProps = (dispatch)=> {
  return {
    setCity(){
      dispatch(setCity());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


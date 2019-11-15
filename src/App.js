import React, { Component,Fragment } from 'react';
import HKLayout from "./component/common/HKLayout/HKLayout";
import { HashRouter as Router, Route } from "react-router-dom"

import Home from "./pages/Home/Home"
import HKList from "./pages/HKList/HKList"
import News from "./pages/News/News"
import My from "./pages/My/My"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route exact path="/" render={(props) => <HKLayout {...props}><Home/></HKLayout>}></Route>
          <Route path="/HKList" render={(props) => <HKLayout {...props}><HKList/></HKLayout>}></Route>
          <Route path="/News" render={(props) => <HKLayout {...props}><News/></HKLayout>}></Route>
          <Route path="/My" render={(props) => <HKLayout {...props}><My/></HKLayout>}></Route>
        </Router>
      </Fragment>
    );
  }
}

export default App;

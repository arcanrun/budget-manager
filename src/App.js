//@flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import connect from "@vkontakte/vkui-connect-promise";

import { Header, BottomBar, Overlay } from "./components";
import {
  ManagerContainer,
  HistoryContainer,
  ProfileContainer
} from "./containers";
import EntranceContainer from "./containers/EntranceContainer";
// import { user } from "./static/user-data";

type PROPS = {
  logIn: Function,
  vk_id: ?number,
  isFetching: boolean
};

class App extends React.Component<PROPS, {}> {
  componentDidMount() {
    this.props.logIn();
  }
  render() {
    const { vk_id, isFetching } = this.props;
    console.log("---------->", this.props);
    return (
      <>
        {isFetching ? <Overlay /> : vk_id && <Header title={"менеджер"} />}
        <Switch>
          <Route path="/history" component={HistoryContainer} />
          {!vk_id ? (
            <Redirect exact to="/" from="/budget-manager" />
          ) : (
            <Route exact path="/budget-manager" component={ManagerContainer} />
          )}

          <Route path="/profile" component={ProfileContainer} />
          <Route path="/" component={EntranceContainer} />
        </Switch>
        {vk_id && <BottomBar />}
      </>
    );
  }
}

export default App;
import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./layout/Layout";
import FeedScreen from "./screens/FeedScreen";
import MessageScreen from "./screens/MessageScreen";
import TweetScreen from "./screens/TweetScreen";

const App: React.FunctionComponent = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={FeedScreen} />
        <Route exact path="/messages" component={MessageScreen} />
        <Route exact path="/tweet/:id" component={TweetScreen} />
      </Switch>
    </Layout>
  );
};

export default App;

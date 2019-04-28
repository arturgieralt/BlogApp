import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import StyledBanner from "../components/Banner/Banner";
import StyledBar from "../components/Bar/Bar";
import StyledMenuList from "../containers/MenuList";
import ArticleList from "../containers/ArticleList";
import SingleArticle from "./SingleArticle";
import ArticleEditor from "../containers/ArticleEditor";
import RegisterForm from "../containers/RegisterForm";
import LoginForm from "../containers/LoginForm";
import { history } from "../store/configure";

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <React.Fragment>
        <StyledBar>
          <StyledMenuList />
        </StyledBar>
        <StyledBanner />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/articles" component={ArticleList} />
          <Route exact path="/articles/add" component={ArticleEditor} />
          <Route path="/articles/:id" component={SingleArticle} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </React.Fragment>
    </ConnectedRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Root;

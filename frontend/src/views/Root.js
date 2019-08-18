import React from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadReCaptcha } from "react-recaptcha-v3";
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
import UserPanel from "../containers/UserPanel";
import Can from "../containers/Can";
import NoAcess from "../components/NoAccess/NoAccess";
import LoginPage from "../components/LoginPage/LoginPage";
import FacebookCallback from "../containers/FacebookCallback";

export const CAPTCHA_KEY = "6LckFKMUAAAAACb6b-gTNT0QCIQj6c3ml2xBwWIo";

class Root extends React.Component {
  componentDidMount() {
    loadReCaptcha(CAPTCHA_KEY);
  }

  render() {
    const { store } = this.props;

    return (
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
              <Route exact path="/tags/:tag" component={ArticleList} />
              <Route
                exact
                path="/articles/add"
                component={Can({
                  permission: "articles:add",
                  Component: ArticleEditor,
                  NoAccessComponent: NoAcess
                })}
              />
              <Route path="/articles/:id" component={SingleArticle} />
              <Route exact path="/user/register" component={RegisterForm} />
              <Route exact path="/user/login/form" component={LoginForm} />
              <Route exact path="/user/login" component={LoginPage} />
              <Route
                exact
                path="/login/facebook"
                component={FacebookCallback}
              />
              <Route
                exact
                path="/user/view"
                component={Can({
                  permission: "user-page:visit",
                  Component: UserPanel,
                  NoAccessComponent: NoAcess
                })}
              />
            </Switch>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Root;

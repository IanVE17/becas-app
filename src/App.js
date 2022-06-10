import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import {
  AdminScreen,
  BecasScreen,
  FavoritesScreen,
  LoginScreen,
  RegisterScreen,
  ProfileScreen,
} from "./pages/index";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// * Custom Styles
import "./assets/styles/app.css";

setupIonicReact();

export const App = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />

          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/Login" />
            </Route>

            <Route path="/Login" exact={true}>
              <LoginScreen />
            </Route>

            <Route path="/Register" exact={true}>
              <RegisterScreen />
            </Route>

            <Route path="/page/Admin" exact={true}>
              <AdminScreen />
            </Route>

            <Route path="/page/Becas" exact={true}>
              <BecasScreen />
            </Route>

            <Route path="/page/Profile" exact={true}>
              <ProfileScreen />
            </Route>

            <Route path="/page/Favorites" exact={true}>
              <FavoritesScreen />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

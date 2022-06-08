import { useEffect, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  readerOutline,
  readerSharp,
  heartOutline,
  heartSharp,
  desktopOutline,
  desktopSharp,
  logOutOutline,
  logOutSharp,
  personCircleOutline,
  personCircleSharp,
} from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { oAuth, logout, getUser } from "../environments/api";
import { useHistory } from "react-router-dom";

const appPages = [
  {
    title: "Admin",
    url: "/page/Admin",
    iosIcon: desktopOutline,
    mdIcon: desktopSharp,
  },
  {
    title: "Perfil",
    url: "/page/Profile",
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp,
  },
  {
    title: "Becas",
    url: "/page/Becas",
    iosIcon: readerOutline,
    mdIcon: readerSharp,
  },
  {
    title: "Favoritos",
    url: "/page/Favorites",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Cerrar Sesión",
    url: "",
    iosIcon: logOutOutline,
    mdIcon: logOutSharp,
  },
];

const Menu = () => {
  const [user] = useAuthState(oAuth);
  const [oUser, setUser] = useState({});
  const history = useHistory();

  const location = useLocation();

  const fetchUser = async (id) => {
    let docs = [];
    const aData = await getUser(id);
    aData.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setUser(docs[0]);
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      if (user?.uid) {
        fetchUser(user.uid);
      }
    }
  }, [user]);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Becas App</IonListHeader>
          <IonNote>
            Hola
            {Object.keys(oUser).length ? ` ${oUser.names}` : ""}
          </IonNote>
          {(oUser?.type === "admin" ? appPages : appPages.slice(1)).map(
            (appPage, index) => {
              return (
                <IonMenuToggle
                  key={index}
                  autoHide={false}
                  onClick={appPage.title === "Cerrar Sesión" ? logout : null}
                >
                  <IonItem
                    className={
                      location.pathname === appPage.url ? "selected" : ""
                    }
                    routerLink={appPage.url}
                    routerDirection="none"
                    lines="none"
                    detail={false}
                  >
                    <IonIcon
                      slot="start"
                      ios={appPage.iosIcon}
                      md={appPage.mdIcon}
                    />
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            }
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

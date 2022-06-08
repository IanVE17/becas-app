import { useEffect, useState } from "react";
import { IonButton, IonContent, IonLabel, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginForm } from "../../components";
import { oAuth, login, getUser } from "../../environments/api";

export const LoginScreen = () => {
  const [oUser, setUser] = useState({});
  const [user, loading] = useAuthState(oAuth);
  const history = useHistory();

  const fetchUser = async (id) => {
    let docs = [];
    const aData = await getUser(id);
    aData.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setUser(docs[0]);
  };

  useEffect(() => {
    if (user) {
      fetchUser(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (oUser.type) {
      history.push(`/page${oUser.type === "admin" ? "/Admin" : "/Becas"}`);
    }
  }, [oUser]);

  const _handleSubmit = (oSend) => {
    login(oSend);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="container">
        <h1>BECAS APP</h1>
        {/* TODO: Put the logo HERE */}
        <LoginForm onSubmit={_handleSubmit} loading={loading} />
        <div>
          <IonLabel>¿No tienes una cuenta?</IonLabel>
          <br />
          <br />
          <br />
          <IonButton color="warning" onClick={() => history.push("/Register")}>
            REGISTRATE
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

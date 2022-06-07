import { useEffect } from "react";
import { IonButton, IonContent, IonLabel, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoginForm } from "../../components";
import { oAuth, login } from "../../environments/api";

export const LoginScreen = () => {
  const [user, loading] = useAuthState(oAuth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/page/Admin");
    }
  }, [user]);

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

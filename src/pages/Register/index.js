import { useEffect } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { oAuth, register } from "../../environments/api";
import { RegisterForm } from "../../components";

export const RegisterScreen = () => {
  const [user, loading] = useAuthState(oAuth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/page/Admin");
    }
  }, [user]);

  const _handleSubmit = (oSend) => {
    register(oSend);
  };
  return (
    <IonPage>
      <IonContent fullscreen className="container">
        <div style={{ marginTop: "10%" }}>
          <img
            src={require("../../assets/img/logo.png")}
            width="125px"
            height="125px"
            style={{ borderRadius: "50%" }}
          />
          <RegisterForm onSubmit={_handleSubmit} loading={loading} />
          <IonButton color="warning" onClick={() => history.push("/Login")}>
            REGRESAR AL INICIO DE SESIÓN
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

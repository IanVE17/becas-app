import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonFabButton,
  IonFab,
  IonIcon,
} from "@ionic/react";
import { createOutline } from "ionicons/icons";

export const ProfileScreen = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="container">
        <div style={{ marginTop: "20%", padding: "5%" }}>
          <img
            src={require("../../assets/img/profile.jpg")}
            width="150px"
            height="150px"
            style={{ borderRadius: "50%" }}
          />
          <h1>Nombre completo</h1>
          <br />
          <IonItem>
            <IonLabel>
              <h1>Correo</h1>
            </IonLabel>
          </IonItem>
        </div>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={createOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

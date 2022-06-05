import { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, closeCircle } from "ionicons/icons";
import { BecasAdminList, BecaForm } from "../../components";
import { useFetchBecas } from "../../hooks";

export const AdminScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing] = useState(false);
  const [becas, loading] = useFetchBecas();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Administrador</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsVisible(!isVisible)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={isVisible}>
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{isEditing ? "Editar" : "Añadir"} Beca</IonTitle>
                <IonButton
                  color="danger"
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                  slot="end"
                  style={{ marginRight: "3%" }}
                >
                  <IonIcon icon={closeCircle} />
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <BecaForm loading={loading} />
          </IonContent>
        </IonModal>

        <BecasAdminList data={becas?.data} loading={loading} />
      </IonContent>
    </IonPage>
  );
};

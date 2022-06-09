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
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import { add, closeCircle } from "ionicons/icons";
import { BecasList, BecaForm } from "../../components";
import { saveBeca } from "../../environments/api";
import { useFetchBecas } from "../../hooks";

export const BecasScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [_loading, setFormLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [becas, loading, updater] = useFetchBecas();

  const onRefresh = ({ detail: { complete } }) => {
    updater();
    setTimeout(() => {
      complete();
    }, 500);
  };

  const _handleSubmit = async (values) => {
    setFormLoading(true);
    await saveBeca(values);
    setIsVisible(false);
    setShowToast(true);
    setFormLoading(false);
    updater();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Becas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setIsVisible(!isVisible)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={isVisible}>
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Añadir Beca</IonTitle>
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
            <BecaForm loading={loading} onSubmit={_handleSubmit} />
          </IonContent>
        </IonModal>

        <BecasList data={becas?.data} loading={_loading} />

        <IonToast
          color="success"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(!showToast)}
          message="La beca se añadió correctamente. Espera por su confirmación para que se muestre en la lista de becas actuales"
          duration={4000}
        />
      </IonContent>
    </IonPage>
  );
};

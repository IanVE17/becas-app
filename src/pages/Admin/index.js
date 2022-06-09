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
import { BecasAdminList, BecaForm } from "../../components";
import { saveBeca, updateBeca, deleteBeca } from "../../environments/api";
import { useFetchBecas } from "../../hooks";

export const AdminScreen = () => {
  const [beca, setBeca] = useState({});
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [_loading, setFormLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [becas, loading, updater] = useFetchBecas(true);

  const generalCallBack = async (
    fn,
    data = undefined,
    msg = "",
    loadingHandler
  ) => {
    loadingHandler(true);
    await fn(data);
    loadingHandler(false);
    setIsVisible(false);
    setMessage(msg);
    setShowToast(true);
    updater();
    setBeca({});
    if (isEditing) {
      setIsEditing(false);
    }
  };

  const _handleSubmit = (values) => {
    if (values?.id && isEditing) {
      generalCallBack(updateBeca, values, "Beca actualizada", setFormLoading);
    } else {
      generalCallBack(saveBeca, values, "Beca guardada", setFormLoading);
    }
  };

  const _handleDelete = () => {
    setIsDeleting(true);
    if (beca?.id) {
      generalCallBack(deleteBeca, beca.id, "Beca eliminada", setIsDeleting);
    }
    setIsDeleting(false);
  };

  const onRefresh = ({ detail: { complete } }) => {
    updater();
    setTimeout(() => {
      complete();
    }, 500);
  };

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
                <IonTitle>{isEditing ? "Editar" : "Añadir"} Beca</IonTitle>
                <IonButton
                  color="danger"
                  onClick={() => {
                    setIsVisible(!isVisible);
                    setTimeout(() => {
                      if (isEditing) {
                        setIsEditing(false);
                        setBeca({});
                      }
                    }, 500);
                  }}
                  slot="end"
                  style={{ marginRight: "3%" }}
                >
                  <IonIcon icon={closeCircle} />
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <BecaForm
              oBeca={beca}
              onSubmit={_handleSubmit}
              onDelete={_handleDelete}
              loading={_loading}
              isAdmin={true}
              isEditing={isEditing}
              isDeleting={isDeleting}
            />
          </IonContent>
        </IonModal>

        <BecasAdminList
          data={becas?.data}
          loading={loading}
          setBeca={setBeca}
          setIsVisible={setIsVisible}
          setIsEditing={setIsEditing}
        />

        <IonToast
          color="success"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(!showToast)}
          message={message}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

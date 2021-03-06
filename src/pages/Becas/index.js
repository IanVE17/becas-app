import { useState, useEffect } from "react";
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
import { useFetchBecas } from "../../hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { oAuth, saveBeca, getUser, updateUser } from "../../environments/api";

export const BecasScreen = () => {
  // * Becas
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [_loading, setFormLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [becas, loading, updater] = useFetchBecas();

  // * User info
  const [user] = useAuthState(oAuth);
  const [oUser, setUser] = useState({});

  const fetchUser = async (id) => {
    let docs = [];
    const aData = await getUser(id);
    aData.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    const { id: _id, favorites } = docs[0];
    setUser({ id: _id, favorites });
  };

  useEffect(() => {
    if (user) {
      fetchUser(user.uid);
    } else {
      setUser({});
    }
  }, [user]);

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
    setMessage(
      "La beca se añadió correctamente. Espera por su confirmación para que se muestre en la lista de becas actuales"
    );
    setShowToast(true);
    setFormLoading(false);
    updater();
  };

  const _handleFavorite = async (cardId) => {
    if (cardId) {
      let aTmp = [...oUser.favorites];
      if (aTmp.includes(cardId)) {
        aTmp.splice(aTmp.indexOf(cardId), 1);
        setMessage("Beca removida");
      } else {
        aTmp.push(cardId);
        setMessage("Beca guardada en favoritos");
      }
      await updateUser({ id: oUser.id, favorites: aTmp });
      setShowToast(true);
    }
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

        <BecasList
          data={becas?.data}
          loading={_loading}
          updater={updater}
          addFavorite={_handleFavorite}
        />

        <IonToast
          color="success"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(!showToast)}
          message={message}
          duration={4000}
        />
      </IonContent>
    </IonPage>
  );
};

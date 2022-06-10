import { useState, useEffect } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import { BecasList } from "../../components";
import { useFetchBecas } from "../../hooks";
import { useAuthState } from "react-firebase-hooks/auth";
import { oAuth, getUser, updateUser } from "../../environments/api";

export const FavoritesScreen = () => {
  // * Becas
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

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

  const [becas, loading, updater] = useFetchBecas(
    false,
    oUser.favorites?.length ? oUser.favorites : ["123"]
  );

  const onRefresh = ({ detail: { complete } }) => {
    updater();
    setTimeout(() => {
      complete();
    }, 500);
  };

  const _handleFavorite = async (cardId) => {
    if (cardId) {
      let aTmp = [...oUser.favorites];
      if (aTmp.includes(cardId)) {
        aTmp.splice(aTmp.indexOf(cardId), 1);
        setMessage("Beca removida");
      }
      await updateUser({ id: oUser.id, favorites: aTmp });
      setShowToast(true);
      setUser({ favorites: ["123"] });
      setTimeout(() => {
        updater();
      }, "1000");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={onRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <BecasList
          data={becas?.data}
          loading={loading}
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

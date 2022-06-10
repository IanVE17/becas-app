import { useEffect, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ProfileForm } from "../../components";
import { createOutline, closeCircle } from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { oAuth, getUser, updateUser } from "../../environments/api";

export const ProfileScreen = () => {
  const [user] = useAuthState(oAuth);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [oUser, setUser] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const fetchUser = async (id) => {
    setLoading(true);
    let docs = [];
    const aData = await getUser(id);
    aData.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    const {
      names,
      last_name,
      mother_name,
      email,
      type,
      id: _id,
      uid,
    } = docs[0];
    setUser({ names, last_name, mother_name, email, type, id: _id, uid });
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchUser(user.uid);
    } else {
      setUser({});
    }
  }, [user]);

  const _handleSubmit = async (values) => {
    setFormLoading(true);
    await updateUser(values);
    setFormLoading(false);
    setIsVisible(false);
    setTimeout(() => {
      fetchUser(values.uid);
    }, 1000);
  };

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
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <>
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon
                  icon={createOutline}
                  onClick={() => setIsVisible(!isVisible)}
                />
              </IonFabButton>
            </IonFab>

            <IonModal isOpen={isVisible}>
              <IonContent>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>Editar Usuario</IonTitle>
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
                <ProfileForm
                  user={oUser}
                  loading={formLoading}
                  onSubmit={_handleSubmit}
                />
              </IonContent>
            </IonModal>

            <div style={{ marginTop: "20%", padding: "5%" }}>
              <img
                src={require("../../assets/img/profile.jpg")}
                width="150px"
                height="150px"
                style={{ borderRadius: "50%" }}
              />
              <h1>{oUser.names}</h1>
              <br />
              <IonItem>
                <IonLabel>Nombre completo:</IonLabel>
                <p>{oUser.names}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Apellidos:</IonLabel>
                <p>{`${oUser.last_name} ${oUser.mother_name}`}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Tipo de Usuario:</IonLabel>
                <p>{oUser.type}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Email:</IonLabel>
                <p>{oUser.email}</p>
              </IonItem>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

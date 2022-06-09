import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
} from "@ionic/react";
import { create } from "ionicons/icons";
import PropTypes from "prop-types";

export const BecasAdminList = ({
  data = [],
  loading = Boolean,
  setBeca,
  setIsVisible,
  setIsEditing,
}) => {
  const handleBeca = (beca) => {
    setBeca(beca);
    setIsVisible(true);
  };

  return loading ? (
    <div className="container">
      <IonSpinner name="crescent" />
    </div>
  ) : data.length ? (
    <IonList>
      {data.map((oItem) => (
        <IonItem key={oItem.id} button="true">
          <IonLabel>
            <h2>{oItem.title}</h2>
            <a href={oItem.url} target="_blank" rel="noreferrer">
              <h3>Url: {oItem.url}</h3>
            </a>
          </IonLabel>
          <IonButton
            item={oItem}
            onClick={({ target: { item } }) => {
              handleBeca(item);
              setIsEditing(true);
            }}
          >
            <IonIcon icon={create}></IonIcon>
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  ) : (
    <div className="container">
      <p>No hay becas aun</p>
    </div>
  );
};

BecasAdminList.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  setBeca: PropTypes.func,
  setIsVisible: PropTypes.func,
  setIsEditing: PropTypes.func,
};

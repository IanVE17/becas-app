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

export const BecasAdminList = ({ data = [], loading = Boolean }) => {
  return loading ? (
    <div className="container">
      <IonSpinner name="crescent" />
    </div>
  ) : (
    <IonList>
      {data.length ? (
        data.map((oItem) => (
          <IonItem key={oItem.id} button="true">
            <IonLabel>
              <h2>{oItem.title}</h2>
              <a href={oItem.url} target="_blank" rel="noreferrer">
                <h3>Url: {oItem.url}</h3>
              </a>
            </IonLabel>
            <IonButton item={oItem.id}>
              <IonIcon icon={create}></IonIcon>
            </IonButton>
          </IonItem>
        ))
      ) : (
        <div className="container">
          <p>No hay becas aun</p>
        </div>
      )}
    </IonList>
  );
};

BecasAdminList.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

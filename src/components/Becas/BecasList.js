import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonRow,
  IonCol,
} from "@ionic/react";
import { bookmarkOutline, heartOutline } from "ionicons/icons";
import PropTypes from "prop-types";

export const BecasList = ({ data = [], loading = Boolean }) => {
  return loading ? (
    <div className="container">
      <IonSpinner name="crescent" />
    </div>
  ) : (
    <div>
      {data.length ? (
        data.map((oItem) => (
          <IonCard key={oItem.id} button={true}>
            <img src={require("../../assets/img/sample-banner.png")} />
            <IonCardHeader>
              <IonCardSubtitle>{oItem.url}</IonCardSubtitle>
              <IonCardTitle>{oItem.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              {oItem.description}
              <IonSegment
                style={{ marginTop: "3%" }}
                color="warning"
                value={null}
              >
                <IonSegmentButton>
                  <IonRow>
                    <IonCol>
                      <IonIcon icon={heartOutline} />
                    </IonCol>
                    <IonCol>
                      <p>{oItem.likes}</p>
                    </IonCol>
                  </IonRow>
                </IonSegmentButton>

                <IonSegmentButton>
                  <IonIcon icon={bookmarkOutline} />
                </IonSegmentButton>
              </IonSegment>
            </IonCardContent>
          </IonCard>
        ))
      ) : (
        <div className="container">
          <p>No hay becas aun</p>
        </div>
      )}
    </div>
  );
};

BecasList.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
};

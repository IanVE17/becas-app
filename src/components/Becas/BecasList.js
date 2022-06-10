import { useState } from "react";
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
import {
  bookmarkOutline,
  heart,
  heartOutline,
  heartDislike,
  heartDislikeOutline,
} from "ionicons/icons";
import PropTypes from "prop-types";
import { updateBeca } from "../../environments/api";
import { Browser } from "@capacitor/browser";

export const BecasList = ({
  data = [],
  loading = Boolean,
  updater,
  addFavorite,
}) => {
  const [disabledLike, setDisableLike] = useState(false);
  const [disabledDislike, setDisableDislike] = useState(false);

  const openCapacitorSite = async (url) => {
    await Browser.open({
      url:
        !url.includes("http") || !url.includes("https")
          ? `https://${url}`
          : url,
    });
  };

  return loading ? (
    <div className="container">
      <IonSpinner name="crescent" />
    </div>
  ) : (
    <div>
      {data.length ? (
        data.map((oItem) => (
          <IonCard
            key={oItem.id}
            button={true}
            style={{ marginBottom: "10%" }}
            oUrl={oItem.url}
            onClick={({ currentTarget: { oUrl } }) => {
              openCapacitorSite(oUrl);
            }}
          >
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
                <IonSegmentButton
                  disabled={disabledLike}
                  Item={{ id: oItem.id, likes: oItem.likes }}
                  onClick={async ({ target: { Item } }) => {
                    const { id, likes } = Item;
                    await updateBeca({ id, likes: likes + 1 });
                    updater();
                    setDisableLike(true);
                    setDisableDislike(true);
                  }}
                >
                  <IonRow>
                    <IonCol>
                      <IonIcon
                        icon={
                          disabledLike || disabledDislike ? heart : heartOutline
                        }
                      />
                    </IonCol>
                    <IonCol>
                      <p>{oItem.likes}</p>
                    </IonCol>
                  </IonRow>
                </IonSegmentButton>

                <IonSegmentButton
                  disabled={disabledDislike}
                  Item={{ id: oItem.id, dislikes: oItem.likes }}
                  onClick={async ({ target: { Item } }) => {
                    const { id, dislikes } = Item;
                    await updateBeca({ id, dislikes: dislikes + 1 });
                    updater();
                    setDisableLike(true);
                    setDisableDislike(true);
                  }}
                >
                  <IonRow>
                    <IonCol>
                      <IonIcon
                        icon={
                          disabledLike || disabledDislike
                            ? heartDislike
                            : heartDislikeOutline
                        }
                      />
                    </IonCol>
                    <IonCol>
                      <p>{oItem.dislikes}</p>
                    </IonCol>
                  </IonRow>
                </IonSegmentButton>

                <IonSegmentButton
                  oItemId={oItem.id}
                  onClick={({ target: { oItemId } }) => {
                    addFavorite(oItemId);
                  }}
                >
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
  updater: PropTypes.func,
  addFavorite: PropTypes.func,
};

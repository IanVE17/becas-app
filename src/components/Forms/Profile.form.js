import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSpinner,
} from "@ionic/react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";

const initialState = {
  names: "",
  last_name: "",
  mother_name: "",
};

const validationSchema = yup.object().shape({
  names: yup.string().required("El nombre es requerido"),
  last_name: yup.string().required("El apellido paterno es requerido"),
  mother_name: yup.string().required("El apellido materno es requerido"),
});

export const ProfileForm = ({ user = {}, onSubmit, loading }) => {
  return (
    <div style={{ padding: "10%" }}>
      <Formik
        initialValues={Object.keys(user).length ? user : initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <IonItem>
              <IonLabel>Nombres</IonLabel>
              <IonInput
                name="names"
                onIonChange={handleChange}
                value={values?.names}
                clearInput
                required
              />
            </IonItem>
            <p className="error">{touched.names && errors.names}</p>

            <IonItem>
              <IonLabel>Apellido Paterno</IonLabel>
              <IonInput
                required
                name="last_name"
                onIonChange={handleChange}
                value={values?.last_name}
                clearInput
              />
            </IonItem>
            <p className="error">{touched.last_name && errors.last_name}</p>

            <IonItem>
              <IonLabel>Apellido materno</IonLabel>
              <IonInput
                required
                name="mother_name"
                onIonChange={handleChange}
                value={values?.mother_name}
                clearInput
              />
            </IonItem>
            <p className="error">{touched.mother_name && errors.mother_name}</p>

            <IonRow style={{ marginTop: "5%" }}>
              <IonButton onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  "Guardar información"
                )}
              </IonButton>
            </IonRow>
          </>
        )}
      </Formik>
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

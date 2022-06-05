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
  title: "",
  description: "",
  url: "",
};

const regex =
  "[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El titulo es requerido")
    .min(20, "El titulo debe tener al menos 20 caracteres"),
  description: yup
    .string()
    .required("La descripcion es requerida")
    .min(20, "La descripcion debe tener al menos 20 caracteres"),
  url: yup.string().matches(regex, "La url no es valida"),
});

export const BecaForm = ({ onSubmit, loading }) => {
  return (
    <div style={{ padding: "10%" }}>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <IonItem>
              <IonLabel>Titulo</IonLabel>
              <IonInput
                name="title"
                onIonChange={handleChange}
                value={values?.title}
                clearInput
                required
              />
            </IonItem>
            <p className="error">{touched.title && errors.title}</p>
            <IonItem>
              <IonLabel>Descripción</IonLabel>
              <IonInput
                required
                name="description"
                onIonChange={handleChange}
                value={values?.description}
                clearInput
              />
            </IonItem>
            <p className="error">{touched.description && errors.description}</p>
            <IonItem>
              <IonLabel>Url</IonLabel>
              <IonInput
                name="url"
                onIonChange={handleChange}
                value={values?.url}
                clearInput
              />
            </IonItem>
            <p className="error">{touched.url && errors.url}</p>

            <IonRow style={{ marginTop: "5%" }}>
              <IonButton onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? <IonSpinner name="crescent" /> : "Guardar Beca"}
              </IonButton>
            </IonRow>
          </>
        )}
      </Formik>
    </div>
  );
};

BecaForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTextarea,
} from "@ionic/react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";

const initialState = {
  title: "",
  description: "",
  url: "",
  likes: 0,
  status: 0,
};

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("El titulo es requerido")
    .min(10, "El titulo debe tener al menos 10 caracteres"),
  description: yup
    .string()
    .required("La descripcion es requerida")
    .min(10, "La descripcion debe tener al menos 10 caracteres"),
  url: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "La url no es valida"
    ),
  status: yup.number(),
});

export const BecaForm = ({
  oBeca = {},
  onSubmit,
  onDelete,
  loading,
  isAdmin = false,
  isEditing = false,
  isDeleting = false,
}) => {
  return (
    <div style={{ padding: "10%" }}>
      <Formik
        initialValues={
          isEditing && Object.keys(oBeca).length ? oBeca : initialState
        }
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
              <IonTextarea
                autoGrow
                required
                name="description"
                onIonChange={handleChange}
                value={values?.description}
                rows={5}
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

            {isAdmin ? (
              <IonItem>
                <IonLabel>Estatus</IonLabel>
                <IonSelect
                  value={values?.status}
                  name="status"
                  interface="popover"
                  placeholder="Selecciona el estatus de la beca"
                  onIonChange={handleChange}
                >
                  <IonSelectOption value={1}>Activo</IonSelectOption>
                  <IonSelectOption value={0}>Inactivo</IonSelectOption>
                </IonSelect>
              </IonItem>
            ) : null}

            <IonRow style={{ marginTop: "5%" }}>
              <IonButton onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? <IonSpinner name="crescent" /> : "Guardar Beca"}
              </IonButton>
            </IonRow>
            {isEditing ? (
              <IonRow style={{ marginTop: "5%" }}>
                <IonButton
                  color="danger"
                  onClick={onDelete}
                  style={{ width: "100%" }}
                >
                  {isDeleting ? (
                    <IonSpinner name="crescent" />
                  ) : (
                    "Eliminar Beca"
                  )}
                </IonButton>
              </IonRow>
            ) : null}
          </>
        )}
      </Formik>
    </div>
  );
};

BecaForm.propTypes = {
  oBeca: PropTypes.object,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  loading: PropTypes.bool,
  isAdmin: PropTypes.bool,
  isEditing: PropTypes.bool,
  isDeleting: PropTypes.bool,
};

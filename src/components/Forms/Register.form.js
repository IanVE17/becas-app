import { IonButton, IonInput, IonItem, IonRow, IonSpinner } from "@ionic/react";

import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";

const initialState = {
  names: "",
  last_name: "",
  mother_name: "",
  email: "",
  password: "",
  rpassword: "",
};

const validationSchema = yup.object().shape({
  names: yup.string().required("El nombre es requerido"),
  last_name: yup.string().required("El apellido paterno es requerido"),
  mother_name: yup.string().required("El apellido materno es requerido"),
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  rpassword: yup
    .string()
    .required("La confirmación de la contraseña es requerida")
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir"),
});

export const RegisterForm = ({ onSubmit, loading }) => {
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
              <IonInput
                name="names"
                onIonChange={handleChange}
                value={values?.names}
                clearInput
                required
                placeholder="Nombres"
              />
            </IonItem>
            <p className="error">{touched.names && errors.names}</p>

            <IonItem>
              <IonInput
                required
                name="last_name"
                onIonChange={handleChange}
                value={values?.last_name}
                clearInput
                placeholder="Apellido Paterno"
              />
            </IonItem>
            <p className="error">{touched.last_name && errors.last_name}</p>

            <IonItem>
              <IonInput
                required
                name="mother_name"
                onIonChange={handleChange}
                value={values?.mother_name}
                clearInput
                placeholder="Apellido Materno"
              />
            </IonItem>
            <p className="error">{touched.mother_name && errors.mother_name}</p>

            <IonItem>
              <IonInput
                required
                name="email"
                onIonChange={handleChange}
                value={values?.email}
                clearInput
                placeholder="Email"
                type="email"
              />
            </IonItem>
            <p className="error">{touched.email && errors.email}</p>

            <IonItem>
              <IonInput
                required
                name="password"
                onIonChange={handleChange}
                value={values?.password}
                clearInput
                placeholder="Contraseña"
                type="password"
              />
            </IonItem>
            <p className="error">{touched.password && errors.password}</p>

            <IonItem>
              <IonInput
                required
                name="rpassword"
                onIonChange={handleChange}
                value={values?.rpassword}
                clearInput
                placeholder="Confirmar contraseña"
                type="password"
              />
            </IonItem>
            <p className="error">{touched.rpassword && errors.rpassword}</p>

            <IonRow style={{ marginTop: "5%" }}>
              <IonButton onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? <IonSpinner name="crescent" /> : "CREAR CUENTA"}
              </IonButton>
            </IonRow>
          </>
        )}
      </Formik>
    </div>
  );
};

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

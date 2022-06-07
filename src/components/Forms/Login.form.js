import { IonButton, IonInput, IonItem, IonRow, IonSpinner } from "@ionic/react";

import PropTypes from "prop-types";
import { Formik } from "formik";
import * as yup from "yup";

const initialState = {
  email: "",
  password: "",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

export const LoginForm = ({ onSubmit, loading }) => {
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
                name="email"
                onIonChange={handleChange}
                value={values?.email}
                clearInput
                required
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

            <IonRow style={{ marginTop: "5%" }}>
              <IonButton onClick={handleSubmit} style={{ width: "100%" }}>
                {loading ? <IonSpinner name="crescent" /> : "INICIAR SESIÓN"}
              </IonButton>
            </IonRow>
          </>
        )}
      </Formik>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
};

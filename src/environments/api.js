import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  documentId,
  addDoc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "./firebaseConfig";

const collectionName = "becas";

export const oAuth = auth;

const removeId = (obj) => {
  const tmp = { ...obj };
  delete tmp.id;
  return tmp;
};

// * Calls for login / register

export const login = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

export const register = async ({
  names,
  last_name,
  mother_name,
  email,
  password,
  rpassword,
}) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "users"), {
      id: user.uid,
      names,
      last_name,
      mother_name,
      email,
      password,
      rpassword,
      favorites: [],
      type: "admin",
      authProvider: "local",
    });
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};

// * Calls for users

export const getUser = (uid) =>
  getDocs(query(collection(db, "users"), where("uid", "==", uid)));

export const updateUser = (user) =>
  updateDoc(doc(db, "users", user.id), removeId(user));

// * Calls for becas

export const getAllBecas = () => getDocs(collection(db, collectionName));

export const getPublishedBecas = () =>
  getDocs(query(collection(db, collectionName), where("status", "==", 1)));

export const getFavoriteBecas = (ids) =>
  getDocs(
    query(collection(db, collectionName), where(documentId(), "in", ids))
  );

export const saveBeca = (beca) => addDoc(collection(db, collectionName), beca);

export const updateBeca = (beca) =>
  updateDoc(doc(db, collectionName, beca.id), removeId(beca));

export const deleteBeca = (id) => deleteDoc(doc(db, collectionName, id));

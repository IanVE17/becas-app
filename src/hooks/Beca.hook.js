// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import {
  getAllBecas,
  getPublishedBecas,
  getFavoriteBecas,
} from "../environments/api";

export const useFetchBecas = (getAll = false, aFavs = []) => {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const fetchBecas = async () => {
    setLoading(true);
    let aData;
    if (getAll) {
      aData = await getAllBecas();
    } else {
      if (aFavs.length) {
        aData = await getFavoriteBecas(aFavs);
      } else {
        aData = await getPublishedBecas();
      }
    }
    let docs = [];
    aData.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    setData({ data: docs.length ? docs : [] });

    setLoading(false);
  };

  useEffect(() => {
    fetchBecas();
  }, []);

  const update = () => fetchBecas();

  return [data, loading, update];
};

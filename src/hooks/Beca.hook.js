// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { getBecas } from "../environments/api";

export const useFetchBecas = () => {
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const fetchBecas = async () => {
    setLoading(true);
    let aData = await getBecas();
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

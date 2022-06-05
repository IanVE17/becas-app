// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";

const becasJSON =
  '[{"id":"75162ab6-cb6c-45e6-ad65-347c237fa116","url":"google.com","likes":9,"title":"aute","description":"minim nostrud minim laboris"},{"id":"4e9fb0f9-7d04-4c61-af7a-3fe629b58f9a","url":"random.org","likes":9,"title":"aliquip","description":"excepteur eu laborum tempor"},{"id":"1f106de2-cabc-4d55-b13b-688128a55f66","url":"random.org","likes":9,"title":"est","description":"cupidatat id laborum nisi"},{"id":"41edcb8e-a06e-42b6-a66f-1e3cd1e9a9fc","url":"random.org","likes":0,"title":"dolore","description":"sint eu ipsum sint"},{"id":"077bc27d-6146-42c8-a60a-30baddb6a4f7","url":"yahoo.com","likes":0,"title":"enim","description":"adipisicing ex quis esse"},{"id":"d1c7b80f-711a-4e37-aadb-03f5f59810cc","url":"yahoo.com","likes":0,"title":"deserunt","description":"culpa commodo in nulla"},{"id":"28afacb9-1df4-4597-a310-021de47f45c1","url":"test.com","likes":0,"title":"pariatur","description":"voluptate est cillum laboris"},{"id":"44fa658c-f1c2-43cc-8eb4-2ce0594cd77a","url":"google.com","likes":8,"title":"eu","description":"culpa eiusmod magna voluptate"},{"id":"b9d9d55d-1796-4d69-a33d-2a169b1efbf9","url":"random.org","likes":7,"title":"cupidatat","description":"incididunt consequat labore ad"},{"id":"5b0d0913-83f5-46ef-8a4b-db5d3559c954","url":"yahoo.com","likes":0,"title":"nulla","description":"esse exercitation est duis"}]';

export const useFetchBecas = () => {
  const [data, setData] = useState({ data: [...JSON.parse(becasJSON)] });
  const [loading, setLoading] = useState(false);

  const fetchBecas = async () => {
    setLoading(true);
    // *TODO: Implementar la llamada a la API (firebase)
    // ! let aData = await getBecas();
    let docs = [];
    // ! aData.forEach((doc) => {
    //   docs.push({ ...doc.data(), id: doc.id });
    // });

    if (docs.length) {
      setData(docs);
    }
    setLoading(false);
  };

  // ! useEffect(() => {
  //   fetchBecas();
  // }, []);

  const update = () => fetchBecas();

  return [data, loading, update];
};

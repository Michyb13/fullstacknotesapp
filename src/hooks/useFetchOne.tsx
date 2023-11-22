import { useState, useEffect } from "react";
import axios from "axios";
import { NoteProps } from "./useFetch";

const useFetchOne = (url: string, token: string) => {
  const [data, setData] = useState<NoteProps>(Object);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchOne();
  }, [url, token]);
  return { data, error };
};

export default useFetchOne;

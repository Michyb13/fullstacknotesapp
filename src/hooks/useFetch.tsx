import axios from "axios";
import { useState, useEffect } from "react";

export type NoteProps = {
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

const useFetch = (url: string, token: string) => {
  const [data, setData] = useState<NoteProps[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, [url, token]);

  return { data, error };
};

export default useFetch;

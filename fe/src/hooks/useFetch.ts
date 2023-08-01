import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(
  initialData: T,
  fetchFn: () => Promise<AxiosResponse<T>>
) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchFn();

        if (res.status === 200) {
          setData(res.data);
          return;
        }

        throw Error("데이터를 불러올 수 없었습니다.");
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, [fetchFn]);

  return data;
}
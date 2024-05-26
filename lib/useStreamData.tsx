import { useEffect, useState } from "react";

import IStreamItem from "../components/home/IStreamItem";

export default function useStreamData(): [IStreamItem | null, () => void] {
  const [streamData, setStreamData] = useState<IStreamItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/fetchStreamData");
      const data = await response.json();
      setStreamData(data);
    };

    fetchData();
  }, []);

  const resetStreamData = () => setStreamData(null);

  return [streamData, resetStreamData];
}

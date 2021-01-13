import React, { useState, useEffect } from "react";

function fetchData(apiKey) {
  const [data, setData] = useState();
  const fetchData = async () => {
    const response = await fetch(apiKey.string());
    if (response.ok) {
      const data = await response.json();
      setData(data);
    } else alert("HTTP-Error: " + response.status);
  };

  useEffect(() => {
    fetchData();
  }, []);
}

export default fetchData;

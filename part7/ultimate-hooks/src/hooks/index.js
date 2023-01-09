import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const fetch = async (url) => {
    const response = await axios.get(url);
    setResources(response.data);
    console.log(resources);
  };

  useEffect(() => {
    fetch(baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const create = async (resource) => {
    await axios.post(baseUrl, resource);
    setResources([...resources, { ...resource, id: resources.length + 1 }]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

export { useField, useResource };

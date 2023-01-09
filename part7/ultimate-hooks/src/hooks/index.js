import { useState, useEffect } from "react";

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

  // ...

  const create = (resource) => {
    // ...
  };

  const service = {
    create,
  };

  return [resources, service];
};

export { useField, useResource };

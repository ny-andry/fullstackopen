import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [contries, setContries] = useState([]);
  const [newText, setText] = useState("");

  // Fetching data from the server
  useEffect(() => {
    const eventHandler = (response) => {
      setContries(response.data);
      console.log(response.data);
    };
    const promise = axios.get("https://restcountries.com/v3.1/all");
    promise.then(eventHandler);
  }, []);

  // Constant to filter contries
  const countriesDisplay =
    newText === ""
      ? contries
      : contries.filter((country) =>
          country.name.common.toLowerCase().includes(newText.toLowerCase())
        );

  // Event handler
  const handleText = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <Filter handle={handleText} />
      <Countries data={countriesDisplay} />
    </div>
  );
};

export default App;

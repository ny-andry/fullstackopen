import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  // Hard-coded dummy data
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setText] = useState("");

  // Fetching data from the server
  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);

  // Person to display if-else
  const personDisplay =
    newText === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newText.toLowerCase())
        );

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleText = (event) => {
    setText(event.target.value);
  };

  // Add a new person
  const addPerson = (event) => {
    event.preventDefault();
    // Alert if-else
    if (persons.some((object) => object.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      // Concatenate new entry to persons
      setPersons(persons.concat(newPerson));
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handle={handleText} />

      <h2>Add a new person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons data={personDisplay} />
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import service from "./services/service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setText] = useState("");

  useEffect(() => {
    service.getAll().then((initialPersons) => setPersons(initialPersons));
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
        // id: persons.length + 1,
      };
      service
        .create(newPerson)
        .then((newPerson) => setPersons(persons.concat(newPerson)));
    }
  };

  // Erase a person
  const erasePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      service
        .erase(person.id)
        .then(() => setPersons(persons.filter((x) => x.id !== person.id)));
    } else {
      console.log(`it's working`);
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
      {personDisplay.map((x) => (
        <Persons key={x.id} data={x} handle={erasePerson} />
      ))}
    </div>
  );
};

export default App;

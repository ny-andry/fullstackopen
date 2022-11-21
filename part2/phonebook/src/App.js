import { useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  
  // Hard-coded dummy data
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setText] = useState("");

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
      // Concatenate new entry to perrsons
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

import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import service from "./services/service";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newText, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [colour, setColour] = useState(true);

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
    // Tests whether at least one element in the array passes the test implemented by the provided function
    const existAlready = persons.some((object) => object.name === newName);
    // Message if-else
    if (existAlready) {
      const changedNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (changedNumber === true) {
        // Constant existing person
        const existingPerson = persons.find(
          (object) => object.name === newName
        );
        const newPerson = { ...existingPerson, number: newNumber };
        service
          .update(existingPerson.id, newPerson)
          .then((response) => {
            setColour(true);
            setMessage(`${existingPerson.name}'s number has been changed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.map((x) => (x.id !== existingPerson.id ? x : response))
            );
          })
          .catch(() => {
            setColour(false);
            setMessage(`${existingPerson.name} was already removed`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1,
      };
      service
        .create(newPerson)
        .then((newPerson) => setPersons(persons.concat(newPerson)))
        .finally(() => {
          setColour(true);
          setMessage(`${newPerson.name} has been added`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
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
      <Notification message={message} bool={colour} />
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

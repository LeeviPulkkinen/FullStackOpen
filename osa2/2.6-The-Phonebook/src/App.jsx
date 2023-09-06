import { useState } from "react";

const Filter = ({ handleSearchNameChange }) => {
  return (
    <>
      <p>Filter shown with</p>
      <input type="text" onChange={handleSearchNameChange} />
    </>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ visible_persons }) => {
  return (
    <>
      {visible_persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

const App = () => {
  const addPerson = (e) => {
    e.preventDefault();

    if (
      persons.some((person) => {
        return person.name === newName;
      })
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const new_person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(new_person));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const visible_persons =
    searchName !== ""
      ? persons.filter((person) => {
          return person.name.toLowerCase().includes(searchName.toLowerCase());
        })
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchNameChange={handleSearchNameChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons visible_persons={visible_persons} />
    </div>
  );
};

export default App;

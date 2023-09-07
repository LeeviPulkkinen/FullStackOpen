import { useState, useEffect } from "react";
import numbersService from "./services/numbers";

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

const Persons = ({ visible_persons, handleDelete }) => {
  return (
    <>
      {visible_persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person)}>delete</button>
          </p>
        );
      })}
    </>
  );
};

const Notification = ({ text }) => {
  if (!text) return;

  const style = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };

  return <div style={style}>{text}</div>;
};

const Error = ({ text }) => {
  if (!text) return;

  const style = {
    backgroundcolor: "grey",
    color: "red",
    fontStyle: "italic",
    fontSize: 16,
  };

  return <div style={style}>{text}</div>;
};

const App = () => {
  useEffect(() => {
    numbersService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(() => {
        alert("failed");
      });
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const existing_person = persons.find((person) => {
      return person.name === newName;
    });

    if (existing_person) {
      if (
        !window.confirm(
          `${existing_person.name} is already added to the phonebook, replace the old number with a new one?`
        )
      )
        return;

      const updated_person = {
        ...existing_person,
        number: newNumber,
      };

      numbersService
        .update(existing_person.id, updated_person)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== existing_person.id ? person : updated_person
            )
          );

          setNotificationText(`Number for ${updated_person.name} updated!`);
          setTimeout(() => {
            setNotificationText("");
          }, 3000);
        })
        .catch(() => {
          setErrorText(`Person ${updated_person.name} not found`);
          setTimeout(() => {
            setErrorText("");
          }, 3000);
        });
    } else {
      const new_person = {
        name: newName,
        number: newNumber,
      };

      numbersService.create(new_person).then((person) => {
        setPersons(persons.concat(person));

        setNotificationText(`Added ${person.name}`);
        setTimeout(() => {
          setNotificationText("");
        }, 3000);
      });
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (person) => {
    if (!persons.some((per) => per.id === person.id)) return;

    if (!window.confirm(`Delete ${person.name}?`)) return;

    numbersService
      .remove(person.id)
      .then((resp) => {
        setPersons(persons.filter((per) => per.id !== person.id));
      })
      .catch(() => {
        setErrorText(`Person ${person.name} not found`);
          setTimeout(() => {
            setErrorText("");
          }, 3000);
      });
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

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notificationText, setNotificationText] = useState("");
  const [errorText, setErrorText] = useState("");

  const visible_persons =
    searchName !== ""
      ? persons.filter((person) => {
          return person.name.toLowerCase().includes(searchName.toLowerCase());
        })
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification text={notificationText} />
      <Error text={errorText} />

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
      <Persons visible_persons={visible_persons} handleDelete={deletePerson} />
    </div>
  );
};

export default App;

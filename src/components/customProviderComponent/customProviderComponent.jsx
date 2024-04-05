import { createContext, useContext, useState } from 'react';
import { nanoid } from 'nanoid';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState("");
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('store');
    return savedContacts ? JSON.parse(savedContacts) : [];
  });
  const [filter, setFilter] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
    
  const settingId = () => {
      const uniqueId = nanoid();

      setId(uniqueId);
    };

  const settingName = evt => {
     const { value } = evt.target;
      settingId();
      setName(value.trim());
      
      
    
  };

  const settingNumber = evt => {
     const { value } = evt.target;
     setNumber(value.trim());
    };

  const settingContacts = (myValue) => {
    setContacts([...myValue]);
  };
    

    
    
  const handleButtonPress = evt => {
       evt.target.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
       setTimeout(() => {
         evt.target.style.boxShadow = 'none';
       }, 200);
      
      

         const isNameDuplicate = contacts.some(contact => contact.name === name);
       if (isNameDuplicate) {
         alert('This name already exists');

         return;
       }

       if (
         id !== '' &&
         name !== '' &&
         number !== '' &&
         id !== null &&
         name !== null &&
         number !== null &&
         id !== undefined &&
         name !== undefined &&
         number !== undefined
       ) {
           
           //contacts.push({ id, name, number });
           setContacts([...contacts, { id, name, number }]);
           
         
         return;
       } else {
         alert('Enter all Feilds');
         return;
       }
    };
    
    const handleSubmit = evt => {
      evt.preventDefault();
      evt.target.reset();
        setName('');
        setNumber('');
        setId('');
        console.log(contacts);
    };

   const handleSearch = evt => {

      const { value } = evt.target;

      setFilter(value.trim());

       const bestMatches = contacts.filter(
        contact =>
          contact.name.toLowerCase().includes(value.trim().toLowerCase()) &&
          value.trim() !== ''
      );

      setFilteredArray(bestMatches);
    };

    const handleDelete = evt => {
      
      const { name } = evt.target;

        const myIndex = contacts.findIndex(contact => contact.name === name);

      console.log(myIndex);

      contacts.splice(myIndex, 1);

      setContacts([...contacts]);
      console.log(contacts);
    };
    
  
    
    
  return (
    <UserContext.Provider
      value={{
        name,
        number,
        contacts,
        filter,
        settingId,
        settingName,
        settingNumber,
        handleButtonPress,
        settingContacts,
        handleSubmit,
        handleSearch,
        handleDelete,
        setContacts,
        filteredArray
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

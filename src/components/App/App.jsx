/*export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      React homework template
    </div>
  );
};*/

import { useUser } from '../customProviderComponent/customProviderComponent';
import { useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';



export const App = () => {

const { settingContacts, contacts } = useUser();

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (savedContacts) {
      settingContacts(parsedContacts);
    }
  });

   useEffect(() => {
     localStorage.setItem('contacts', JSON.stringify(contacts));
   }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <ContactForm>
        <ContactList>
          <Filter/>
        </ContactList>
      </ContactForm>
    </div>
  );
};
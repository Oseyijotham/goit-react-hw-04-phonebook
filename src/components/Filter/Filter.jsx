import { useUser } from '../customProviderComponent/customProviderComponent';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import PropTypes from 'prop-types';


export const Filter = () => {
  const searchTermId = nanoid();
  const { filteredArray, filter, handleSearch } = useUser();

  return (
    <div className={css.contactList}>
      <label htmlFor={searchTermId}>
        <span className={css.formLabel}>Find Contacts By Name</span>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          value={filter}
          onChange={handleSearch}
          id={searchTermId}
          autoComplete="off"
          className={css.formInput}
        />
      </label>

      {filter !== '' && (
        <ul className={css.contactsList}>
          {filteredArray.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Filter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  shouldRender: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

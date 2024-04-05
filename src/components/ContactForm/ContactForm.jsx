import { useUser } from '../customProviderComponent/customProviderComponent';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';


export const ContactForm = ({children}) => {

 const contactNameId = nanoid();
 const contactNumberId = nanoid();
  
  const {
    name,
    number,
    settingName,
    settingNumber,
    handleButtonPress,
    handleSubmit
  } = useUser();
  

  return (
    <div className={css.phoneBook}>
      <h2 className={css.formTitle}>Phonebook</h2>
      <form onSubmit={handleSubmit} className={css.formSection}>
        <label htmlFor={contactNameId}>
          <span className={css.formLabel}>Name</span>
          <input
            type="text"
            placeholder="Enter Name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={settingName}
            id={contactNameId}
            autoComplete="off"
            className={css.formInput}
          />
        </label>
        <label>
          <span className={css.formLabel}>Number</span>
          <input
            type="tel"
            placeholder="Enter Number"
            autoComplete="off"
            name="number"
            value={number}
            required
            onChange={settingNumber}
            className={css.formInput}
            id={contactNumberId}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </label>
        <div className={css.buttonArea}>
          <button
            type="submit"
            name="button"
            onClick={handleButtonPress}
            className={css.button}
          >
            Add Contact
          </button>
        </div>
      </form>
      {children}
    </div>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onNumberChange: PropTypes.func.isRequired,
  onCompletion: PropTypes.func.isRequired,
  children: PropTypes.node,
  onButtonPress: PropTypes.func.isRequired,
};

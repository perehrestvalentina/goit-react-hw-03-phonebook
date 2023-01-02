import React, { Component } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import css from './App.module.css';

const CONTACT_LOCAL_KEY = 'contact';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsList = localStorage.getItem(CONTACT_LOCAL_KEY);
    const parsContacts = JSON.parse(contactsList);

    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem(CONTACT_LOCAL_KEY, JSON.stringify(newContacts));
    }
  }

  addNewContact = (name, number) => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts`);
    }
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };
  handleInputChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getNormaliseContacts = () => {
    const { filter, contacts } = this.state;
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const filterName = this.getNormaliseContacts();

    return (
      <div>
        <h1 className={css.title}> Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />
        <h2 className={css.title}>Contacts</h2>

        {contacts.length !== 0 ? (
          <Filter value={filter} onChange={this.handleInputChange} />
        ) : (
          <p className={css.title}>{'The list is empty '}</p>
        )}
        <ContactList
          contacts={filterName}
          onDeleteInputContact={this.deleteContact}
        />
      </div>
    );
  }
}

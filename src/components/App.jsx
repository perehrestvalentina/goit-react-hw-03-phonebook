import React, { Component } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import css from './App.module.css';

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

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleInputChange = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getNormaliseContacts = () => {
    const normalisedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filterName = this.getNormaliseContacts();

    return (
      <div>
        <h1 className={css.title}> Phonebook</h1>
        <ContactForm onSubmit={this.addNewContact} />
        <h2 className={css.title}>Contacts</h2>

        <Filter value={filter} onChange={this.handleInputChange} />
        <ContactList
          contacts={filterName}
          onDeleteInputContact={this.deleteContact}
        />
      </div>
    );
  }
}

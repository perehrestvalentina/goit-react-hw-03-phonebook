import React, { Component } from 'react';
import shortid from 'shortid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    showModal: false,
  };

  componentDidMount() {
    const contactsList = localStorage.getItem('contacts');
    const parsContacts = JSON.parse(contactsList);
    if (parsContacts) {
      this.setState({ contacts: parsContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
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

    this.toggleModal();
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
    const { filter, contacts } = this.state;
    const normalisedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { filter, contacts, showModal } = this.state;
    const filterName = this.getNormaliseContacts();

    return (
      <div>
        <h1 className={css.title}> Phonebook</h1>

        <button
         type="button"
         onClick={this.toggleModal}
         className={css.buttonModal}>
          Open PhoneBook
         </button>

         {showModal && (
          <Modal
           onClose = {this.toggleModal}>
            <h2 className={css.title}> Phonebook: </h2>
            <Form  onSubmit={this.addNewContact}/>
            Close
            </button>
            <p>
               Please, enter name and number user</p>
            
         )};
         </Modal>
         )};

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

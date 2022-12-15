import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Container, MainHeader, SubHeader } from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

export class App extends React.Component {
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
    const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));

    if (contactsFromStorage) {
      this.setState({ contacts: contactsFromStorage });

      if (contactsFromStorage.length === 0) {
        Notiflix.Notify.info('No contacts in your list yet', notifySettings);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddBtnClick = FormData => {
    const { name, number } = FormData;

    const includesName = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (includesName) {
      return Notiflix.Notify.warning(
        `${name} is already in contacts`,
        notifySettings
      );
    } else {
      let contact = { id: nanoid(), name: name, number: number };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
      Notiflix.Notify.success(
        `${name} was successfully added to your contacts`,
        notifySettings
      );
    }
  };

  onDeleteBtnClick = (id, name) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    Notiflix.Notify.info(
      `${name} was successfully deleted from your contacts`,
      notifySettings
    );
  };

  onFilterChange = event => {
    this.setState({ filter: event.target.value });

    const query = this.state.filter.toLocaleLowerCase();

    const itemByQuery = this.state.contacts.find(contact =>
      contact.name.toLocaleLowerCase().includes(query)
    );

    if (!itemByQuery) {
      Notiflix.Notify.warning(
        'No contacts matching your request',
        notifySettings
      );
    }
  };

  filterContacts = () => {
    const query = this.state.filter.toLocaleLowerCase();

    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(query)
    );

    return filteredContacts;
  };

  render() {
    return (
      <Container>
        <MainHeader>Phonebook</MainHeader>
        <ContactForm onAddBtnClick={this.onAddBtnClick} />
        <SubHeader>Contacts</SubHeader>
        <Filter value={this.state.filter} onChange={this.onFilterChange} />
        <ContactList
          contacts={this.filterContacts()}
          onDeleteBtnClick={this.onDeleteBtnClick}
        />
      </Container>
    );
  }
}

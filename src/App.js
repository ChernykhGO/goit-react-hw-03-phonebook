import React from 'react';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

class App extends React.Component {
    state = {
        contacts: [
            // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        // name: "",
        // number: "",
        filter: '',
    };
    componentDidUpdate(prevProps, prevState) {
        // console.log('this DidUpdate');
        // console.log(prevState);
        // console.log(this.state); вызывать при проверке условия
        if (this.state.contacts !== prevState.contacts) {
            // console.log('Обновились contacts');
            localStorage.setItem(
                'contacts',
                JSON.stringify(this.state.contacts),
            );
        }
    }

    componentDidMount() {
        // console.log('this DidMount');
        // const contacts = localStorage.getItem('contacts');
        // console.log(contacts);
        const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
        console.log(parsedContacts);
        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
        // setTimeout(() => {
        // this.setState({ contacts: parsedContacts });
        // }, 2000);
    }

    formSubmit = data => {
        // console.log(data.name);
        // console.log(this.state.contacts);

        let obj = this.state.contacts.find(
            o => o.name.toLowerCase() === data.name.toLowerCase(),
        );

        if (!obj) {
            const newContact = {
                id: uuidv4(),
                name: data.name,
                number: data.number,
            };
            this.setState(prevState => ({
                contacts: [newContact, ...prevState.contacts],
            }));
        } else {
            alert(`${data.name} is already in contact`);
        }

        // this.setState((prevState) => ({
        //   contacts: [newContact, ...prevState.contacts],
        // }));
    };

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(
                contact => contact.id !== contactId,
            ),
        }));
    };

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    };

    getVisibleContacts = () => {
        const { filter, contacts } = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    render() {
        // console.log('render app');
        const { filter } = this.state;
        const visibleContacts = this.getVisibleContacts();
        return (
            <div>
                <div className="App">
                    <h1>Phonebook</h1>
                    <ContactForm onSubmit={this.formSubmit} />

                    <h2>Contacts</h2>

                    <Filter value={filter} onChange={this.changeFilter} />
                    <ContactList
                        contacts={visibleContacts}
                        ondeleteContact={this.deleteContact}
                    />
                </div>
            </div>
        );
    }
}

export default App;

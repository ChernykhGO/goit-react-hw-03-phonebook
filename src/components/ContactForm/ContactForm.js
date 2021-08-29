import React from 'react';
import PropTypes from 'prop-types';

class ContactForm extends React.Component {
    state = {
        contacts: [],
        name: '',
        number: '',
    };

    handleChange = event => {
        // console.log(event.currentTarget);
        // console.log(event.currentTarget.name);
        // console.log(event.currentTarget.value);
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    handleAddContact = event => {
        event.preventDefault();
        // console.log(this.state);
        this.props.onSubmit(this.state);
        this.reset();
    };
    reset = () => {
        this.setState({ name: '', number: '' });
    };
    render() {
        return (
            <form onSubmit={this.handleAddContact}>
                <label>
                    Name
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        placeholder="Name Surname"
                    />
                </label>
                <label>
                    Number
                    <input
                        type="tel"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                        placeholder="111-11-11"
                    />
                </label>
                <button type="submit">Add contact</button>
            </form>
        );
    }
}

export default ContactForm;

ContactForm.propTypes = {
    contacts: PropTypes.array,
    name: PropTypes.string,
    number: PropTypes.number,
    handleAddContact: PropTypes.func,
    handleChange: PropTypes.func,
};

// handleNameChange = event => {
//     // console.log(event.currentTarget.value);
//     this.setState({name: event.currentTarget.value})
// };

// handleNumberChange = event => {
//     // console.log(event.currentTarget.value);
//     this.setState({number: event.currentTarget.value})
// };

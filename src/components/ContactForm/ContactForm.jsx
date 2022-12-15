import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MdPersonAddAlt1 } from 'react-icons/md';
import { Form, Label } from './ContactForm.styled';
import { Btn } from '../Btn/Btn';
import { InputItem } from './InputItem';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAddBtnClick(this.state);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          Name
          <InputItem
            onChange={this.onInputChange}
            value={this.state.name}
            name="name"
            placeholder="Enter contact`s name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </Label>
        <Label>
          Number
          <InputItem
            onChange={this.onInputChange}
            value={this.state.number}
            type="tel"
            name="number"
            placeholder="Enter contact`s number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </Label>
        <Btn
          type="submit"
          icon={MdPersonAddAlt1}
          status="add"
          text="Add contact"
        />
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onAddBtnClick: PropTypes.func.isRequired,
};

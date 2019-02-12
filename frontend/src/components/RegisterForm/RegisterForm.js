import React from 'react';
import Button from './../formElements/Button';
import Input from './../formElements/Input';
import {StyledCard} from './../Card/Card';
import ElementLabel from '../formElements/ControlLabel';

export class RegisterForm extends React.Component {
    state = {
        name: '',
        email: '',
        emailCheck: '',
        password: '',
        passwordCheck: '',
    };

    form = React.createRef();

    handleChange (event) {
        const { type, name, value, checked} = event.target;
        switch (type) {
            case 'checkbox':
            this.setState({
                [name]: checked
            })
            break;
            case 'text':
            case 'email':
            case 'password':
            case 'textarea':
            this.setState({
                [name]: value
            })
            break;
            default:
            break;            
        }
    }

    handleSubmit () {
        this.form.current.reportValidity();
        console.log(this.form.current.elements);
        console.log('goweno');
    }

    validateControl() {
        return (event) => {
            const { type, name, value, checked} = event.target;
            return {

            }
        }
    }

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

    render () {
        return (
            <StyledCard width="90%" margin="20px auto" title="Register">
            <form ref={this.form} onSubmit={e => e.preventDefault()}>
            <ElementLabel name="Name">
                    <Input type="text" name="name" required onChange={this.handleChange} value={this.state.name} placeholder='Name...' />
                </ElementLabel>
                <ElementLabel name="Email">
                    <Input type="email" name="email" required onChange={this.handleChange} value={this.state.email} placeholder='Email...' />
                </ElementLabel>
                <ElementLabel name="Repeat Email">
                    <Input type="email" name="emailCheck" required onChange={this.handleChange} value={this.state.emailCheck} placeholder='Repet Email...' />
                </ElementLabel>
                <ElementLabel name="Password">
                    <Input type="password" name="password" required pattern=".{5,10}" onChange={this.handleChange} value={this.state.password} placeholder='Password...' />
                </ElementLabel>
                <ElementLabel name="Repeat password">
                    <Input type="password" name="passwordCheck" required pattern=".{5,10}" onChange={this.handleChange} value={this.state.passwordCheck} placeholder='Repeat password...' />
                </ElementLabel>
                <Button  type="button" onClick={this.handleSubmit}>Register</Button>
                </form>
            </StyledCard>
            
                   
        );

    }
}
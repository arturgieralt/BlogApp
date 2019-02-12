import React from 'react';
import Button from './../formElements/Button';
import Input from './../formElements/Input';
import TextArea from '../formElements/TextArea';
import {StyledCard} from './../Card/Card';
import ElementLabel from '../formElements/ControlLabel';
export class ArticleEditor extends React.Component {
    state = {
        title: '',
        summary: '',
        content: '',
        tags: '',
        commentsAllowed: true,
        author: '5c51ed63aaa04a70f2531700'
    };

    handleChange (event) {
        const { type, name, value, checked} = event.target;
        switch (type) {
            case 'checkbox':
            this.setState({
                [name]: checked
            })
            break;
            case 'text':
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
        const {addArticle} = this.props;
        const tags = this.state.tags.split('#').splice(1);
        console.log(this.state);
        addArticle({...this.state, tags});
        console.log('goweno');
    }

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);

    render () {
        return (
            <StyledCard width="90%" margin="20px auto" title="Add article">
                <ElementLabel name="Title">
                    <Input type="text" name="title" onChange={this.handleChange} value={this.state.title} placeholder='Title...' />
                </ElementLabel>
                <ElementLabel name="Summary">
                    <TextArea name="summary" onChange={this.handleChange}>{this.state.summary}</TextArea>
                </ElementLabel>
                <ElementLabel name="Content">
                    <TextArea name="content" onChange={this.handleChange}>{this.state.content}</TextArea>
                </ElementLabel>
                <ElementLabel name="Tags">
                    <Input type="text" name="tags"  onChange={this.handleChange} value={this.state.tags.toString()} placeholder='Tags...' />
                </ElementLabel>
                <ElementLabel name="Allow comments">
                    <Input type="checkbox"  onChange={this.handleChange} name="commentsAllowed" checked={this.state.commentsAllowed} />
                </ElementLabel>
                <Button  type="button" onClick={this.handleSubmit}>Send</Button>
            </StyledCard>   
        );

    }
}
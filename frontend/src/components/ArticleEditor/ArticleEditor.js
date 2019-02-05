import React from 'react';

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
            <div>
                <input type="text" name="title" onChange={this.handleChange} value={this.state.title} />
                <textarea name="summary" onChange={this.handleChange}>{this.state.summary}</textarea>
                <textarea name="content" onChange={this.handleChange}>{this.state.content}</textarea>
                <input type="text" name="tags"  onChange={this.handleChange} value={this.state.tags.toString()} />
                <input type="checkbox"  onChange={this.handleChange} name="commentsAllowed" checked={this.state.commentsAllowed} />
                <button onClick={this.handleSubmit}>Send</button>
            </div>   
        );

    }
}
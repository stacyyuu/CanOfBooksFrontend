import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class AddABookForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("made it here");
        const newBook = {
            title: event.target.formName.value,
            description: event.target.formDescription.value,
            status: event.target.formStatus.value
        }
        console.log('New Book', newBook, ' added');
        this.props.handleCreateBook(newBook);
    }
    
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='formName'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Type Book Title Here..."/>
                    </Form.Group>

                    <Form.Group controlId='formDescription'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Description of the book..."/>
                    </Form.Group>

                    <Form.Group controlId='formStatus'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Write some of your feelings on the book..."/>
                    </Form.Group>

                    <Button type="submit">Index Book!</Button>

                </Form>
            </Container>
        )
    }
}

export default AddABookForm;
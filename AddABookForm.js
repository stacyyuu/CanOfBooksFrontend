import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';




class AddABookForm extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        const newBook = {
            title: event.target.formName.value,
            description: event.target.formDescription.value,
            status: event.target.formStatus.value
        }
        console.log('New Book', newBook, ' added');
        this.props.handleCreateCat(newBook);
    }
    
    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlID='formName'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Type Book Title Here..."></Form.Control>
                    </Form.Group>

                    <Form.Group controlID='formDescription'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Description of the book..."></Form.Control>
                    </Form.Group>

                    <Form.Group controlID='formStatus'>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder="Write some of your feelings on the book..."></Form.Control>
                    </Form.Group>

                    <Button type="submit">Create Cat!</Button>

                </Form>
            </Container>
        )
    }
}

export default AddABookForm;
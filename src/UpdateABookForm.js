import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class UpdateABookForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _id: this.props.selectedBook?._id, 
            // ?. optional chaining operator, checks to see if selectedBook exists before accessing title 
            title: this.props.selectedBook?.title,
            description: this.props.selectedBook?.description,
            status: this.props.selectedBook?.status
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('this.state: ', this.state);
        this.props.updateBook(this.state);
        this.props.handleOnHide();
    }


    handleTitleChange = (event) => this.setState({ title: event.target.value });
    handleDescriptionChange = (event) => this.setState({ description: event.target.value });
    handleStatusChange = (event) => this.setState({ status: event.target.value });


    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleOnHide} >
                <Modal.Header closeButton>
                    <Modal.Title>Update a Book!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder={this.state.title}
                            onChange={this.handleTitleChange}
                            value={this.state.title}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder={this.state.description}
                            onChange={this.handleDescriptionChange}
                            value={this.state.description}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                            type="text"
                            placeholder={this.state.status}
                            onChange={this.handleStatusChange}
                            value={this.state.status}
                            />
                        </Form.Group>

                        <Button type="submit">Submit</Button>
                    </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default UpdateABookForm;
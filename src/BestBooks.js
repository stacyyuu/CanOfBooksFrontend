import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import AddABookForm from './AddABookForm';
import Button from 'react-bootstrap/Button';

// import { carousel } from 'react-responsive-carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showNewBookForm: false,
      errorMessage: ''
    }
    console.log(this.state.books);
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    const config = {
      method: 'get', // get is the default
      baseURL: 'http://localhost:3001',
      url: '/books' // endpoint
    }
    const response = await axios(config);
    console.log('DATA: ', response.data);
    this.setState({ books: response.data });
  }

  handleCreateBook = async (bookToBeCreated) => {
    try {
      const config = {
        method: 'post',
        baseURL: 'http://localhost:3001',
        url: '/books',
        data: bookToBeCreated
      }
      const res = await axios(config);
      this.setState({ books: [...this.state.books, res.data] })
    } catch(error) {
      console.error('Error is in the App.js in the newBook Function:', error);
      this.setState({ errorMessage: `Status Code ${error.response.status}: ${error.response.data}`});
    }
  }
  
  handleDeleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`Do you wish to delete ${bookToBeDeleted.title}?`);
  
      if (proceed) {
        const config = {
          method: 'delete',
          baseURL: 'http://localhost:3001',
          url: `/books/${bookToBeDeleted._id}`
        }
  
        const res = await axios(config);
        console.log(res.data);
        const newBooksArr = this.state.books.filter(book => book._id !== bookToBeDeleted._id);
        this.setState({ books: newBooksArr });
      }
    } catch(error) {
      console.error('Error is in the App.js in the deleteBook Function: ', error);
      // axios sends more info about the error in a response object on the error
      this.setState({ errorMessage: `Status Code ${error.res.status}: ${error.res.data}`});
    }
  }

  showForm = () => this.setState({ showNewBookForm: true });

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>Neat Books</h2>

        <Button onClick={this.showForm}>Add a New Book!</Button>

      {this.state.showNewBookForm && 
        <AddABookForm 
          handleCreateBook={this.handleCreateBook}
        /> }

        <Carousel>
          {this.state.books.length !== 0 ? (this.state.books.map(book =>
          (

            <Carousel.Item key={book._id}>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>{book.status}</p>
                <Button onClick={() => this.handleDeleteBook(book)}>Delete this book!</Button>
              </Carousel.Caption>
            </Carousel.Item>

          )))
            :
            <h2>{this.state.errorMessage}</h2>
          }
        </Carousel>
      </>
    )
  }
}

export default BestBooks;

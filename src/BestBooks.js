import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

// import { carousel } from 'react-responsive-carousel';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
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

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>Neat Books</h2>

        <Carousel>
          {this.state.books.length !== 0 ? (this.state.books.map(book =>
          (

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>

          )))
            :
            (
              <h3> No Books Found :</h3>
            )
          }
        </Carousel>
      </>
    )
  }
}

export default BestBooks;

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
import AddABookForm from './AddABookForm';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        books: [],
        showNewBookForm: false,
        errorMessage: ''
      }
    }

    componentDidMount = async () => {
      const config = {
        method: 'get',
        baseURL: 'http://localhost:3001',
        url: '/books'
      }

      const res = await axios(config);
      console.log('Data: ', res.data);
      this.setState({books: res.data});
    }

    handleCreateBook = async (bookToBeCreated) => {
      try {
        const config = {
          method: 'post',
          baseUrl: 'http://localhost:3001',
          url: '/books',
          data: bookToBeCreated
        }
        const res = await axios(config);
        this.setState({ books: [...this.state.books, res.data] })
      } catch(error) {
        console.error('Error is in the App.js in the newBook Function:', error);
        this.setState({ errorMessage: `Status Code ${error.res.status}: ${error.res.data}`});
      }
    }

    handleDeleteBook = async (bookToBeDeleted) => {
      try {
        const proceed = window.confirm(`Do you wish to delete ${bookToBeDeleted.name}?`);
  
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
      return (
        <div className="App">
          <h1>New Book</h1>
  
          <Button onClick={this.showForm}>Add a New Book!</Button>
  
          {this.state.showNewBookForm && 
            <AddABookForm 
              handleCreateBook={this.handleCreateBook}
            /> }
  
          {!this.state.errorMessage ? this.state.books.map(book => (
            <div key={book._id}>
              <h2>{book.title}</h2>
              <p>This book's description is {book.description}</p>
              <p>This book's status is {book.status}</p>
              <Button onClick={() => this.handleDeleteBook(book)}>Delete this book!</Button>
            </div>
          ))
        :
          <h2>{this.state.errorMessage}</h2>
        }
  
  
        </div>
      );
    }




//   render() {
//     return (
//       <>
//         <Router>
//           <Header />
//           <Routes>
//             <Route 
//               exact path="/"
//               element={<BestBooks />}
//             >
//             </Route>
//             <Route
//               exact path ="/About"
//               element={<Profile />}
//               >
//             </Route>
//             {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
//           </Routes>
//           <Footer />
//         </Router>
//       </>
//     )
//   }
}

export default App;

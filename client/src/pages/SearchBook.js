import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import databaseAPI from "../utils/databaseAPI";
import googleBooksAPI from "../utils/googleBooksAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function SearchBook() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const [formObject, setFormObject] = useState({
    title: "",
    authors: [],
    description: "",
    image: "",
    link: "",
    id: ""
  })

  // Load all books and store them with setBooks
  /* {{{ **
  ** useEffect(() => {
  **   loadBooks()
  ** }, [])
  ** }}} */

  /* {{{ **
  ** // Loads all books and sets them to books
  ** function loadBooks() {
  **   databaseAPI.getBooks()
  **     .then(res => 
  **       setBooks(res.data)
  **     )
  **     .catch(err => console.log(err));
  ** };
  ** 
  ** // Delete book by id
  ** function deleteBook(id) {
  **   databaseAPI.deleteBook(id)
  **     .then(res => loadBooks())
  **     .catch(err => console.log(err));
  ** };
  ** }}} */

  // Save selected book
  function saveBook(id) {
    const bookIdx = books.reduce((acc, cur, idx) => {
      if (cur._id === id) {
        acc = idx;
      }
      return acc;
    }, -1);

    console.log(`∞° books[bookIdx=${bookIdx}]=\n`, books[bookIdx]);
    if ((bookIdx >= 0) && !(books[bookIdx].hasOwnProperty("saved"))) {
      const book = books[bookIdx];
      databaseAPI.saveBook(book)
        .then(() => {
          const updBooks = books;
          updBooks[bookIdx].saved = true;
          setBooks(updBooks);
        })
        /* {{{ **
        ** .then(() => loadBooks())
        ** }}} */
        .catch(err => console.log(err));
    }
  };

  function viewBook(id) {
    const link = books.reduce((acc, cur) => {
      if (cur._id === id) {
        acc = cur.link;
      }
      return acc;
    }, "");
    if (link) {
      window.open(link)
    }
  };

  // Handles updating component state
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use databaseAPI.saveBoook method
  // then refresh books list from database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title) {
      googleBooksAPI.search(formObject.title)
        .then(res => {
          setBooks(res.data)
        })
        .then(() => setFormObject({
          title: "",
          authors: [],
          description: "",
          image: "",
          link: ""
        }))
        /* {{{ **
        ** .then(() => loadBooks())
        ** }}} */
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h3>(React) Google Books Search</h3>
            <h4>Search for and save books of interest</h4>
          </Jumbotron>
          <form>
            {/* inputs should be updated to be controlled inputs */}
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
            />
            <FormBtn
              disabled={!(formObject.title)}
              onClick={handleFormSubmit}
            >
              Search for Book
            </FormBtn>
          </form>
        </Col>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Results List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => {
                return (
                  <ListItem key={book._id}>
                    <Row>
                      <Col size="md-10 sm-12">
                        <strong>
                        {book.title} by
                        </strong>
                        <List>
                        {book.authors.map((author, index) => {
                          return (
                            <ListItem key={`${author}=${index}`}>{author}</ListItem>
                          );
                        })}
                        </List>
                      </Col>
                      <Col size="md-2 sm-12">
                        <SaveBtn
                          disabled={book.hasOwnProperty("saved")}
                          onClick={() => saveBook(book._id)}
                        />
                        <ViewBtn onClick={() => viewBook(book._id)} />
                      </Col>
                    </Row>
                    <Row>
                      <Col size="md-3 sm-12">
                      <img alt="Book" src={book.image} className="img-fluid" />
                      </Col>
                      <Col size="md-9 sm-12">
                      {book.description}
                      </Col>
                    </Row>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBook;

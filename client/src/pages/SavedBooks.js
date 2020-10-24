import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import databaseAPI from "../utils/databaseAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function SavedBooks() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  /* {{{ **
  ** // update the initial state to provide values for
  ** // the controls in the form (use empty strings)
  ** const [formObject, setFormObject] = useState({
  **   title: "",
  **   authors: [],
  **   description: "",
  **   image: "",
  **   link: ""
  ** })
  ** }}} */

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    databaseAPI.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Delete book by id
  function deleteBook(id) {
    databaseAPI.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  };

  function viewBook() {
    // add code here to remove a book using databaseAPI
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h3>(React) Google Books Search</h3>
            <h4>Search for and save books of interest</h4>
          </Jumbotron>
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
                        {book.authors.map(author => {
                          return (
                            <ListItem>author</ListItem>
                          );
                        })}
                        </List>
                      </Col>
                      <Col size="md-2 sm-12">
                        <DeleteBtn onClick={() => deleteBook(book._id)} />
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

export default SavedBooks;

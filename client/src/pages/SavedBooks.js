import React, { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import ViewBtn from "../components/ViewBtn";
import databaseAPI from "../utils/databaseAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

  // update the initial state to provide values for
  // the controls in the form (use empty strings)
  const [formObject, setFormObject] = useState({
    title: "",
    authors: [],
    description: "",
    image: "",
    link: ""
  })

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
        <Col size="md-6">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h2>Search for and save books of interest</h2>
          </Jumbotron>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>Results List</h1>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => {
                return (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn onClick={() => deleteBook(book._id)} />
                    <ViewBtn onClick={() => viewBook(book._id)} />
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

export default Books;

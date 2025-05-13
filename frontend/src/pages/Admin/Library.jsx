import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  Content,
  Title,
  AddBookForm,
  FormGroup,
  Label,
  Input,
  Button,
  BookList,
  BookItem,
  BookTitle,
  BookAuthor,
  ActionButton,
} from '../../styles/LibraryStyles';

const Library = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/library/getall');
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    const addBook = async (book) => {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/library', {
          bookname: book.title,
          author: book.author,
        });
        setBooks([...books, response.data]);
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };
  
    const handleBookPick = async (bookId, studentId) => {
      // Implement logic to record when a student picks a book
    };
  
    const handleBookReturn = async (bookId, studentId) => {
      // Implement logic to mark when a student returns a book
    };
    return (
        <LibraryContainer>
            <Sidebar />
            <Content>
                <Title>Library Management</Title>
                <AddBookForm
                onSubmit={(e) => {
                    e.preventDefault();
                    const book = {
                      id: Math.random().toString(36).substr(2, 9),
                      title: e.target.title.value,
                      author: e.target.author.value,
                    };
                    addBook(book);
                    e.target.reset();
                  }}
                >
                    <h2>Mượn sách</h2>
                    <FormGroup>
                        <Label htmlFor='title'>Tên sách</Label>
                        <Input type='text' id='title'/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor='author'>Tác giả</Label>
                        <Input type='text' id='author'/>
                    </FormGroup>
                    <Button type='submit'>Add Book</Button>
                </AddBookForm>

                <h2>Books</h2>
                <BookList>
                {books.map((book) => (
            <BookItem key={book._id}>
              <BookTitle>{book.bookname}</BookTitle>
              <BookAuthor>by {book.author}</BookAuthor>
              <ActionButton onClick={() => handleBookPick(book._id, 'student123')}>Mượn</ActionButton>
              <ActionButton onClick={() => handleBookReturn(book._id, 'student123')}>Trả</ActionButton>
            </BookItem>
          ))}
                </BookList>
            </Content>

        </LibraryContainer>
    )
};

export default Library
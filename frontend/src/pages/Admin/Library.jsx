import React, { useState, useEffect } from "react";
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
  ActionButtonXoa, // ✅ thêm nút xoá
} from '../../styles/LibraryStyles';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
  fetchBooks();
}, []);

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/v1/library/getall');
    console.log("📚 Danh sách sách:", response.data.books); // ✅ log toàn bộ sách
    setBooks(response.data.books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};


  const addBook = async (book) => {
    try {
      await axios.post('http://localhost:4000/api/v1/library', {
        bookname: book.title,
        author: book.author,
      });
      fetchBooks(); // cập nhật lại sau khi thêm
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // ✅ Hàm xoá sách
  const deleteBook = async (bookId) => {
  console.log("🛠 Đang xoá bookId:", bookId); // 👉 Log ID ra để kiểm tra

  if (window.confirm("Bạn có chắc muốn xoá sách này không?")) {
    try {
      await axios.delete(`http://localhost:4000/api/v1/library/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error("Lỗi xoá sách:", error);
    }
  }
};


  return (
    <LibraryContainer>
      <Sidebar />
      <Content>
        <Title>Quản lý Thư viện</Title>

        <AddBookForm
          onSubmit={(e) => {
            e.preventDefault();
            const book = {
              title: e.target.title.value,
              author: e.target.author.value,
            };
            addBook(book);
            e.target.reset();
          }}
        >
          <h3>Thêm sách mới</h3>
          <FormGroup>
            <Label htmlFor="title">Tên sách</Label>
            <Input type="text" id="title" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="author">Tác giả</Label>
            <Input type="text" id="author" />
          </FormGroup>
          <Button type="submit">Thêm sách</Button>
        </AddBookForm>

        <h3>Danh sách sách hiện có</h3>
        <BookList>
          {books.map((book) => (
            <BookItem key={book._id}>
              <BookTitle>{book.bookname}</BookTitle>
              <BookAuthor>Tác giả: {book.author}</BookAuthor>

              {/* ✅ Danh sách mượn sách */}
              {book.borrowRecords?.length > 0 ? (
                <div style={{ marginTop: "10px" }}>
                  <strong>Lượt mượn:</strong>
                  <ul style={{ paddingLeft: "20px" }}>
                    {book.borrowRecords.map((record, idx) => (
                      <li key={idx}>
                        {record.studentId?.fullName || "Không rõ học sinh"} –{" "}
                        <em>{record.status}</em> (
                        {new Date(record.borrowDate).toLocaleDateString()}
                        {record.returnDate ? ` → ${new Date(record.returnDate).toLocaleDateString()}` : ""}
                        )
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p style={{ fontStyle: "italic", color: "#888" }}>Chưa có lượt mượn nào.</p>
              )}

              {/* ✅ Nút xoá */}
              <ActionButtonXoa onClick={() => deleteBook(book._id)}>🗑 Xoá sách</ActionButtonXoa>
            </BookItem>
          ))}
        </BookList>
      </Content>
    </LibraryContainer>
  );
};

export default Library;

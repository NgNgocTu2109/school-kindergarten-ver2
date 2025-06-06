import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  LibraryContainer,
  SidebarContainer,
  Content,
  LibraryHeader,
  BookList,
  BookItem,
  BookTitle,
  BorrowButton,
} from '../../styles/LibraryStyles';

const LibrarySection = () => {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("studentToken");

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(res.data.books || []);
    } catch (err) {
      console.error('Lỗi lấy danh sách sách:', err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/library/history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Lỗi lấy lịch sử mượn:', err);
    }
  };

  const handleBorrowOrReturn = async (book) => {
    const borrowed = book.borrowRecords?.find(
      (record) => record.status === 'Đang mượn' && record.studentId === book.myId
    );

    try {
      if (!borrowed) {
        await axios.post(`http://localhost:4000/api/v1/library/borrow`, {
          bookId: book._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("📚 Mượn sách thành công!");
      } else {
        await axios.put(`http://localhost:4000/api/v1/library/return`, {
          bookId: book._id
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Trả sách thành công!");
      }

      fetchBooks();
      fetchHistory();
    } catch (err) {
      console.error("Lỗi mượn/trả sách:", err);
    }
  };

  const isBorrowedByStudent = (book) => {
    return book.borrowRecords?.some(
      (record) => record.status === 'Đang mượn' && record.studentId === book.myId
    );
  };

  useEffect(() => {
    if (token) {
      fetchBooks();
      fetchHistory();
    }
  }, [token]);

  return (
    <LibraryContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <LibraryHeader>
          <span role="img" aria-label="book">📚</span> Mượn sách của bé
        </LibraryHeader>

        {/* Danh sách sách */}
        <h3 style={{ fontSize: "20px", color: "#2c3e50", margin: "20px 0 10px" }}>📘 Danh sách sách</h3>
        <BookList>
          {books.map((book) => {
            const isBorrowed = isBorrowedByStudent(book);
            return (
              <BookItem key={book._id}>
                <BookTitle>{book.bookname}</BookTitle>
                <p style={{ color: "#444", margin: "4px 0" }}>Tác giả: {book.author}</p>
                <BorrowButton onClick={() => handleBorrowOrReturn(book)}>
                  {isBorrowed ? "Trả sách" : "Mượn"}
                </BorrowButton>
              </BookItem>
            );
          })}
        </BookList>

        {/* Lịch sử mượn */}
        <h3 style={{ fontSize: "20px", color: "#2c3e50", marginTop: "40px" }}>📂 Lịch sử mượn sách</h3>
        {history.length > 0 ? (
          <ul style={{ lineHeight: "1.8", paddingLeft: "20px" }}>
            {history.map((item, idx) => (
              <li key={idx}>
                <strong>{item.bookname}</strong> – {item.status} (
                {new Date(item.borrowDate).toLocaleDateString()}
                {item.returnDate ? ` → ${new Date(item.returnDate).toLocaleDateString()}` : ""}
                )
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#777" }}>Chưa có lịch sử mượn sách.</p>
        )}
      </Content>
    </LibraryContainer>
  );
};

export default LibrarySection;

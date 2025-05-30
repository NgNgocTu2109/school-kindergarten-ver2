import React, { useState, useEffect } from 'react';
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
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/children');
      setStudents(res.data.children || []);
    } catch (err) {
      console.error('Lỗi lấy học sinh:', err);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/library/getall');
      setBooks(res.data.books || []);
    } catch (err) {
      console.error('Lỗi lấy danh sách sách:', err);
    }
  };

  const fetchHistory = async (studentId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/library/history/${studentId}`);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error('Lỗi lấy lịch sử mượn:', err);
    }
  };

  const handleBorrowOrReturn = async (book) => {
    const borrowed = book.borrowRecords?.find(
      (record) =>
        record.studentId?._id === selectedStudent._id && record.status === 'Đang mượn'
    );

    try {
      if (!borrowed) {
        await axios.post(`http://localhost:4000/api/v1/library/borrow`, {
          bookId: book._id,
          studentId: selectedStudent._id,
        });
        alert("📚 Mượn sách thành công!");
      } else {
        await axios.put(`http://localhost:4000/api/v1/library/return`, {
          bookId: book._id,
          studentId: selectedStudent._id,
        });
        alert("Trả sách thành công!");
      }

      fetchBooks();
      fetchHistory(selectedStudent._id);
    } catch (err) {
      console.error("Lỗi mượn/trả sách:", err);
    }
  };

  const isBorrowedByStudent = (book) => {
    return book.borrowRecords?.some(
      (record) =>
        record.studentId?._id === selectedStudent._id && record.status === 'Đang mượn'
    );
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchBooks();
      fetchHistory(selectedStudent._id);
    }
  }, [selectedStudent]);

  return (
    <LibraryContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <LibraryHeader>
          <span role="img" aria-label="book">📚</span> Mượn sách cho học sinh
        </LibraryHeader>

        <select
          onChange={(e) => {
            const selected = students.find(child => child._id === e.target.value);
            setSelectedStudent(selected);
          }}
          style={{ padding: "10px 14px", width: "300px", borderRadius: "8px", fontSize: "16px", marginBottom: "30px" }}
        >
          <option value="">-- Chọn học sinh --</option>
          {students.map((child) => (
            <option key={child._id} value={child._id}>{child.fullName}</option>
          ))}
        </select>

        {/* Danh sách sách */}
        {selectedStudent && (
          <>
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
          </>
        )}
      </Content>
    </LibraryContainer>
  );
};

export default LibrarySection;

import { Book } from "../models/librarySchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

// ✅ Tạo sách mới
export const createBook = async (req, res, next) => {
  const { bookname, author } = req.body;
  try {
    if (!bookname || !author) {
      return handleValidationError("Please fill all fields", 400);
    }

    await Book.create({ bookname, author });
    res.status(200).json({
      success: true,
      message: "A new book is created!",
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy tất cả sách
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate("borrowRecords.studentId", "fullName");
    res.status(200).json({
      success: true,
      books,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Mượn sách
export const borrowBook = async (req, res, next) => {
  const { bookId, studentId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return handleValidationError("Không tìm thấy sách!", 404);

    // Kiểm tra nếu học sinh đang mượn sách này chưa trả
    const alreadyBorrowed = book.borrowRecords.find(
      (record) => record.studentId.toString() === studentId && record.status === "Đang mượn"
    );
    if (alreadyBorrowed) {
      return handleValidationError("Học sinh này đang mượn cuốn sách này!", 400);
    }

    // Thêm bản ghi mượn mới
    book.borrowRecords.push({ studentId });
    await book.save();

    res.status(200).json({ success: true, message: "Mượn sách thành công!" });
  } catch (err) {
    next(err);
  }
};

// ✅ Trả sách
export const returnBook = async (req, res, next) => {
  const { bookId, studentId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book) return handleValidationError("Không tìm thấy sách!", 404);

    // Tìm bản ghi mượn chưa trả
    const record = book.borrowRecords.find(
      (r) => r.studentId.toString() === studentId && r.status === "Đang mượn"
    );

    if (!record) {
      return handleValidationError("Không tìm thấy bản ghi đang mượn!", 400);
    }

    record.status = "Đã trả";
    record.returnDate = new Date();
    await book.save();

    res.status(200).json({ success: true, message: "Trả sách thành công!" });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy lịch sử mượn của 1 học sinh
export const getBorrowHistory = async (req, res, next) => {
  const { studentId } = req.params;
  try {
    const books = await Book.find({ "borrowRecords.studentId": studentId }).populate(
      "borrowRecords.studentId",
      "fullName"
    );

    const history = [];

    books.forEach((book) => {
      book.borrowRecords.forEach((record) => {
        if (record.studentId && record.studentId._id.toString() === studentId) {
          history.push({
            bookId: book._id,
            bookname: book.bookname,
            author: book.author,
            borrowDate: record.borrowDate,
            returnDate: record.returnDate,
            status: record.status,
          });
        }
      });
    });

    res.status(200).json({ success: true, history });
  } catch (err) {
    next(err);
  }
};

// ✅ Xoá sách theo ID
export const deleteBook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return handleValidationError("Không tìm thấy sách để xoá!", 404);
    }

    res.status(200).json({
      success: true,
      message: "Đã xoá sách thành công!",
    });
  } catch (err) {
    next(err);
  }
};


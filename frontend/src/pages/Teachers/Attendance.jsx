// ... các import giữ nguyên
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  AttendanceContainer,
  Content,
  AttendanceContent,
  AttendanceHeader,
  AttendanceForm,
  AttendanceSelect,
  AttendanceButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "../../styles/AttendanceStyles";

const Attendance = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(() =>
    localStorage.getItem("selectedClass") || ""
  );
  const [date, setDate] = useState(() =>
    localStorage.getItem("selectedDate") || new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { childId: { status, ..., image: File } }

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/class/getall");
      setClasses(res.data.classes);
    } catch (err) {
      console.error("Lỗi lấy lớp:", err);
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/children?classId=${classId}`);
      const fetchedStudents = res.data.children;

      // Nếu học sinh mới, set mặc định là "Có mặt"
      const newAttendance = {};
      fetchedStudents.forEach((child) => {
        newAttendance[child._id] = attendance[child._id] || {
          status: "Có mặt", // ✅ mặc định
          note: "",
          comment: "",
          eat: "",
          sleep: "",
          image: null
        };
      });

      setStudents(fetchedStudents);
      setAttendance(newAttendance);
    } catch (err) {
      console.error("Lỗi lấy học sinh:", err);
    }
  };

  const fetchExistingAttendance = async (classId, date) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/attendance?classId=${classId}&date=${date}`);
      const mapped = {};
      res.data.attendance.forEach(item => {
        mapped[item.childId._id] = {
          status: item.status || "Có mặt",
          note: item.note || "",
          comment: item.comment || "",
          eat: item.eat || "",
          sleep: item.sleep || "",
          image: null,
        };
      });
      setAttendance(mapped);
    } catch (err) {
      console.error("Lỗi lấy điểm danh:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClass && date) {
        await fetchStudents(selectedClass);
        await fetchExistingAttendance(selectedClass, date);
      }
    };
    fetchData();
  }, [selectedClass, date]);

  const handleChange = (childId, field, value) => {
    setAttendance(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        [field]: value,
      },
    }));
  };

  const handleChangeFile = (childId, file) => {
    setAttendance(prev => ({
      ...prev,
      [childId]: {
        ...prev[childId],
        image: file,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const requests = Object.entries(attendance).map(async ([childId, data]) => {
        const formData = new FormData();
        formData.append("childId", childId);
        formData.append("classId", selectedClass);
        formData.append("date", date);
        formData.append("status", data.status || "Có mặt");
        formData.append("note", data.note || "");
        formData.append("comment", data.comment || "");
        formData.append("eat", data.eat || "");
        formData.append("sleep", data.sleep || "");
        if (data.image) {
          formData.append("image", data.image);
        }

        return axios.post("http://localhost:4000/api/v1/attendance", formData);
      });

      await Promise.all(requests);
      alert("✅ Đã lưu điểm danh và nhật ký!");
    } catch (err) {
      console.error("❌ Lỗi lưu điểm danh:", err);
    }
  };

  return (
    <AttendanceContainer>
      <Sidebar />
      <Content>
        <AttendanceContent>
          <AttendanceHeader>Điểm danh & Nhật ký bé</AttendanceHeader>

          <AttendanceForm>
            <AttendanceSelect value={selectedClass} onChange={(e) => {
              setSelectedClass(e.target.value);
              localStorage.setItem("selectedClass", e.target.value);
            }}>
              <option value="">-- Chọn lớp --</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.grade}</option>
              ))}
            </AttendanceSelect>

            <AttendanceSelect value={date} onChange={(e) => {
              setDate(e.target.value);
              localStorage.setItem("selectedDate", e.target.value);
            }}>
              <option value={date}>{date}</option>
            </AttendanceSelect>

            <AttendanceButton onClick={handleSubmit}>Lưu điểm danh</AttendanceButton>
          </AttendanceForm>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ăn</TableCell>
                <TableCell>Ngủ</TableCell>
                <TableCell>Nhận xét</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Ảnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((child, index) => (
                <TableRow key={child._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{child.fullName}</TableCell>
                  <TableCell>
                    <AttendanceSelect
                      value={attendance[child._id]?.status || "Có mặt"}
                      onChange={(e) => handleChange(child._id, "status", e.target.value)}
                    >
                      <option value="Có mặt">Có mặt</option>
                      <option value="Vắng">Vắng</option>
                      <option value="Có phép">Có phép</option>
                    </AttendanceSelect>
                  </TableCell>
                  <TableCell>
                    <AttendanceSelect
                      value={attendance[child._id]?.eat || ""}
                      onChange={(e) => handleChange(child._id, "eat", e.target.value)}
                    >
                      <option value="">--</option>
                      <option value="Ăn hết">Ăn hết</option>
                      <option value="Ăn ít">Ăn ít</option>
                      <option value="Không ăn">Không ăn</option>
                    </AttendanceSelect>
                  </TableCell>
                  <TableCell>
                    <AttendanceSelect
                      value={attendance[child._id]?.sleep || ""}
                      onChange={(e) => handleChange(child._id, "sleep", e.target.value)}
                    >
                      <option value="">--</option>
                      <option value="Ngủ ngon">Ngủ ngon</option>
                      <option value="Ngủ ít">Ngủ ít</option>
                      <option value="Không ngủ">Không ngủ</option>
                    </AttendanceSelect>
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={attendance[child._id]?.comment || ""}
                      onChange={(e) => handleChange(child._id, "comment", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="text"
                      value={attendance[child._id]?.note || ""}
                      onChange={(e) => handleChange(child._id, "note", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleChangeFile(child._id, e.target.files[0])}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AttendanceContent>
      </Content>
    </AttendanceContainer>
  );
};

export default Attendance;

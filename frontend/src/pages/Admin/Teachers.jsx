import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import {
  TeachersContainer,
  Content,
  TeachersContent,
  TeachersHeader,
  TeacherList,
  TeacherCard,
  AddTeacherForm,
  AddTeacherInput,
  AddTeacherButton,
  ButtonEdit,
  ButtonDelete,
  ButtonSave,
  AddTeacherRow,
  FileInput,
  Avatar
} from '../../styles/TeachersStyles';

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({
    fullName: '',
    email: '',
    subject: '',
    status: 'Đang làm việc',
    startDate: '',
    endDate: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [editAvatarFile, setEditAvatarFile] = useState(null);

  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    fullName: '',
    email: '',
    subject: '',
    status: 'Đang làm việc',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Lỗi lấy danh sách giáo viên:', error);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const { fullName, email, subject, status, startDate, endDate } = newTeacher;
    if (fullName.trim() && email.trim() && subject.trim() && startDate) {
      try {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("subject", subject);
        formData.append("status", status);
        formData.append("startDate", startDate);
        if (status === "Đã thôi việc") {
          formData.append("endDate", endDate);
        }
        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        await axios.post('http://localhost:4000/api/v1/teachers', formData);
        fetchTeachers();
        setNewTeacher({
          fullName: '',
          email: '',
          subject: '',
          status: 'Đang làm việc',
          startDate: '',
          endDate: ''
        });
        setAvatarFile(null);
      } catch (error) {
        console.error('Lỗi thêm giáo viên:', error);
      }
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa giáo viên này không?")) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/teachers/${id}`);
        fetchTeachers();
      } catch (error) {
        console.error('Lỗi xóa giáo viên:', error);
      }
    }
  };

  const handleEditClick = (teacher) => {
    setEditingId(teacher._id);
    setEditData({
      fullName: teacher.fullName,
      email: teacher.email,
      subject: teacher.subject,
      status: teacher.status || "Đang làm việc",
      startDate: teacher.startDate ? teacher.startDate.slice(0, 10) : '',
      endDate: teacher.endDate ? teacher.endDate.slice(0, 10) : ''
    });
    setEditAvatarFile(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

const handleSaveEdit = async () => {
  try {
    const { fullName, email, subject, status, startDate, endDate } = editData;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("status", status);
    formData.append("startDate", startDate);
    if (status === "Đã thôi việc") {
      formData.append("endDate", endDate);
    }
    if (editAvatarFile) {
      formData.append("avatar", editAvatarFile);
    }

    await axios.put(`http://localhost:4000/api/v1/teachers/${editingId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    setEditingId(null);
    fetchTeachers();
  } catch (error) {
    console.error('Lỗi cập nhật giáo viên:', error);
  }
};


  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>Quản lý Giáo viên</TeachersHeader>

          {/* Thêm mới */}
          <AddTeacherForm onSubmit={handleAddTeacher} encType="multipart/form-data">
            <AddTeacherRow>
              <AddTeacherInput
                type="text"
                placeholder="Tên giáo viên"
                value={newTeacher.fullName}
                onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })}
              />
              <AddTeacherInput
                type="email"
                placeholder="Email giáo viên"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
              />
              <AddTeacherInput
                type="text"
                placeholder="Chuyên môn"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
              />
              <AddTeacherInput
                type="date"
                value={newTeacher.startDate}
                onChange={(e) => setNewTeacher({ ...newTeacher, startDate: e.target.value })}
              />
              <select
                name="status" 
                value={newTeacher.status}
                onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
              >
                <option value="Đang làm việc">Đang làm việc</option>
                <option value="Đã thôi việc">Đã thôi việc</option>
              </select>
              {newTeacher.status === "Đã thôi việc" && (
                <AddTeacherInput
                  type="date"
                  value={newTeacher.endDate}
                  onChange={(e) => setNewTeacher({ ...newTeacher, endDate: e.target.value })}
                />
              )}
              <FileInput
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
              <AddTeacherButton type="submit">Thêm giáo viên</AddTeacherButton>
            </AddTeacherRow>
          </AddTeacherForm>

          {/* Danh sách giáo viên */}
          <TeacherList>
            {teachers.map((teacher) => (
              <TeacherCard key={teacher._id}>
                {editingId === teacher._id ? (
                  <>
                    <AddTeacherInput
                      type="text"
                      name="fullName"
                      value={editData.fullName}
                      onChange={handleEditChange}
                      placeholder="Tên"
                    />
                    <AddTeacherInput
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      placeholder="Email"
                    />
                    <AddTeacherInput
                      type="text"
                      name="subject"
                      value={editData.subject}
                      onChange={handleEditChange}
                      placeholder="Chuyên môn"
                    />
                    <AddTeacherInput
                      type="date"
                      name="startDate"
                      value={editData.startDate}
                      onChange={handleEditChange}
                    />
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleEditChange}
                    >
                      <option value="Đang làm việc">Đang làm việc</option>
                      <option value="Đã thôi việc">Đã thôi việc</option>
                    </select>
                    {editData.status === "Đã thôi việc" && (
                      <AddTeacherInput
                        type="date"
                        name="endDate"
                        value={editData.endDate}
                        onChange={handleEditChange}
                      />
                    )}
                    <FileInput
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditAvatarFile(e.target.files[0])}
                    />
                    <ButtonSave onClick={handleSaveEdit} title="Lưu">
                      <FaSave /> Lưu
                    </ButtonSave>
                  </>
                ) : (
                  <>
                    <div>
                      {teacher.avatar && (
                        <Avatar
                          src={`http://localhost:4000${teacher.avatar}`}
                          alt="avatar"
                        />
                      )}
                      <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{teacher.fullName}</p>
                      <p><strong>Email:</strong> {teacher.email}</p>
                      <p><strong>Chuyên môn:</strong> {teacher.subject}</p>
                      <p><strong>Trạng thái:</strong> {teacher.status}</p>
                      <p>
                        <strong>{teacher.status === "Đã thôi việc" ? "Ngày làm:" : "Ngày bắt đầu:"}</strong>{" "}
                        {teacher.status === "Đã thôi việc"
                          ? `${teacher.startDate?.slice(0, 10)} → ${teacher.endDate?.slice(0, 10)}`
                          : teacher.startDate?.slice(0, 10)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
                      <ButtonEdit onClick={() => handleEditClick(teacher)} title="Sửa">
                        <FaEdit />
                      </ButtonEdit>
                      <ButtonDelete onClick={() => handleDeleteTeacher(teacher._id)} title="Xóa">
                        <FaTrash />
                      </ButtonDelete>
                    </div>
                  </>
                )}
              </TeacherCard>
            ))}
          </TeacherList>
        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default Teachers;

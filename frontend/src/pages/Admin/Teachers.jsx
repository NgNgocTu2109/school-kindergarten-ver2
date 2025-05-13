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
} from '../../styles/TeachersStyles';

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({ fullName: '', email: '', subject: '' });
  const [teachers, setTeachers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ fullName: '', email: '', subject: '' });

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
    const { fullName, email, subject } = newTeacher;
    if (fullName.trim() && email.trim() && subject.trim()) {
      try {
        await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
        fetchTeachers();
        setNewTeacher({ fullName: '', email: '', subject: '' });
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
      subject: teacher.subject
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:4000/api/v1/teachers/${editingId}`, editData);
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
          <AddTeacherForm onSubmit={handleAddTeacher}>
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
            <AddTeacherButton type="submit">Thêm giáo viên</AddTeacherButton>
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
                    <ButtonSave onClick={handleSaveEdit} title="Lưu">
                      <FaSave /> Lưu
                    </ButtonSave>
                  </>
                ) : (
                  <>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>{teacher.fullName}</p>
                      <p>📧 {teacher.email}</p>
                      <p>📝 {teacher.subject}</p>
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

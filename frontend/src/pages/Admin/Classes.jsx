import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassesHeader,
  AddClassForm,
  AddClassInput,
  AddClassButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  AddClassSelect,
} from '../../styles/ClassesStyles';

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [mealFeePerDay, setMealFeePerDay] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [tuitions, setTuitions] = useState([]);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data.success) {
        setClasses(response.data.classes);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách lớp:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers');
      if (response.data.success) {
        setTeachers(response.data.teachers);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách giáo viên:', error);
    }
  };

  const fetchTuitions = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/tuition");
      setTuitions(res.data.tuitions);
    } catch (err) {
      console.error("Lỗi khi lấy học phí:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
    fetchTuitions();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClassName || !ageGroup || !teacherId || !monthlyFee || !mealFeePerDay) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/v1/class", {
        grade: newClassName,
        ageGroup,
        teacherId,
      });

      const classId = res.data.class._id;
      await axios.post("http://localhost:4000/api/v1/tuition/set", {
        classId,
        monthlyFee: Number(monthlyFee),
        mealFeePerDay: Number(mealFeePerDay),
      });

      alert("Tạo lớp và học phí thành công!");
      fetchClasses();
      fetchTuitions();
      setNewClassName('');
      setAgeGroup('');
      setTeacherId('');
      setMonthlyFee('');
      setMealFeePerDay('');
    } catch (err) {
      console.error("Lỗi khi thêm lớp và học phí:", err);
      alert("Lỗi khi thêm lớp hoặc học phí!");
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa lớp này không?")) return;

    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/class/${id}`);
      if (response.data.success) {
        fetchClasses();
        fetchTuitions();
      }
    } catch (error) {
      console.error('Lỗi khi xóa lớp:', error);
    }
  };

  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassesHeader>Quản lý lớp học</ClassesHeader>
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput
              type="text"
              placeholder="Tên lớp (VD: Lớp Mầm 1)"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <AddClassInput
              type="text"
              placeholder="Lứa tuổi (VD: 3-4 tuổi)"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            />
            <AddClassInput
              type="number"
              placeholder="Học phí tháng (VD: 1200000)"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
            />
            <AddClassInput
              type="number"
              placeholder="Tiền ăn mỗi ngày (VD: 30000)"
              value={mealFeePerDay}
              onChange={(e) => setMealFeePerDay(e.target.value)}
            />
            <AddClassSelect value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
              <option value="">-- Chọn giáo viên --</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </option>
              ))}
            </AddClassSelect>
            <AddClassButton type="submit">Thêm lớp</AddClassButton>
          </AddClassForm>
  
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên lớp</TableCell>
                <TableCell>Lứa tuổi</TableCell>
                <TableCell>Giáo viên</TableCell>
                <TableCell>Học phí</TableCell>
                <TableCell>Tiền ăn/ngày</TableCell> 
                <TableCell>Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((classItem, index) => {
                const tuition = classItem.tuition;

                
                return (
                  <TableRow key={classItem._id}>
                    <TableCell>{index + 1}</TableCell>        
                    <TableCell>{classItem.grade}</TableCell>
                    <TableCell>{classItem.ageGroup}</TableCell>
                    <TableCell>{classItem.teacherId?.fullName || 'Không có'}</TableCell>
                    <TableCell>
                    {tuition?.monthlyFee != null ? `${tuition.monthlyFee.toLocaleString()} đ` : '–'}
                    </TableCell>
                    <TableCell>
                    {tuition?.mealFeePerDay != null ? `${tuition.mealFeePerDay.toLocaleString()} đ/ngày` : '–'}
                    </TableCell>
                    <TableCell>
                      <button
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff4d4f', fontSize: '18px' }}
                        onClick={() => handleDeleteClass(classItem._id)}
                        title="Xóa lớp"
                      >
                        <FaTrash />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
}  

export default Classes;

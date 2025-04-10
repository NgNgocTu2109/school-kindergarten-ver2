// Classes.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ClassesContainer,
  Content,
  ClassesContent,
  ClassesHeader,
  ClassList,
  ClassItem,
  AddClassForm,
  AddClassInput,
  AddClassButton,
} from '../../styles/ClassesStyles';

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/v1/class/getall');
        console.log("Fetched classes:", response.data); // Kiểm tra dữ liệu API
        if (response.data.success && Array.isArray(response.data.classes)) {
            setClasses(response.data.classes);
        } else {
            console.error('Error fetching classes: Invalid response format', response.data);
        }
    } catch (error) {
        console.error('Error fetching classes:', error.message);
    }
};

 // 🛠 Gọi API ngay khi component được render
 useEffect(() => {
  fetchClasses();
}, []);


const handleAddClass = async (e) => {
  e.preventDefault();
  if (newClassName.trim() !== '') {
      try {
          const response = await axios.post('http://localhost:4000/api/v1/class', { grade: newClassName });
          
          console.log('Response data:', response.data); // Kiểm tra dữ liệu phản hồi

          if (response.data.success) {
              fetchClasses(); // Gọi lại API để cập nhật danh sách lớp
              setNewClassName(''); // Xóa input sau khi thêm
          } else {
              console.error('Error: Unexpected response format', response.data);
          }
      } catch (error) {
          console.error('Error adding class:', error);
      }
  }
};


  return (
    <ClassesContainer>
      <Sidebar />
      <Content>
        <ClassesContent>
          <ClassesHeader>Classes</ClassesHeader>
          <AddClassForm onSubmit={handleAddClass}>
            <AddClassInput
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
            <AddClassButton type="submit">Add Class</AddClassButton>
          </AddClassForm>
          <ClassList>
            {/* Ensure that classes is an array before mapping over it */}
            {Array.isArray(classes) && classes.map((classItem, index) => (
              <ClassItem key={index}>{classItem.grade}</ClassItem>
            ))}
          </ClassList>
        </ClassesContent>
      </Content>
    </ClassesContainer>
  );
};

export default Classes;
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';
import {
  AssignmentsContainer,
  Content,
  AssignmentsContent,
  AssignmentsHeader,
  AddAssignmentForm,
  AddAssignmentInput,
  AddAssignmentTextArea,
  AddAssignmentButton,
  StyledTable,
  StyledTh,
  StyledTd,
} from '../../styles/AssignmentsStyles';

const Assignments = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (
      newAssignment.title.trim() !== '' &&
      newAssignment.description.trim() !== '' &&
      newAssignment.grade.trim() !== '' &&
      newAssignment.deadline.trim() !== ''
    ) {
      try {
        const formattedDeadline = new Date(newAssignment.deadline).toISOString();

        const response = await axios.post('http://localhost:4000/api/v1/assignments', {
          title: newAssignment.title,
          description: newAssignment.description,
          grade: newAssignment.grade,
          deadline: formattedDeadline,
        });

        toast.success('Assignment added successfully');
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        toast.error('Error adding assignment');
      }
    } else {
      toast.warn('Please fill all fields!');
    }
  };

  const handleDeleteAssignment = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/assignments/${id}`);
      toast.success('Assignment deleted successfully');
      setAssignments(assignments.filter((a) => a._id !== id));
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast.error('Error deleting assignment');
    }
  };

  return (
    <AssignmentsContainer>
      <ToastContainer />
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Bài Tập</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddAssignment}>
            <AddAssignmentInput
              type="text"
              placeholder="Nhập tiêu đề bài tập"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder="Nhập mô tả bài tập"
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <AddAssignmentInput
              type="text"
              placeholder="Nhập lớp"
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
            />
            <AddAssignmentInput
              type="date"
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            />
            <AddAssignmentButton type="submit">Thêm bài tập</AddAssignmentButton>
          </AddAssignmentForm>

          <StyledTable>
            <thead>
              <tr>
                <StyledTh>STT</StyledTh>
                <StyledTh>Tiêu đề</StyledTh>
                <StyledTh>Mô tả</StyledTh>
                <StyledTh>Lớp</StyledTh>
                <StyledTh>Hạn chót</StyledTh>
                <StyledTh>Xóa</StyledTh>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment._id}>
                  <StyledTd>{index + 1}</StyledTd>
                  <StyledTd>{assignment.title}</StyledTd>
                  <StyledTd>{assignment.description}</StyledTd>
                  <StyledTd>{assignment.grade}</StyledTd>
                  <StyledTd>{new Date(assignment.deadline).toLocaleDateString()}</StyledTd>
                  <StyledTd>
                   <span
                    style={{
                    color: 'red',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
              }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                  onClick={() => handleDeleteAssignment(assignment._id)}
                    >
                  <FaTrash />
                </span>
            </StyledTd>

                </tr>
              ))}
            </tbody>
          </StyledTable>
        </AssignmentsContent>
      </Content>  
    </AssignmentsContainer>
  );
};

export default Assignments;

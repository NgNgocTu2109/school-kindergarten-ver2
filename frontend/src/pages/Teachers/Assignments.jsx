import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
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

const AssignmentSection = () => {
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
    if (newAssignment.title && newAssignment.description && newAssignment.grade && newAssignment.deadline) {
      try {
        const formattedDeadline = new Date(newAssignment.deadline).toISOString();
        const response = await axios.post('http://localhost:4000/api/v1/assignments', {
          ...newAssignment,
          deadline: formattedDeadline,
        });
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
      }
    }
  };

  return (
    <AssignmentsContainer>
      <Sidebar />
      <Content>
        <AssignmentsContent>
          <AssignmentsHeader>Bài Tập</AssignmentsHeader>
          <AddAssignmentForm onSubmit={handleAddAssignment}>
            <AddAssignmentInput
              type='text'
              placeholder='Nhập tiêu đề bài tập'
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <AddAssignmentTextArea
              placeholder='Nhập mô tả bài tập'
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            />
            <AddAssignmentInput
              type='text'
              placeholder='Nhập khối lớp'
              value={newAssignment.grade}
              onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })}
            />
            <AddAssignmentInput
              type='date'
              value={newAssignment.deadline}
              onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            />
            <AddAssignmentButton type='submit'>Thêm Bài Tập</AddAssignmentButton>
          </AddAssignmentForm>

          <StyledTable>
            <thead>
              <tr>
                <StyledTh>STT</StyledTh>
                <StyledTh>Tiêu đề</StyledTh>
                <StyledTh>Mô tả</StyledTh>
                <StyledTh>Lớp</StyledTh>
                <StyledTh>Hạn chót</StyledTh>
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
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </AssignmentsContent>
      </Content>
    </AssignmentsContainer>
  );
};

export default AssignmentSection;

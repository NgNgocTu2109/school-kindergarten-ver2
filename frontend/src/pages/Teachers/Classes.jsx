import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ClassContainer,
  SidebarContainer,
  Content,
  ClassHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '../../styles/ClassesStyles';

const ClassSection = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  return (
    <ClassContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ClassHeader>Classes</ClassHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Lớp  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{classItem.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </ClassContainer>
  );
};

export default ClassSection;

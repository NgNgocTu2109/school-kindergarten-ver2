import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ExamContainer,
  SidebarContainer,
  Content,
  ExamHeader,
  ExamForm,
  FormLabel,
  FormInput,
  AddButton,
} from '../../styles/ExamStyles';

const Exam = () => {
    const [examData, setExamData] = useState([]);
    const [name, setName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [className, setClassName] = useState('');
    const [marks, setMarks] = useState('');
  
    useEffect(() => {
      fetchExams();
    }, []);
  
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/exam/getall');
        if (Array.isArray(response.data)) {
          setExamData(response.data);
        } else {
          setExamData([response.data]); // Wrap non-array response in an array
        }
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
  
    const handleAddExam = async (e) => {
      e.preventDefault();
      const newExam = { name, registrationNumber, className, marks: parseInt(marks) };
      try {
        const response = await axios.post('http://localhost:4000/api/v1/exam', newExam);
        // Ensure response data is always an object
        if (typeof response.data === 'object') {
          setExamData([...examData, response.data]);
          setName('');
          setRegistrationNumber('');
          setClassName('');
          setMarks('');
        } else {
          console.error('Error: API response data is not an object');
        }
      } catch (error) {
        console.error('Error adding exam:', error);
      }
    };
  
    const calculateTotalMarks = () => {
      let total = 0;
      for (let i = 0; i < examData.length; i++) {
        total += examData[i].marks;
      }
      return total;
    };

    //const calculateTotalMarks = () => {
        //let total = 0;
            //for (let i =0; i < examData.length; i){
           //    total = examData[i].marks; 
           // }
   // }

   // return total
    return (
        <ExamContainer>
            <SidebarContainer>
                <Sidebar />
            </SidebarContainer>
            <Content>
                <ExamHeader>Exam Details</ExamHeader>
                <ExamForm>
                    <FormLabel>Name: </FormLabel>
                    <FormInput 
                        type='text'
                        required
                    />
                    <FormLabel>Registration Number: </FormLabel>
                    <FormInput 
                        type='text'
                        required
                    />
                    <FormLabel>Class: </FormLabel>
                    <FormInput 
                        type='text'
                        required
                    />
                    <FormLabel>Marks: </FormLabel>
                    <FormInput 
                        type='number'
                        required
                    />
                    <AddButton type='submit'>Add Exam</AddButton>
                </ExamForm>

                <h2>Total Marks: [calculateTotalMarks]</h2>
                <h3>Exam Details: </h3>
                <ul>

                </ul>
            </Content>
        </ExamContainer>
    )
};

export default Exam
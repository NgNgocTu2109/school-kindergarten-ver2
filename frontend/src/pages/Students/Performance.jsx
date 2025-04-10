import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  PerformanceContainer,
  SidebarContainer,
  Content,
  PerformanceHeader,
  PerformanceInfo,
  PerformanceGraphContainer,
  TotalMarks,
} from '../../styles/PerformanceStyles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const PerformanceSection = () => {

  const performanceData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    marks: [80, 85, 90, 88, 92, 85], // Sample marks for each month
    totalMarks: 520 // Sample total marks for the year
  };

  const lineChartData = {
    labels: performanceData.months,
    datasets: [
      {
        label: 'Performance Trends',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        data: performanceData.marks
      }
    ]
  };
    return (
      <PerformanceContainer>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <Content>
        <PerformanceHeader>Performance</PerformanceHeader>
        <PerformanceInfo>
          <PerformanceGraphContainer>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData.months.map((month, index) => ({ 
                  month, 
                  marks: performanceData.marks[index] 
                }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="marks" stroke="#007bff" />
              </LineChart>
            </ResponsiveContainer>
          </PerformanceGraphContainer>
            <TotalMarks>Total Marks: {performanceData.totalMarks}</TotalMarks>
              
          </PerformanceInfo>
        </Content>
      </PerformanceContainer>
    )
};

export default PerformanceSection
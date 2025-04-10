import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import { TeacherDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';

const TeacherDashboard= () => {


    return (
      <TeacherDashboardContainer>
        <Sidebar />
        <Content>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                  <CardTitle>Total Students</CardTitle>
                  <CardContent>500</CardContent>
              </Card>
              <Card>
                    <CardTitle>Total Teachers</CardTitle>
                    <CardContent>20</CardContent>
              </Card>
              <Card>
                      <CardTitle>Total Classes</CardTitle>
                      <CardContent>50</CardContent>
              </Card>
            </CardContainer>
          </Section>
          
          <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          </Section>
          
          <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          </Section>
        </Content>
      </TeacherDashboardContainer>
    )
};

export default TeacherDashboard
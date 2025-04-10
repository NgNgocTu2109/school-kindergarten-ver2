import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import { StudentDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';

const StudentDashboard = () => {
    return (
        <StudentDashboardContainer>
        <Sidebar />
        <Content>
                <Section>
                    <SectionTitle>Overview</SectionTitle>
                    <CardContainer>
                        <Card>
                            <CardTitle>Bài tập</CardTitle>
                            <CardContent>Tập 5 động tác</CardContent>
                        </Card>
                        <Card>
                            <CardTitle>Performance</CardTitle>
                            <CardContent>553</CardContent>
                        </Card>
                        <Card>
                            <CardTitle>Term</CardTitle>
                            <CardContent>1</CardContent>
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
    </StudentDashboardContainer>
      
    )
};

export default StudentDashboard
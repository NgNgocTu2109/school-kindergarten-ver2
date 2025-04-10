import React, {useState, useEffect} from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import { ProfileContainer, SidebarContainer, Content, ProfileHeader, ProfileDetails, ProfileLabel, ProfileInfo, EditButton } 
from '../../styles/TeacherProfileStyles'; 
const TeacherProfileSection= () => {

  const teacherInfo = {
    name: 'Nguyen Ngoc Tu',
    email: 'nnt@gmail.com',
    phone: '11111111',
    address: 'Ha Noi',
    qualification: 'Education'

};

return (
    <ProfileContainer>
        <SidebarContainer>
            <Sidebar />
            <Content>
                <ProfileHeader>Profile Details</ProfileHeader>
                <ProfileDetails>
                    <ProfileLabel>Name: </ProfileLabel>
                    <ProfileInfo>{teacherInfo.name}</ProfileInfo>

                    <ProfileLabel>Email: </ProfileLabel>
                    <ProfileInfo>{teacherInfo.email}</ProfileInfo>

                    <ProfileLabel>Phone: </ProfileLabel>
                    <ProfileInfo>{teacherInfo.phone}</ProfileInfo>

                    <ProfileLabel>Address: </ProfileLabel>
                    <ProfileInfo>{teacherInfo.address}</ProfileInfo>

                    <ProfileLabel>Qualification: </ProfileLabel>
                    <ProfileInfo>{teacherInfo.qualification}</ProfileInfo>

                </ProfileDetails>

                <EditButton>Edit Profile</EditButton>
            </Content>
        </SidebarContainer>
       
    </ProfileContainer>
)
};

export default TeacherProfileSection
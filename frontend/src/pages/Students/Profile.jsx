import React from "react";
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileCard,
  ProfileHeader,
  ProfileDetail,
  Label,
  Value,
  EditButton
} from '../../styles/SettingsProfileStyles';

const ProfileSection = () => {
  const studentProfile = {
    name: 'Nguyen Ngoc Tu',
    age: 21,
    grade: '09th',
    school: 'Example High School',
    email: 'nnt@gmail.com'
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileCard>
          <ProfileHeader>Profile Details</ProfileHeader>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{studentProfile.name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Age:</Label>
            <Value>{studentProfile.age}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Grade:</Label>
            <Value>{studentProfile.grade}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>School:</Label>
            <Value>{studentProfile.school}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email:</Label>
            <Value>{studentProfile.email}</Value>
          </ProfileDetail>
          <EditButton>Edit Profile</EditButton>
        </ProfileCard>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;

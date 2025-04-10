import React from "react";
import { ChooseUserContainer, UserSection, Title, Button, UserImage, Description } from "../styles/ChooseUserStyles";
import { Link } from "react-router-dom";
import adminImg from "../assets/admin.jpg";
import studentImg from "../assets/student.jpg";
import teacherImg from "../assets/teacher.png";

const ChooseUser = () => {
    return (
        <ChooseUserContainer>
            <h1>Chọn loại tài khoản</h1>

            <UserSection>
                <UserImage src={adminImg} alt="Admin" />
                <Title>Admin</Title>
                <Description>Quản lý hệ thống và người dùng.</Description>
                <Button as={Link} to="/admin-signin">Đăng nhập Admin</Button>
            </UserSection>

            <UserSection>
                <UserImage src={studentImg} alt="Student" />
                <Title>Student</Title>
                <Description>Học sinh có thể xem thông tin lớp học.</Description>
                <Button as={Link} to="/student-signin">Đăng nhập Student</Button>
            </UserSection>

            <UserSection>
                <UserImage src={teacherImg} alt="Teacher" />
                <Title>Teacher</Title>
                <Description>Giáo viên quản lý học sinh và lớp học.</Description>
                <Button as={Link} to="/teacher-signin">Đăng nhập Teacher</Button>
            </UserSection>
        </ChooseUserContainer>
    );
};

export default ChooseUser;

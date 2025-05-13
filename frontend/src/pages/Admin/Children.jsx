import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ChildrenContainer,
  Content,
  ChildrenContent,
  ChildrenHeader,
  AddChildForm,
  AddChildInput,
  AddChildSelect,
  AddChildButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '../../styles/ChildrenStyles';

const Children = () => {
  const [children, setChildren] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newChild, setNewChild] = useState({
    fullName: '',
    birthday: '',
    gender: '',
    classId: '',
  });

  // Lấy danh sách lớp
  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/class/getall');
      setClasses(res.data.classes);
    } catch (err) {
      console.error('Lỗi lấy danh sách lớp:', err);
    }
  };

  // Lấy danh sách học sinh
  const fetchChildren = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/children');
      setChildren(res.data.children);
    } catch (err) {
      console.error('Lỗi lấy danh sách học sinh:', err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchChildren();
  }, []);

  const handleAddChild = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/children', newChild);
      fetchChildren();
      setNewChild({ fullName: '', birthday: '', gender: '', classId: '' });
    } catch (err) {
      console.error('Lỗi thêm học sinh:', err);
    }
  };

  const handleDeleteChild = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa học sinh này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/children/${id}`);
      fetchChildren();
    } catch (err) {
      console.error('Lỗi xóa học sinh:', err);
    }
  };

  return (
    <ChildrenContainer>
      <Sidebar />
      <Content>
        <ChildrenContent>
          <ChildrenHeader>Quản lý Học sinh</ChildrenHeader>

          <AddChildForm onSubmit={handleAddChild}>
            <AddChildInput
              type="text"
              placeholder="Tên học sinh"
              value={newChild.fullName}
              onChange={(e) => setNewChild({ ...newChild, fullName: e.target.value })}
            />
            <AddChildInput
              type="date"
              placeholder="Ngày sinh"
              value={newChild.birthday}
              onChange={(e) => setNewChild({ ...newChild, birthday: e.target.value })}
            />
            <AddChildSelect
              value={newChild.gender}
              onChange={(e) => setNewChild({ ...newChild, gender: e.target.value })}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </AddChildSelect>
            <AddChildSelect
              value={newChild.classId}
              onChange={(e) => setNewChild({ ...newChild, classId: e.target.value })}
            >
              <option value="">Chọn lớp</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>{cls.grade}</option>
              ))}
            </AddChildSelect>
            <AddChildButton type="submit">Thêm học sinh</AddChildButton>
          </AddChildForm>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.map((child, index) => (
                <TableRow key={child._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{child.fullName}</TableCell>
                  <TableCell>{child.gender}</TableCell>
                  <TableCell>{new Date(child.birthday).toLocaleDateString()}</TableCell>
                  <TableCell>{child.classId?.grade}</TableCell>
                  <TableCell>
                    <button
                      style={{ background: 'none', color: 'red', border: 'none', cursor: 'pointer' }}
                      onClick={() => handleDeleteChild(child._id)}
                    >
                      Xóa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChildrenContent>
      </Content>
    </ChildrenContainer>
  );
};

export default Children;

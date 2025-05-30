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
    avatar: null,
  });
  const [editingChildId, setEditingChildId] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/class/getall');
      setClasses(res.data.classes);
    } catch (err) {
      console.error('Lỗi lấy danh sách lớp:', err);
    }
  };

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
    const formData = new FormData();
    formData.append("fullName", newChild.fullName);
    formData.append("birthday", newChild.birthday);
    formData.append("gender", newChild.gender);
    formData.append("classId", newChild.classId);
    if (newChild.avatar) {
      formData.append("avatar", newChild.avatar);
    }

    try {
      if (editingChildId) {
        await axios.put(`http://localhost:4000/api/v1/children/${editingChildId}`, formData);
        alert("✔️ Cập nhật học sinh thành công");
      } else {
        await axios.post('http://localhost:4000/api/v1/children', formData);
        alert("✔️ Thêm học sinh thành công");
      }
      fetchChildren();
      setNewChild({ fullName: '', birthday: '', gender: '', classId: '', avatar: null });
      setEditingChildId(null);
    } catch (err) {
      console.error('Lỗi thêm/sửa học sinh:', err);
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

  const handleEditChild = (child) => {
    setNewChild({
      fullName: child.fullName,
      birthday: child.birthday.split("T")[0],
      gender: child.gender,
      classId: child.classId?._id || '',
      avatar: null,
    });
    setEditingChildId(child._id);
  };

  return (
    <ChildrenContainer>
      <Sidebar />
      <Content>
        <ChildrenContent>
          <ChildrenHeader>Quản lý Học sinh</ChildrenHeader>

          <AddChildForm onSubmit={handleAddChild} encType="multipart/form-data">
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewChild({ ...newChild, avatar: e.target.files[0] })}
            />
            <AddChildButton type="submit">{editingChildId ? 'Cập nhật' : 'Thêm học sinh'}</AddChildButton>
          </AddChildForm>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Giới tính</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.map((child, index) => (
                <TableRow key={child._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {child.avatar ? (
                      <img
                        src={`http://localhost:4000/uploads/${child.avatar}`}
                        alt="avatar"
                        style={{ width: 40, height: 40, borderRadius: '50%' }}
                      />
                    ) : (
                      <span style={{ color: '#aaa', fontStyle: 'italic' }}>Không có ảnh</span>
                    )}
                  </TableCell>
                  <TableCell>{child.fullName}</TableCell>
                  <TableCell>{child.gender}</TableCell>
                  <TableCell>{new Date(child.birthday).toLocaleDateString()}</TableCell>
                  <TableCell>{child.classId?.grade}</TableCell>
                  <TableCell>
                    <span
                      style={{ color: 'blue', cursor: 'pointer', marginRight: 10 }}
                      onClick={() => handleEditChild(child)}
                    >
                      Sửa
                    </span>
                    <span
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleDeleteChild(child._id)}
                    >
                      Xóa
                    </span>
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

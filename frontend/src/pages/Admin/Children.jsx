import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { BsPeopleFill, BsPersonFill } from 'react-icons/bs';
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
  const [accounts, setAccounts] = useState([]);
  const [newChild, setNewChild] = useState({
    fullName: '',
    birthday: '',
    gender: '',
    classId: '',
    avatar: null,
    email: '',
    password: '',
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

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/v1/studentaccount/all');
      setAccounts(res.data.accounts);
    } catch (err) {
      console.error('Lỗi lấy danh sách tài khoản:', err);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchChildren();
    fetchAccounts();
  }, []);

  const handleAddChild = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", newChild.fullName);
    formData.append("birthday", newChild.birthday);
    formData.append("gender", newChild.gender);
    formData.append("classId", newChild.classId);
    formData.append("email", newChild.email);
    formData.append("password", newChild.password);
    if (newChild.avatar) {
      formData.append("avatar", newChild.avatar);
    }

    try {
      if (editingChildId) {
        await axios.put(`http://localhost:4000/api/v1/children/${editingChildId}`, formData);
        alert("✔️ Cập nhật học sinh thành công");
      } else {
        await axios.post('http://localhost:4000/api/v1/children', formData);
        alert("✔️ Thêm học sinh và tài khoản thành công");
      }
      fetchChildren();
      fetchAccounts();
      setNewChild({
        fullName: '',
        birthday: '',
        gender: '',
        classId: '',
        avatar: null,
        email: '',
        password: '',
      });
      setEditingChildId(null);
    } catch (err) {
      console.error('Lỗi thêm/sửa học sinh:', err);
      alert('❌ Thêm thất bại! Có thể email đã tồn tại');
    }
  };

  const handleDeleteChild = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa học sinh này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/children/${id}`);
      fetchChildren();
      fetchAccounts();
    } catch (err) {
      console.error('Lỗi xóa học sinh:', err);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tài khoản học sinh này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/studentaccount/${id}`);
      fetchAccounts();
    } catch (err) {
      console.error('Lỗi xóa tài khoản:', err);
    }
  };

  const handleEditChild = (child) => {
    setNewChild({
      fullName: child.fullName,
      birthday: child.birthday.split("T")[0],
      gender: child.gender,
      classId: child.classId?._id || '',
      avatar: null,
      email: '',
      password: '',
    });
    setEditingChildId(child._id);
  };

  return (
    <ChildrenContainer>
      <Sidebar />
      <Content>
        <ChildrenContent style={{ position: 'relative' }}>
          <ChildrenHeader>
            <BsPeopleFill style={{ marginRight: '8px', marginBottom: '-4px' }} />
            Quản lý tài khoản và học sinh
          </ChildrenHeader>

          <div style={{
            position: "absolute",
            top: 20,
            right: 30,
            fontSize: 220,
            color: "#2980b9",
            opacity: 0.08,
            pointerEvents: "none"
          }}>
            <BsPersonFill />
          </div>

          <AddChildForm onSubmit={handleAddChild} encType="multipart/form-data">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
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
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <AddChildInput
                type="email"
                placeholder="Email đăng nhập"
                value={newChild.email}
                onChange={(e) => setNewChild({ ...newChild, email: e.target.value })}
              />
              <AddChildInput
                type="password"
                placeholder="Mật khẩu"
                value={newChild.password}
                onChange={(e) => setNewChild({ ...newChild, password: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewChild({ ...newChild, avatar: e.target.files[0] })}
              />
              <AddChildButton type="submit">{editingChildId ? 'Cập nhật' : 'Thêm học sinh'}</AddChildButton>
            </div>
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
                    <span style={{ color: 'blue', cursor: 'pointer', marginRight: 10 }} onClick={() => handleEditChild(child)}>Sửa</span>
                    <span style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDeleteChild(child._id)}>Xóa</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h3 style={{ marginTop: "40px" }}>Danh sách Tài khoản học sinh</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên học sinh</TableCell>
                <TableCell>Email đăng nhập</TableCell>
                <TableCell>Lớp</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((acc, index) => (
                <TableRow key={acc._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{acc.childId?.fullName || "?"}</TableCell>
                  <TableCell>{acc.email}</TableCell>
                  <TableCell>{acc.childId?.classId?.grade || "?"}</TableCell>
                  <TableCell>{new Date(acc.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleDeleteAccount(acc._id)}
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

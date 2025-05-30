import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  StyledTable,
} from '../../styles/AnnouncementStyles';

const Announcement = () => {
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Lỗi khi lấy thông báo:', error);
      toast.error('Không thể tải danh sách thông báo');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/announcements', { content });
      toast.success('📢 Gửi thông báo thành công');
      setContent('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      toast.error('Không thể gửi thông báo');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá thông báo này không?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/${id}`);
      toast.success("🗑 Đã xoá thông báo");
      setAnnouncements(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Lỗi khi xoá:", error);
      toast.error("Không thể xoá thông báo");
    }
  };

  return (
    <AnnouncementContainer>
      <Sidebar />
      <Content>
        <Title>📢 Gửi thông báo</Title>

        <AnnouncementForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="content">Nội dung thông báo:</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
              placeholder="Nhập nội dung thông báo..."
            />
          </FormGroup>
          <Button type="submit">Gửi</Button>
        </AnnouncementForm>

        <h3 style={{ marginTop: "40px" }}>📋 Danh sách thông báo</h3>
        <StyledTable>
          <thead>
            <tr>
              <th>STT</th>
              <th>Nội dung</th>
              <th>Thời gian</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a, index) => (
              <tr key={a._id}>
                <td>{index + 1}</td>
                <td>{a.content}</td>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
                <td>
                  <Button
                    style={{ backgroundColor: "crimson" }}
                    onClick={() => handleDelete(a._id)}
                  >
                    Xoá
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Content>
    </AnnouncementContainer>
  );
};

export default Announcement;

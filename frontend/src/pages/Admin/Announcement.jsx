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
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Lỗi khi tải thông báo');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements', {
        announcement: announcement,
      });
      toast.success('Gửi thông báo thành công');
      setAnnouncement('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      toast.error('Gửi thông báo thất bại');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa thông báo này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/${id}`);
      toast.success("Xóa thông báo thành công");
      setAnnouncements(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      toast.error("Xóa thông báo thất bại");
    }
  };

  return (
    <AnnouncementContainer>
      <Sidebar />
      <Content>
        <Title>Thông báo</Title>

        <AnnouncementForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="announcement">Thông báo:</Label>
            <TextArea
              id="announcement"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              required
              rows={4}
              cols={50}
            />
          </FormGroup>
          <Button type="submit">Gửi thông báo</Button>
        </AnnouncementForm>

        <h2>Danh sách thông báo</h2>
        <StyledTable>
          <thead>
            <tr>
              <th>STT</th>
              <th>Nội dung</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((announcement, index) => (
              <tr key={announcement._id}>
                <td>{index + 1}</td>
                <td>{announcement.announcement}</td>
                <td>
                  <Button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(announcement._id)}
                  >
                    Xóa
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

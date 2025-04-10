import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AnnouncementContainer,
  SidebarContainer,
  Content,
  AnnouncementHeader,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementTitle,
  AnnouncementContent,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
} from '../../styles/AnnouncementStyles'; 

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetch thông báo từ API
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  // Thêm thông báo mới
  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    
    try {
      const response = await axios.post('http://localhost:4000/api/v1/announcements/add', {
        announcement: newAnnouncement
      });

      setAnnouncements([...announcements, response.data.announcement]);
      setNewAnnouncement("");
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  // Xóa thông báo
  const handleDeleteAnnouncement = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/delete/${id}`);
      setAnnouncements(announcements.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  // Lọc thông báo theo nội dung tìm kiếm
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.announcement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      
      <Content>
        <AnnouncementHeader>Announcements</AnnouncementHeader>
        
        {/* Ô tìm kiếm thông báo */}
        <input
          type="text"
          placeholder="Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "20px", borderRadius: "5px" }}
        />

        {/* Form nhập thông báo mới */}
        <AnnouncementForm onSubmit={handleAddAnnouncement}>
          <FormGroup>
            <Label>Nhập thông báo mới:</Label>
            <TextArea
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Nhập nội dung..."
            />
          </FormGroup>
          <Button type="submit">Đăng thông báo</Button>
        </AnnouncementForm>

        {/* Danh sách thông báo */}
        <AnnouncementList>
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementItem key={announcement._id}>
                <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
                <AnnouncementContent>{new Date(announcement.createdAt).toLocaleString()}</AnnouncementContent>
                <Button onClick={() => handleDeleteAnnouncement(announcement._id)} style={{ backgroundColor: "red", marginTop: "10px" }}>
                  Xóa
                </Button>
              </AnnouncementItem>
            ))
          ) : (
            <p>Không có thông báo nào.</p>
          )}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default AnnouncementSection;

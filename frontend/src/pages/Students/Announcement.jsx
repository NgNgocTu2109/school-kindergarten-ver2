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
} from '../../styles/AnnouncementStylesStudent';

const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.announcement.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      
      <Content>
        <AnnouncementHeader>Thông báo từ nhà trường</AnnouncementHeader>
        
        <input
          type="text"
          placeholder="Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "20px", borderRadius: "5px" }}
        />

        <AnnouncementList>
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement) => (
              <AnnouncementItem key={announcement._id}>
                <AnnouncementTitle>{announcement.announcement}</AnnouncementTitle>
                <AnnouncementContent>
                  {new Date(announcement.createdAt).toLocaleString()}
                </AnnouncementContent>
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

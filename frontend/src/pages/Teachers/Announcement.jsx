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
} from '../../styles/AnnouncementStylesStudent'; // dùng lại style student

const TeacherAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Lỗi khi tải thông báo:', error);
    }
  };

  const filteredAnnouncements = announcements.filter((a) =>
    a.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnnouncementContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>

      <Content>
        <AnnouncementHeader>📢 Thông báo từ nhà trường</AnnouncementHeader>

        <input
          type="text"
          placeholder="🔍 Tìm kiếm thông báo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "12px 16px",
            width: "100%",
            maxWidth: "600px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginBottom: "24px",
          }}
        />

        <AnnouncementList>
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((a) => (
              <AnnouncementItem key={a._id}>
                <AnnouncementTitle>{a.content}</AnnouncementTitle>
                <AnnouncementContent>
                  🕒 {new Date(a.createdAt).toLocaleString("vi-VN")}
                </AnnouncementContent>
              </AnnouncementItem>
            ))
          ) : (
            <p style={{ color: "#888", fontStyle: "italic" }}>
              Không có thông báo nào phù hợp.
            </p>
          )}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default TeacherAnnouncement;

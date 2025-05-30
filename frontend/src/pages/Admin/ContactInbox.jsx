import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import {
  InboxContainer,
  Content,
  MessageCard,
  MessageHeader,
  MessageSubInfo,
  MessageContent,
  SectionTitle,
  NoMessages
} from '../../styles/ContactInboxStyles';

const ContactInbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/v1/contact');
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error('Lỗi khi lấy tin nhắn liên hệ:', err);
      }
    };

    fetchContactMessages();
  }, []);

  return (
    <InboxContainer>
      <Sidebar />
      <Content>
        <SectionTitle>Hộp thư liên hệ
        </SectionTitle>
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <MessageCard key={idx}>
              <MessageHeader>{msg.fullName}</MessageHeader>
              <MessageSubInfo>Email: {msg.email}</MessageSubInfo>
              <MessageContent>{msg.message}</MessageContent>
            </MessageCard>
          ))
        ) : (
          <NoMessages>Không có tin nhắn nào được gửi.</NoMessages>
        )}
      </Content>
    </InboxContainer>
  );
};

export default ContactInbox;

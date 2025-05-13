import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  MessageContainer,
  MessageContent,
  MessageBox,
  SenderName,
  MessageText,
  ReplyForm,
  ReplyInput,
  ReplyButton,
} from "../../styles/MessageStyles";

const TeacherMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replyMap, setReplyMap] = useState({});

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/message/all");
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };

  const handleReply = async (messageId) => {
    const content = replyMap[messageId];
    if (!content) return;

    try {
      await axios.post(`http://localhost:4000/api/v1/message/reply/${messageId}`, { content });
      setReplyMap((prev) => ({ ...prev, [messageId]: "" }));
      fetchMessages();
    } catch (err) {
      console.error("Lỗi khi gửi phản hồi:", err);
    }
  };

  const handleDelete = async (messageId) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xoá tin nhắn này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:4000/api/v1/message/${messageId}`);
      fetchMessages();
    } catch (err) {
      console.error("Lỗi khi xoá tin nhắn:", err);
    }
  };

  return (
    <MessageContainer>
      <Sidebar />
      <MessageContent>
        <h2>Tin nhắn từ phụ huynh</h2>
        {messages.map((msg) => (
          <MessageBox key={msg._id}>
            <SenderName>
              👶 {msg.childId?.fullName}
              <span style={{ float: "right", fontSize: "12px", color: "#888" }}>
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </SenderName>
            <MessageText>{msg.content}</MessageText>

            {msg.replies?.length > 0 && (
              <div style={{ marginBottom: "10px" }}>
                {msg.replies.map((reply, idx) => (
                  <div key={idx} style={{ fontSize: "14px", padding: "4px 0" }}>
                    <b>{reply.from === "teacher" ? "👩‍🏫 Giáo viên" : "👨‍👩‍👧 Phụ huynh"}:</b> {reply.content}
                    <div style={{ fontSize: "12px", color: "#aaa" }}>
                      {new Date(reply.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <ReplyForm>
              <ReplyInput
                placeholder="Nhập phản hồi..."
                value={replyMap[msg._id] || ""}
                onChange={(e) =>
                  setReplyMap((prev) => ({ ...prev, [msg._id]: e.target.value }))
                }
              />
              <ReplyButton type="button" onClick={() => handleReply(msg._id)}>
                Gửi phản hồi
              </ReplyButton>
              <ReplyButton
                type="button"
                style={{ backgroundColor: "#dc3545", marginLeft: "8px" }}
                onClick={() => handleDelete(msg._id)}
              >
                Xoá
              </ReplyButton>
            </ReplyForm>
          </MessageBox>
        ))}
      </MessageContent>
    </MessageContainer>
  );
};

export default TeacherMessages;

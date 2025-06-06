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

const StudentMessages = () => {
  const studentUser = JSON.parse(localStorage.getItem("studentUser"));
  const token = localStorage.getItem("studentToken");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/message/student", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage) return;
    try {
      await axios.post("http://localhost:4000/api/v1/message/send", { content: newMessage }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Lỗi khi gửi tin:", err);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm("Bạn có chắc muốn xoá tin nhắn này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/message/${messageId}`);
      fetchMessages();
    } catch (err) {
      console.error("Lỗi khi xoá tin nhắn:", err);
    }
  };

  const handleUpdate = async (messageId) => {
    if (!editContent) return;
    try {
      await axios.put(`http://localhost:4000/api/v1/message/${messageId}`, {
        content: editContent,
      });
      setEditingId(null);
      setEditContent("");
      fetchMessages();
    } catch (err) {
      console.error("Lỗi khi sửa tin nhắn:", err);
    }
  };

  return (
    <MessageContainer>
      <Sidebar />
      <MessageContent>
        <h2>Trao đổi với giáo viên</h2>
        <h4>👶 Học sinh: {studentUser?.fullName}</h4>

        {messages.map((msg) => (
          <MessageBox key={msg._id}>
            <SenderName>
              👨‍👩‍👧 Bạn
              <span style={{ float: "right", fontSize: "12px", color: "#888" }}>
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </SenderName>

            {editingId === msg._id ? (
              <>
                <ReplyInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <ReplyButton onClick={() => handleUpdate(msg._id)}>Lưu</ReplyButton>
                <ReplyButton
                  style={{ backgroundColor: "#6c757d" }}
                  onClick={() => {
                    setEditingId(null);
                    setEditContent("");
                  }}
                >
                  Huỷ
                </ReplyButton>
              </>
            ) : (
              <>
                <MessageText>{msg.content}</MessageText>
                <ReplyButton
                  style={{ backgroundColor: "#007bff", color: "white", marginRight: "8px" }}
                  onClick={() => {
                    setEditingId(msg._id);
                    setEditContent(msg.content);
                  }}
                >
                  Sửa
                </ReplyButton>
                <ReplyButton
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={() => handleDelete(msg._id)}
                >
                  Xoá
                </ReplyButton>
              </>
            )}

            {msg.replies?.length > 0 && (
              <div style={{ marginTop: "10px" }}>
                {msg.replies.map((reply, idx) => (
                  <div key={idx} style={{ fontSize: "14px", padding: "4px 0" }}>
                    <b>{reply.from === "teacher" ? "👩‍🏫 Giáo viên" : "👨‍👩‍👧 Bạn"}:</b>{" "}
                    {reply.content}
                    <div style={{ fontSize: "12px", color: "#aaa" }}>
                      {new Date(reply.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </MessageBox>
        ))}

        <ReplyForm>
          <ReplyInput
            placeholder="Nhập tin nhắn gửi giáo viên..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <ReplyButton type="button" onClick={handleSendMessage}>
            Gửi tin
          </ReplyButton>
        </ReplyForm>
      </MessageContent>
    </MessageContainer>
  );
};

export default StudentMessages;

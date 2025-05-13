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
  const [childName, setChildName] = useState("");
  const [child, setChild] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/children/search?name=${childName}`
      );
      const found = res.data.children?.[0];
      if (!found) {
        alert("Không tìm thấy học sinh");
        return;
      }
      setChild(found);
      fetchMessages(found._id);
    } catch (err) {
      console.error("Lỗi tìm học sinh:", err);
    }
  };

  const fetchMessages = async (childId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/message/by-child/${childId}`
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Lỗi khi lấy tin nhắn:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage || !child) return;
    try {
      await axios.post("http://localhost:4000/api/v1/message/send", {
        childId: child._id,
        content: newMessage,
      });
      setNewMessage("");
      fetchMessages(child._id);
    } catch (err) {
      console.error("Lỗi khi gửi tin:", err);
    }
  };

  const handleDelete = async (messageId) => {
    if (!window.confirm("Bạn có chắc muốn xoá tin nhắn này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/message/${messageId}`);
      fetchMessages(child._id);
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
      fetchMessages(child._id);
    } catch (err) {
      console.error("Lỗi khi sửa tin nhắn:", err);
    }
  };

  return (
    <MessageContainer>
      <Sidebar />
      <MessageContent>
        <h2>Trao đổi với giáo viên</h2>

        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Nhập tên con bạn..."
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            style={{ padding: "8px", width: "250px", marginRight: "10px" }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
            }}
          >
            Tìm
          </button>
        </div>

        {child && (
          <div>
            <h4>👶 Học sinh: {child.fullName}</h4>

            {messages.map((msg) => (
              <MessageBox key={msg._id}>
                <SenderName>
                  👩‍🏫 Giáo viên
                  <span
                    style={{
                      float: "right",
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </SenderName>

                {editingId === msg._id ? (
                  <>
                    <ReplyInput
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <ReplyButton onClick={() => handleUpdate(msg._id)}>
                      Lưu
                    </ReplyButton>
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
                      style={{
                        backgroundColor: "#007bff", // xanh dương đậm
                        color: "white",
                        marginRight: "8px",
                      }}
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
                      <div
                        key={idx}
                        style={{ fontSize: "14px", padding: "4px 0" }}
                      >
                        <b>
                          {reply.from === "teacher"
                            ? "👩‍🏫 Giáo viên"
                            : "👨‍👩‍👧 Bạn"}
                          :
                        </b>{" "}
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
          </div>
        )}
      </MessageContent>
    </MessageContainer>
  );
};

export default StudentMessages;

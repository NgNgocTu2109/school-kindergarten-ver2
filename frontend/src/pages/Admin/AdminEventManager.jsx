// AdminEventManager.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Textarea,
  Select,
  Button,
  EventList,
  EventItem,
  EventImage,
  EventInfo,
  DeleteButton
} from "../../styles/EventStyles";

const AdminEventManager = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("sukien");
  const [fee, setFee] = useState("");
  const [detailLink, setDetailLink] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [classIds, setClassIds] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [events, setEvents] = useState([]);
  const [participantMap, setParticipantMap] = useState({});
  const [openEventId, setOpenEventId] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchEvents();
  }, []);

  const fetchClasses = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/class/getall");
    setAllClasses(res.data.classes);
  };

  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:4000/api/v1/event");
    setEvents(res.data.events);
  };

  const handleImageUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/upload", formData);
      setUploadedImage(res.data.imageUrl);
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadedImage) {
      alert("Vui lòng tải ảnh trước khi đăng sự kiện.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("type", type);
      formData.append("fee", fee);
      formData.append("detailLink", detailLink);
      formData.append("image", uploadedImage.split("/uploads/")[1]);
      classIds.forEach(id => formData.append("classIds", id));

      await axios.post("http://localhost:4000/api/v1/event", formData);
      fetchEvents();
      setTitle("");
      setDescription("");
      setDate("");
      setType("sukien");
      setFee("");
      setDetailLink("");
      setImage(null);
      setUploadedImage("");
      setClassIds([]);
    } catch (err) {
      console.error("Lỗi khi tạo sự kiện:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xoá sự kiện này?")) return;
    await axios.delete(`http://localhost:4000/api/v1/event/${id}`);
    fetchEvents();
  };

  const handleViewParticipants = async (eventId) => {
    if (openEventId === eventId) {
      setOpenEventId(null);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/event/${eventId}/participants`);
      setParticipantMap(prev => ({ ...prev, [eventId]: res.data.participants }));
      setOpenEventId(eventId);
    } catch (err) {
      console.error("Lỗi khi lấy học sinh tham gia:", err);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Header>Quản lý Sự kiện & Hoạt động</Header>

        <Form onSubmit={handleSubmit}>
          <Input placeholder="Tên sự kiện" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <Input type="number" placeholder="Phí tham gia (0 = miễn phí)" value={fee} onChange={(e) => setFee(e.target.value)} />
          <Input type="text" placeholder="Link mô tả chi tiết (tuỳ chọn)" value={detailLink} onChange={(e) => setDetailLink(e.target.value)} />

          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="sukien">Sự kiện</option>
            <option value="hoatdong">Hoạt động ngoại khoá</option>
          </Select>

          <Select multiple value={classIds} onChange={(e) => setClassIds(Array.from(e.target.selectedOptions, opt => opt.value))}>
            {allClasses.map(cls => (
              <option key={cls._id} value={cls._id}>{cls.grade}</option>
            ))}
          </Select>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
          <Button type="button" onClick={handleImageUpload}>Tải ảnh lên</Button>

          {uploadedImage && (
            <img
              src={uploadedImage}
              alt="Preview"
              style={{ width: "200px", marginTop: "10px" }}
            />
          )}

          <Button type="submit">Đăng sự kiện</Button>
        </Form>

        <EventList>
          {events.map(ev => (
            <EventItem key={ev._id}>
              <EventImage src={`http://localhost:4000/uploads/${ev.image}`} alt={ev.title} />
              <EventInfo>
                <h4>{ev.title}</h4>
                <p>📘 Áp dụng cho: {ev.classIds?.map(cls => cls.grade).join(", ")}</p>
                <p>{ev.description}</p>
                {ev.fee > 0 && <p><strong>Phí tham gia:</strong> {ev.fee} đ</p>}
                {ev.detailLink && <p><a href={ev.detailLink} target="_blank" rel="noopener noreferrer">🔗 Chi tiết</a></p>}
                <small>{new Date(ev.date).toLocaleDateString()} – {ev.type}</small>
                <Button onClick={() => handleViewParticipants(ev._id)}>
                  {openEventId === ev._id ? "Ẩn danh sách" : "Xem học sinh tham gia"}
                </Button>

                {openEventId === ev._id && (
                  <ul style={{ marginTop: "10px" }}>
                    {participantMap[ev._id]?.length > 0 ? (
                      participantMap[ev._id].map(child => (
                        <li key={child._id}>👧 {child.fullName} ({child.classId?.grade || "Chưa rõ lớp"})</li>
                      ))
                    ) : (
                      <li>Không có học sinh nào tham gia</li>
                    )}
                  </ul>
                )}
              </EventInfo>
              <DeleteButton onClick={() => handleDelete(ev._id)}>Xoá</DeleteButton>
            </EventItem>
          ))}
        </EventList>
      </Content>
    </Container>
  );
};

export default AdminEventManager;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  EventContainer,
  EventContent,
  EventCard,
  EventImage,
  EventDetails,
  EventTitle,
  EventDate,
  EventDescription,
  Button,
} from "../../styles/EventStyles";

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState([]);
  const [childId, setChildId] = useState(null);
  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    fetchEvents();
    fetchChildIdAndRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/event");
      setEvents(res.data.events);
    } catch (err) {
      console.error("Lỗi khi lấy sự kiện:", err);
    }
  };

  const fetchChildIdAndRegistrations = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/studentaccount/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const _childId = res.data.child._id;
      setChildId(_childId);

      const registered = await axios.get(
        `http://localhost:4000/api/v1/event/registered?childId=${_childId}`
      );
      setRegisteredEventIds(registered.data.eventIds || []);
    } catch (err) {
      console.error("Lỗi khi lấy sự kiện đã đăng ký:", err);
    }
  };

  const handleParticipate = async (eventId) => {
    try {
      if (!childId) {
        alert("Không có thông tin bé, vui lòng đăng nhập lại.");
        return;
      }

      await axios.post(
        `http://localhost:4000/api/v1/event/${eventId}/participate`,
        { childId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchChildIdAndRegistrations();
    } catch (err) {
      alert("Đã xảy ra lỗi khi tham gia sự kiện!");
    }
  };

  // Sửa lại đoạn này:
  const handleCancel = async (eventId) => {
    try {
      if (!childId) {
        alert("Không có thông tin bé, vui lòng đăng nhập lại.");
        return;
      }

      await axios.post(
        `http://localhost:4000/api/v1/event/${eventId}/toggle`,
        { childId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchChildIdAndRegistrations();
    } catch (err) {
      alert("Huỷ sự kiện thất bại!");
    }
  };

  const registeredEvents = events.filter((ev) =>
    registeredEventIds.includes(ev._id)
  );

  return (
    <EventContainer>
      <Sidebar />
      <EventContent>
        <h2>Tất cả sự kiện</h2>
        {events.map((event) => {
          const isRegistered = registeredEventIds.includes(event._id);
          return (
            <EventCard key={event._id}>
              {event.image && (
                <EventImage
                  src={`http://localhost:4000/uploads/${event.image}`}
                  alt={event.title}
                />
              )}
              <EventDetails>
                <EventTitle>{event.title}</EventTitle>
                {event.classIds?.length > 0 && (
                  <p>
                    📘 Áp dụng cho: {event.classIds.map((cls) => cls.grade).join(", ")}
                  </p>
                )}
                <EventDate>
                  📅 {new Date(event.date).toLocaleDateString()} – {event.type === "sukien" ? "Sự kiện" : "Hoạt động"}
                </EventDate>
                <EventDescription>{event.description}</EventDescription>
                <p>
                  💰 {event.fee > 0 ? `${event.fee.toLocaleString()} VNĐ` : "Miễn phí"}
                </p>
                {event.detailLink && (
                  <p>
                    🔗 <a href={event.detailLink} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "underline" }}>Xem mô tả chi tiết</a>
                  </p>
                )}
                {!isRegistered ? (
                  <Button onClick={() => handleParticipate(event._id)}>
                    Tham gia
                  </Button>
                ) : (
                  <Button onClick={() => handleCancel(event._id)}>
                    Huỷ đăng ký
                  </Button>
                )}
              </EventDetails>
            </EventCard>
          );
        })}

        {registeredEvents.length > 0 && (
          <>
            <h2 style={{ marginTop: "40px" }}>Sự kiện đã đăng ký</h2>
            {registeredEvents.map((event) => (
              <EventCard key={event._id}>
                {event.image && (
                  <EventImage
                    src={`http://localhost:4000/uploads/${event.image}`}
                    alt={event.title}
                  />
                )}
                <EventDetails>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDate>
                    📅 {new Date(event.date).toLocaleDateString()}
                  </EventDate>
                  <EventDescription>{event.description}</EventDescription>
                  <Button onClick={() => handleCancel(event._id)}>
                    Huỷ đăng ký
                  </Button>
                </EventDetails>
              </EventCard>
            ))}
          </>
        )}
      </EventContent>
    </EventContainer>
  );
};

export default StudentEvents;

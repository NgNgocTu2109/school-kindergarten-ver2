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
} from "../../styles/EventStyles";

const TeacherEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/event");
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Lỗi khi lấy sự kiện:", err);
    }
  };

  return (
    <EventContainer>
      <Sidebar />
      <EventContent>
        <h2>Sự kiện & Hoạt động</h2>
        {events.map((event) => (
          <EventCard key={event._id}>
            {event.image && (
              <EventImage
                src={`http://localhost:4000/uploads/${event.image}`}
                alt={event.title}
              />
            )}
            <EventDetails>
              <EventTitle>{event.title}</EventTitle>

              {/* 👉 Thêm thông tin lớp áp dụng */}
              {event.classIds && event.classIds.length > 0 && (
                <p>
                  📘 Áp dụng cho:{" "}
                  {event.classIds.map((cls) => cls.grade).join(", ")}
                </p>
              )}

              <EventDate>
                📅 {new Date(event.date).toLocaleDateString()} – {event.type}
              </EventDate>
              <EventDescription>{event.description}</EventDescription>
            </EventDetails>
          </EventCard>
        ))}
      </EventContent>
    </EventContainer>
  );
};

export default TeacherEvents;

// src/pages/Teachers/TeacherServiceUsage.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  ServiceContainer,
  Content,
  ServiceContent,
  ServiceHeader,
  ServiceForm,
  ServiceSelect,
} from "../../styles/ServiceStyles";

const TeacherServiceUsage = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [services, setServices] = useState([]);
  const [usageFormOpen, setUsageFormOpen] = useState(null);
  const [formData, setFormData] = useState({
    note: "",
    image: null,
    sessionCount: 1, // 🆕 Số buổi mặc định là 1
  });

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchAllServices();
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/children");
      setChildren(res.data.children);
    } catch (err) {
      console.error("Lỗi lấy danh sách bé:", err);
    }
  };

  const fetchAllServices = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/services");
      setServices(res.data.services);
    } catch (err) {
      console.error("Lỗi lấy tất cả dịch vụ:", err);
    }
  };

  const handleSubmitUsage = async (serviceId) => {
    if (!selectedChild) {
      alert("Vui lòng chọn bé.");
      return;
    }

    try {
      const form = new FormData();
      form.append("childId", selectedChild);
      form.append("note", formData.note);
      form.append("date", new Date().toISOString());
      form.append("sessionCount", formData.sessionCount); // 🆕 Thêm số buổi
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.post(`http://localhost:4000/api/v1/services/${serviceId}/usage-teacher`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Đã ghi nhận!");
      setUsageFormOpen(null);
      setFormData({ note: "", image: null, sessionCount: 1 }); // reset
      fetchAllServices();
    } catch (err) {
      console.error("Lỗi ghi nhận:", err?.response?.data || err.message);
      alert("Không thể ghi nhận! Kiểm tra lại dữ liệu.");
    }
  };

  return (
    <ServiceContainer>
      <Sidebar />
      <Content>
        <ServiceContent>
          <ServiceHeader>Ghi nhận sử dụng dịch vụ</ServiceHeader>

          <ServiceForm>
            <ServiceSelect value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
              <option value="">-- Chọn bé --</option>
              {children.map(child => (
                <option key={child._id} value={child._id}>{child.fullName}</option>
              ))}
            </ServiceSelect>
          </ServiceForm>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
            {services.map(service => {
              const hasUsed = service.usageRecords?.some(
                (u) => u.childId === selectedChild
              );

              return (
                <div
                  key={service._id}
                  style={{
                    width: "260px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    padding: "15px",
                    backgroundColor: "#fff"
                  }}
                >
                  {service.image && (
                    <img
                      src={`http://localhost:4000/uploads/${service.image}`}
                      alt={service.name}
                      style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                  <h3>{service.name}</h3>

                  {hasUsed ? (
                    <button disabled style={{ backgroundColor: "#6c757d", color: "#fff" }}>Đã tham gia</button>
                  ) : (
                    <>
                      <button onClick={() => setUsageFormOpen(usageFormOpen === service._id ? null : service._id)}>
                        {usageFormOpen === service._id ? "Huỷ" : "Chưa tham gia"}
                      </button>

                      {usageFormOpen === service._id && (
                        <div style={{ marginTop: "10px" }}>
                          <input
                            type="file"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                          />
                          <textarea
                            placeholder="Ghi chú"
                            value={formData.note}
                            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                            style={{ width: "100%", marginTop: "6px" }}
                          />
                          <input
                            type="number"
                            min="1"
                            placeholder="Số buổi"
                            value={formData.sessionCount}
                            onChange={(e) => setFormData({ ...formData, sessionCount: e.target.value })}
                            style={{ width: "100%", marginTop: "6px" }}
                          />
                          <button
                            style={{
                              marginTop: "8px",
                              backgroundColor: "#28a745",
                              color: "#fff",
                              border: "none",
                              padding: "6px 12px"
                            }}
                            onClick={() => handleSubmitUsage(service._id)}
                          >
                            Gửi ghi nhận
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </ServiceContent>
      </Content>
    </ServiceContainer>
  );
};

export default TeacherServiceUsage;

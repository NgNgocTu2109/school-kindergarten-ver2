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
  ServiceButton,
} from "../../styles/ServiceStyles";

const StudentRegisterService = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [usageHistory, setUsageHistory] = useState([]);

  useEffect(() => {
    fetchChildren();
    fetchServices();
  }, []);

  const fetchChildren = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/children");
      setChildren(res.data.children);
    } catch (err) {
      console.error("Lỗi lấy danh sách bé:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/services");
      setServices(res.data.services);
    } catch (err) {
      console.error("Lỗi lấy dịch vụ:", err);
    }
  };

  const fetchRegistered = async (childId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/registrations?childId=${childId}`);
      setRegistered(res.data.registrations);
    } catch (err) {
      console.error("Lỗi lấy dịch vụ đã đăng ký:", err);
    }
  };

  const fetchUsageHistory = async (childId) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/services/usage/${childId}`);
      setUsageHistory(res.data.services);
    } catch (err) {
      console.error("Lỗi lấy lịch sử sử dụng:", err);
    }
  };

  const handleRegister = async () => {
    try {
      for (const serviceId of selectedServices) {
        await axios.post("http://localhost:4000/api/v1/registrations", {
          childId: selectedChild,
          serviceId,
        });
      }
      alert("Đăng ký thành công!");
      fetchRegistered(selectedChild);
    } catch (err) {
      console.error("Lỗi đăng ký:", err);
    }
  };

  const handleChildChange = (e) => {
    const id = e.target.value;
    setSelectedChild(id);
    setSelectedServices([]);
    fetchRegistered(id);
    fetchUsageHistory(id);
  };

  const toggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const handleDeleteRegistration = async (id) => {
    if (!window.confirm("Bạn có chắc muốn huỷ dịch vụ này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/registrations/${id}`);
      fetchRegistered(selectedChild);
    } catch (err) {
      console.error("Lỗi huỷ đăng ký:", err);
    }
  };

  return (
    <ServiceContainer>
      <Sidebar />
      <Content>
        <ServiceContent>
          <ServiceHeader>Đăng ký Dịch vụ</ServiceHeader>

          <ServiceForm>
            <ServiceSelect value={selectedChild} onChange={handleChildChange}>
              <option value="">-- Chọn bé --</option>
              {children.map(child => (
                <option key={child._id} value={child._id}>{child.fullName}</option>
              ))}
            </ServiceSelect>

            <ServiceButton type="button" onClick={handleRegister}>
              Đăng ký
            </ServiceButton>
          </ServiceForm>

          {/* Dịch vụ dạng card */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
            {services.map(service => (
              <div
                key={service._id}
                style={{
                  width: "260px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
                <h3 style={{ margin: "12px 0 6px 0" }}>{service.name}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>{service.description}</p>
                <strong>{service.price}đ / {service.type}</strong>
                <div style={{ marginTop: "10px" }}>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service._id)}
                      onChange={() => toggleService(service._id)}
                    /> Đăng ký
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Dịch vụ đã đăng ký */}
          {registered.length > 0 && (
            <>
              <h4 style={{ marginTop: 30 }}>Đã đăng ký:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                {registered.map(item => (
                  <div
                    key={item._id}
                    style={{
                      width: "260px",
                      padding: "15px",
                      background: "#f0f8ff",
                      border: "1px solid #bbb",
                      borderRadius: "10px"
                    }}
                  >
                    {item.serviceId?.image && (
                      <img
                        src={`http://localhost:4000/uploads/${item.serviceId.image}`}
                        alt={item.serviceId?.name}
                        style={{ width: "100%", height: "130px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    )}
                    <h4>{item.serviceId?.name}</h4>
                    <p>{item.serviceId?.description}</p>
                    <p>{item.serviceId?.price}đ / {item.serviceId?.type}</p>
                    <p style={{ fontSize: "12px", color: "#888" }}>
                      Ngày đăng ký: {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                    <button
                      onClick={() => handleDeleteRegistration(item._id)}
                      style={{ marginTop: 10, color: "red" }}
                    >
                      Huỷ
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Lịch sử sử dụng */}
          {usageHistory.length > 0 && (
            <>
              <h4 style={{ marginTop: 40 }}>Lịch sử sử dụng:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
                {usageHistory.map(service => (
                  service.usageRecords.map((usage, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "250px",
                        background: "#fff3e6",
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "12px"
                      }}
                    >
                      <h4>{service.name}</h4>
                      {usage.image && (
                        <img
                          src={`http://localhost:4000/uploads/${usage.image}`}
                          alt="ảnh ghi nhận"
                          style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                        />
                      )}
                      <p><strong>Ngày:</strong> {new Date(usage.date).toLocaleDateString("vi-VN")}</p>
                      <p style={{ fontSize: "14px", color: "#444" }}>{usage.note}</p>
                    </div>
                  ))
                ))}
              </div>
            </>
          )}
        </ServiceContent>
      </Content>
    </ServiceContainer>
  );
};

export default StudentRegisterService;

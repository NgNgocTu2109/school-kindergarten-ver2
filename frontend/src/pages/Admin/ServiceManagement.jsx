import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  ServiceContainer,
  Content,
  ServiceContent,
  ServiceHeader,
  ServiceForm,
  ServiceInput,
  ServiceButton,
} from "../../styles/ServiceStyles";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    type: "Buổi",
    description: "",
    videoUrl: "",
    sessionCount: "",
    sessionDuration: "",
    fromTime: "",
    toTime: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/services");
      setServices(res.data.services);
    } catch (err) {
      console.error("Lỗi lấy dịch vụ:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewService({ ...newService, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newService).forEach(([key, value]) => {
      if (key === "image" && value) {
        formData.append("image", value);
      } else if (key !== "image") {
        formData.append(key, value);
      }
    });

    try {
      if (editingId) {
        await axios.put(`http://localhost:4000/api/v1/services/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:4000/api/v1/services", formData);
      }
      setNewService({
        name: "",
        price: "",
        type: "Buổi",
        description: "",
        videoUrl: "",
        sessionCount: "",
        sessionDuration: "",
        fromTime: "",
        toTime: "",
        image: null,
      });
      fetchServices();
    } catch (err) {
      console.error("Lỗi gửi dữ liệu:", err);
    }
  };

  const handleEdit = (service) => {
    setNewService({
      name: service.name,
      price: service.price,
      type: service.type,
      description: service.description || "",
      videoUrl: service.videoUrl || "",
      sessionCount: service.sessionCount || "",
      sessionDuration: service.sessionDuration || "",
      fromTime: service.fromTime || "",
      toTime: service.toTime || "",
      image: null,
    });
    setEditingId(service._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá dịch vụ này?")) return;
    try {
      await axios.delete(`http://localhost:4000/api/v1/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error("Lỗi xoá:", err);
    }
  };

  return (
    <ServiceContainer>
      <Sidebar />
      <Content>
        <ServiceContent>
          <ServiceHeader>Quản lý Dịch vụ</ServiceHeader>

          <ServiceForm onSubmit={handleSubmit} encType="multipart/form-data">
            <ServiceInput type="text" placeholder="Tên dịch vụ" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
            <ServiceInput type="number" placeholder="Giá tiền" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
            <select value={newService.type} onChange={(e) => setNewService({ ...newService, type: e.target.value })} style={{ padding: "10px" }}>
              <option value="Buổi">Buổi</option>
              <option value="Tháng">Tháng</option>
            </select>
            <ServiceInput type="text" placeholder="Link video mô tả (nếu có)" value={newService.videoUrl} onChange={(e) => setNewService({ ...newService, videoUrl: e.target.value })} />
            <ServiceInput type="number" placeholder="Số buổi học" value={newService.sessionCount} onChange={(e) => setNewService({ ...newService, sessionCount: e.target.value })} />
            <ServiceInput type="text" placeholder="Thời lượng 1 buổi (VD: 45 phút)" value={newService.sessionDuration} onChange={(e) => setNewService({ ...newService, sessionDuration: e.target.value })} />
            <ServiceInput type="text" placeholder="Từ mấy giờ (VD: 08:00)" value={newService.fromTime} onChange={(e) => setNewService({ ...newService, fromTime: e.target.value })} />
            <ServiceInput type="text" placeholder="Đến mấy giờ (VD: 09:30)" value={newService.toTime} onChange={(e) => setNewService({ ...newService, toTime: e.target.value })} />
            <ServiceInput type="file" onChange={handleImageChange} />
            <textarea placeholder="Mô tả dịch vụ" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} style={{ padding: "10px", width: "100%", marginTop: "10px" }}></textarea>
            <ServiceButton type="submit">{editingId ? "Cập nhật" : "Thêm dịch vụ"}</ServiceButton>
          </ServiceForm>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "30px" }}>
            {services.map((service) => (
              <div key={service._id} style={{ width: "250px", border: "1px solid #ccc", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                {service.image && (
                  <img src={`http://localhost:4000/uploads/${service.image}`} alt={service.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
                )}
                <h3 style={{ margin: "12px 0 6px 0" }}>{service.name}</h3>
                <p style={{ fontSize: "14px", color: "#555" }}>{service.description}</p>
                {service.videoUrl && <p style={{ fontSize: "13px", color: "blue" }}><a href={service.videoUrl} target="_blank" rel="noreferrer">Xem video</a></p>}
                {service.sessionCount && <p><strong>Số buổi:</strong> {service.sessionCount}</p>}
                {service.sessionDuration && <p><strong>Thời lượng:</strong> {service.sessionDuration}</p>}
                {service.fromTime && service.toTime && <p><strong>Thời gian:</strong> {service.fromTime} - {service.toTime}</p>}
                <strong>{service.price} đ / {service.type}</strong>
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => handleEdit(service)}>Sửa</button>
                  <button onClick={() => handleDelete(service._id)} style={{ marginLeft: "10px", color: "red" }}>Xoá</button>
                </div>
              </div>
            ))}
          </div>
        </ServiceContent>
      </Content>
    </ServiceContainer>
  );
};

export default ServiceManagement;

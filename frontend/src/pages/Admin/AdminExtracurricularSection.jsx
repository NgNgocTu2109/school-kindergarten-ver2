import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ExtracurricularContainer,
  SidebarContainer,
  Content,
  ExtracurricularHeader,
  ActivityList,
  ActivityItem,
  ActivityTitle,
  ActivityDescription,
  DeleteButton,
  FormContainer,
  Input,
  AddButton,
} from "../../styles/AdminExtracurricularStyles";

const AdminExtracurricularSection = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/extracurriculars/getall");
      console.log("📥 Fetched activities:", response.data.activities);
      setActivities(response.data.activities);
    } catch (error) {
      console.error("❌ Lỗi khi tải hoạt động:", error);
      toast.error("Không thể tải danh sách hoạt động.");
    }
  };

  const handleChange = (e) => {
    setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem("adminId");
    console.log("🔑 Admin ID:", adminId);
  
    if (!adminId) {
      toast.error("Không tìm thấy Admin ID. Hãy đăng nhập lại.");
      return;
    }
  
    console.log("📝 New activity data:", newActivity);
  
    if (newActivity.name && newActivity.description && newActivity.date && newActivity.location) {
      try {
        const formattedDate = new Date(newActivity.date).toISOString();
        const activityData = {
          ...newActivity,
          date: formattedDate,
          createdBy: adminId,
        };
  
        console.log("🚀 Sending data to backend:", activityData);
  
        const response = await axios.post("http://localhost:4000/api/v1/extracurriculars", activityData);
        console.log("✅ Backend response:", response.data);
  
        if (response.data.success) {
          toast.success("Hoạt động đã được thêm thành công");
          await fetchActivities();
          setNewActivity({ name: "", description: "", date: "", location: "" });
        } else {
          toast.error("Có lỗi xảy ra!");
        }
      } catch (error) {
        console.error("❌ Lỗi khi thêm hoạt động:", error);
        toast.error("Lỗi khi thêm hoạt động.");
      }
    } else {
      console.warn("⚠️ Thiếu dữ liệu, không gửi lên backend");
      toast.warn("Vui lòng nhập đầy đủ thông tin hoạt động.");
    }
  };
  

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/extracurriculars/${id}`);
      toast.success("Đã xóa hoạt động thành công");
      await fetchActivities();
    } catch (error) {
      console.error("❌ Lỗi khi xóa hoạt động:", error);
      toast.error("Lỗi khi xóa hoạt động.");
    }
  };

  return (
    <ExtracurricularContainer>
      <ToastContainer />
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ExtracurricularHeader>Quản lý Hoạt động Ngoại khóa</ExtracurricularHeader>
        <FormContainer as="form" onSubmit={handleAddActivity}>
          <Input
            type="text"
            name="name"
            placeholder="Tên hoạt động"
            value={newActivity.name}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="description"
            placeholder="Mô tả hoạt động"
            value={newActivity.description}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="date"
            value={newActivity.date}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="location"
            placeholder="Địa điểm"
            value={newActivity.location}
            onChange={handleChange}
          />
          <AddButton type="submit">Thêm hoạt động</AddButton>
        </FormContainer>
        <ActivityList>
          {activities.map((activity) => (
            <ActivityItem key={activity._id}>
              <ActivityTitle>{activity.name}</ActivityTitle>
              <ActivityDescription>{activity.description}</ActivityDescription>
              <p><strong>Ngày:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              <p><strong>Địa điểm:</strong> {activity.location}</p>
              <DeleteButton onClick={() => handleDeleteActivity(activity._id)}>Xóa</DeleteButton>
            </ActivityItem>
          ))}
        </ActivityList>
      </Content>
    </ExtracurricularContainer>
  );
};

export default AdminExtracurricularSection;

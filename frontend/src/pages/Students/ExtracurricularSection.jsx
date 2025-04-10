import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  ExtracurricularContainer,
  SidebarContainer,
  Content,
  ExtracurricularHeader,
  ActivityList,
  ActivityItem,
  ActivityTitle,
  ActivityDescription,
  JoinButton,
} from "../../styles/ExtracurricularStyles";

const ExtracurricularSection = () => {
  const [activities, setActivities] = useState([]);
  const [joinedActivities, setJoinedActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/extracurriculars/getall");
      setActivities(response.data.activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const handleJoinActivity = async (id) => {
    try {
      await axios.post("http://localhost:4000/api/v1/extracurriculars/join", { activityId: id });
      setJoinedActivities([...joinedActivities, id]);
      alert("Bạn đã tham gia thành công!");
    } catch (error) {
      console.error("Error joining activity:", error);
      alert("Đã xảy ra lỗi khi tham gia hoạt động.");
    }
  };

  return (
    <ExtracurricularContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ExtracurricularHeader>Hoạt động Ngoại khóa</ExtracurricularHeader>
        <ActivityList>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <ActivityTitle>{activity.name}</ActivityTitle>
                <ActivityDescription>{activity.description}</ActivityDescription>
                {joinedActivities.includes(activity.id) ? (
                  <p>Đã tham gia</p>
                ) : (
                  <JoinButton onClick={() => handleJoinActivity(activity.id)}>Tham gia</JoinButton>
                )}
              </ActivityItem>
            ))
          ) : (
            <p>Hiện chưa có hoạt động nào.</p>
          )}
        </ActivityList>
      </Content>
    </ExtracurricularContainer>
  );
};

export default ExtracurricularSection;
  
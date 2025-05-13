import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  MenuContainer,
  MenuContent,
  MenuFormWrapper,
  MenuHeader,
  MenuForm,
  MenuSelect,
  MenuInput,
  MenuButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuRow,
  MenuLabel
} from "../../styles/MenuStyles";

const AdminMenu = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [breakfastName, setBreakfastName] = useState("");
  const [breakfastImage, setBreakfastImage] = useState("");
  const [lunchName, setLunchName] = useState("");
  const [lunchImage, setLunchImage] = useState("");
  const [savedMenu, setSavedMenu] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/class/getall");
      setClasses(res.data.classes);
    } catch (err) {
      console.error("Lỗi lấy danh sách lớp:", err);
    }
  };

  const fetchMenu = async () => {
    if (!selectedClass || !date) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/menus?classId=${selectedClass}&date=${date}`);
      const menu = res.data.menu;
      if (menu) {
        setBreakfastName(menu.breakfast?.name || "");
        setBreakfastImage(menu.breakfast?.imageUrl || "");
        setLunchName(menu.lunch?.name || "");
        setLunchImage(menu.lunch?.imageUrl || "");
        setSavedMenu(menu);
      } else {
        setBreakfastName("");
        setBreakfastImage("");
        setLunchName("");
        setLunchImage("");
        setSavedMenu(null);
      }
    } catch (err) {
      console.error("Lỗi lấy thực đơn:", err);
    }
  };

  useEffect(() => {
    if (selectedClass && date) fetchMenu();
  }, [selectedClass, date]);

  const handleUploadImage = async (e, setImageUrl) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post("http://localhost:4000/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Lỗi upload ảnh:", err);
      alert("Upload thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClass || !date || !breakfastName || !breakfastImage || !lunchName || !lunchImage) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/v1/menus", {
        classId: selectedClass,
        date: new Date(date).toISOString(),
        breakfast: { name: breakfastName, imageUrl: breakfastImage },
        lunch: { name: lunchName, imageUrl: lunchImage },
      });
      alert("Lưu thực đơn thành công!");
      fetchMenu();
    } catch (err) {
      console.error("Lỗi lưu thực đơn:", err);
    }
  };

  return (
    <MenuContainer>
      <Sidebar />
      <MenuContent>
        <MenuFormWrapper>
          <MenuHeader>Quản lý Thực đơn</MenuHeader>
          <MenuForm onSubmit={handleSubmit}>
            <MenuRow>
              <MenuSelect value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">-- Chọn lớp --</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>{cls.grade}</option>
                ))}
              </MenuSelect>
              <MenuInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </MenuRow>

            <MenuRow>
              <MenuLabel>Bữa sáng:</MenuLabel>
              <MenuInput type="text" placeholder="Tên món sáng" value={breakfastName} onChange={(e) => setBreakfastName(e.target.value)} />
              <input type="file" onChange={(e) => handleUploadImage(e, setBreakfastImage)} />
              {breakfastImage && <img src={breakfastImage} alt="Bữa sáng" width="80" />}
            </MenuRow>

            <MenuRow>
              <MenuLabel>Bữa trưa:</MenuLabel>
              <MenuInput type="text" placeholder="Tên món trưa" value={lunchName} onChange={(e) => setLunchName(e.target.value)} />
              <input type="file" onChange={(e) => handleUploadImage(e, setLunchImage)} />
              {lunchImage && <img src={lunchImage} alt="Bữa trưa" width="80" />}
            </MenuRow>

            <MenuButton type="submit">Lưu thực đơn</MenuButton>
          </MenuForm>

          {savedMenu && (
            <>
              <h4>Thực đơn đã lưu:</h4>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Ngày</TableCell>
                    <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Bữa sáng</TableCell>
                    <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>Bữa trưa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                      {new Date(savedMenu.date).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <img src={savedMenu.breakfast.imageUrl} alt={savedMenu.breakfast.name} style={{ width: "130px", borderRadius: "8px" }} />
                      <div style={{ fontSize: "17px", fontWeight: "bold", marginTop: "6px" }}>{savedMenu.breakfast.name}</div>
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      <img src={savedMenu.lunch.imageUrl} alt={savedMenu.lunch.name} style={{ width: "130px", borderRadius: "8px" }} />
                      <div style={{ fontSize: "17px", fontWeight: "bold", marginTop: "6px" }}>{savedMenu.lunch.name}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </MenuFormWrapper>
      </MenuContent>
    </MenuContainer>
  );
};

export default AdminMenu;

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  MenuContainer,
  MenuContent,
  MenuFormWrapper,
  MenuHeader,
  MenuForm,
  MenuInput,
  MenuButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuRow,
  MenuLabel,
  MenuSelect
} from "../../styles/MenuStyles";

const AdminMenu = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [historyClassId, setHistoryClassId] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [breakfastName, setBreakfastName] = useState("");
  const [breakfastImage, setBreakfastImage] = useState("");
  const [lunchName, setLunchName] = useState("");
  const [lunchImage, setLunchImage] = useState("");
  const [savedMenu, setSavedMenu] = useState(null);
  const [menuHistory, setMenuHistory] = useState([]);

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
    if (selectedClass.length === 0 || !date) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/menus?classId=${selectedClass[0]}&date=${date}`);
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

  const fetchMenuHistory = async () => {
    if (!historyClassId) return;
    try {
      const res = await axios.get(`http://localhost:4000/api/v1/menus/history?classId=${historyClassId}`);
      setMenuHistory(res.data.menus || []);
    } catch (err) {
      console.error("Lỗi lấy lịch sử thực đơn:", err);
    }
  };

  useEffect(() => {
    if (selectedClass.length > 0 && date) {
      fetchMenu();
    }
  }, [selectedClass, date]);

  useEffect(() => {
    if (historyClassId) {
      fetchMenuHistory();
    }
  }, [historyClassId]);

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
    if (selectedClass.length === 0 || !date || !breakfastName || !breakfastImage || !lunchName || !lunchImage) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      await axios.post("http://localhost:4000/api/v1/menus", {
        classIds: selectedClass,
        date: new Date(date).toISOString(),
        breakfast: { name: breakfastName, imageUrl: breakfastImage },
        lunch: { name: lunchName, imageUrl: lunchImage },
      });
      alert("Lưu thực đơn thành công!");
      fetchMenu();
      fetchMenuHistory();
    } catch (err) {
      console.error("Lỗi lưu thực đơn:", err);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedClass([]);
    } else {
      setSelectedClass(classes.map(cls => cls._id));
    }
    setSelectAll(!selectAll);
  };

  return (
    <MenuContainer>
      <Sidebar />
      <MenuContent>
        <MenuFormWrapper>
          <MenuHeader>Quản lý Thực đơn</MenuHeader>
          <MenuForm onSubmit={handleSubmit}>
            <MenuRow>
              <MenuLabel>Chọn lớp:</MenuLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                <label style={{ fontWeight: "bold" }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  /> Chọn tất cả
                </label>
                {classes.map((cls) => (
                  <label key={cls._id}>
                    <input
                      type="checkbox"
                      value={cls._id}
                      checked={selectedClass.includes(cls._id)}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedClass(prev =>
                          prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
                        );
                      }}
                    />
                    {cls.grade}
                  </label>
                ))}
              </div>
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

          {/* Lịch sử thực đơn */}
          <h4 style={{ marginTop: "40px" }}>Lịch sử thực đơn theo lớp:</h4>
          <MenuSelect value={historyClassId} onChange={(e) => setHistoryClassId(e.target.value)}>
            <option value="">-- Chọn lớp để xem lịch sử --</option>
            {classes.map(cls => (
              <option key={cls._id} value={cls._id}>{cls.grade}</option>
            ))}
          </MenuSelect>

          {menuHistory.length > 0 && (
            <Table style={{ marginTop: "20px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Bữa sáng</TableCell>
                  <TableCell>Bữa trưa</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontWeight: "bold" }}>{new Date(item.date).toLocaleDateString("vi-VN")}</TableCell>
                    <TableCell>
                      <img src={item.breakfast.imageUrl} alt={item.breakfast.name} style={{ width: "100px", borderRadius: "6px" }} /><br />
                      <span style={{ fontWeight: "bold" }}>{item.breakfast.name}</span>
                    </TableCell>
                    <TableCell>
                      <img src={item.lunch.imageUrl} alt={item.lunch.name} style={{ width: "100px", borderRadius: "6px" }} /><br />
                      <span style={{ fontWeight: "bold" }}>{item.lunch.name}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </MenuFormWrapper>
      </MenuContent>
    </MenuContainer>
  );
};

export default AdminMenu;

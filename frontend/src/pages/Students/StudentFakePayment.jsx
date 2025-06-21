import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Giao diện styled-components
const Container = styled.div`
  padding: 32px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #f4f6f8;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
`;

const MethodCard = styled.div`
  background-color: white;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #2c3e50;
    background-color: #eaf0f6;
  }
`;

const QRImage = styled.img`
  display: block;
  max-width: 100%;
  margin: 20px auto;
  border-radius: 8px;
`;

const StudentPaymentMethod = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("studentToken");

  const [bill, setBill] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [receiptImage, setReceiptImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/bill/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data.bills.find((b) => b._id === billId);
        setBill(found);
      } catch (err) {
        console.error("Lỗi khi lấy hóa đơn:", err);
      }
    };
    fetchBill();
  }, [billId, token]);

  const handleSelectMethod = async (method) => {
    try {
      if (method === "qr") {
        setShowQR(true);
        return;
      }

      await axios.put(
        `http://localhost:4000/api/v1/bill/${billId}/mark-paid-by-student`,
        { paymentMethod: method },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Đã chọn thanh toán bằng: ${method === "cash" ? "Tiền mặt" : method}`);
      navigate("/student/bills");
    } catch (err) {
      console.error("Lỗi chọn phương thức:", err);
    }
  };

  const handleConfirmBank = async () => {
    try {
      const formData = new FormData();
      formData.append("paymentMethod", "qr");
      if (receiptImage) {
        formData.append("receiptImage", receiptImage);
      }

      await axios.put(
        `http://localhost:4000/api/v1/bill/${billId}/mark-paid-by-student`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Bạn đã gửi ảnh chuyển khoản. Chờ xác nhận từ nhà trường.");
      navigate("/student/bills");
    } catch (err) {
      console.error("Lỗi xác nhận chuyển khoản:", err);
    }
  };

  return (
    <Container>
      <Title>Chọn phương thức thanh toán</Title>
      {bill && (
        <>
          <p><strong>Tháng:</strong> {bill.month}</p>
          <p><strong>Tổng tiền:</strong> {bill.total.toLocaleString()} đ</p>

          {!showQR && (
            <>
              <MethodCard onClick={() => handleSelectMethod("cash")}>
                💵 Thanh toán tiền mặt tại trường
              </MethodCard>
              <MethodCard onClick={() => handleSelectMethod("qr")}> 
                🏦 Chuyển khoản ngân hàng (Hiện mã QR)
              </MethodCard>
            </>
          )}

          {showQR && (
            <>
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Quét mã QR để chuyển khoản học phí:
              </p>
              <QRImage
                src="https://img.vietqr.io/image/vietinbank-113366668888-compact.jpg"
                alt="QR chuyển khoản"
              />

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setReceiptImage(file);
                      setPreviewUrl(URL.createObjectURL(file));
                    }
                  }}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Ảnh minh chứng"
                    style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
                  />
                )}
              </div>

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <button
                  onClick={handleConfirmBank}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  ✅ Tôi đã chuyển khoản
                </button>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default StudentPaymentMethod;

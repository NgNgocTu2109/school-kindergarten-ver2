import { ServiceRegistration } from "../models/registrationSchema.js";

// Tạo đăng ký mới
export const createRegistration = async (req, res, next) => {
  const { childId, serviceId } = req.body;
  try {
    const registration = await ServiceRegistration.create({ childId, serviceId });
    res.status(201).json({ success: true, registration });
  } catch (err) {
    next(err);
  }
};

// Lấy danh sách đăng ký theo childId
export const getRegistrationsByChild = async (req, res, next) => {
  const { childId } = req.query;
  try {
    const registrations = await ServiceRegistration.find({ childId }).populate("serviceId");
    res.status(200).json({ success: true, registrations });
  } catch (err) {
    next(err);
  }
};

// Xoá đăng ký
export const deleteRegistration = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await ServiceRegistration.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Không tìm thấy đăng ký" });
    res.status(200).json({ success: true, message: "Đã huỷ đăng ký" });
  } catch (err) {
    next(err);
  }
};

// Cập nhật đăng ký
export const updateRegistration = async (req, res, next) => {
  const { id } = req.params;
  const { serviceId } = req.body;
  try {
    const updated = await ServiceRegistration.findByIdAndUpdate(id, { serviceId }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Không tìm thấy đăng ký" });
    res.status(200).json({ success: true, registration: updated });
  } catch (err) {
    next(err);
  }
};

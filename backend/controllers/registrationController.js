import { ServiceRegistration } from "../models/registrationSchema.js";

// ✅ Tạo đăng ký (dịch vụ hoặc sự kiện)
export const createRegistration = async (req, res, next) => {
  const { childId, serviceId, eventId } = req.body;

  if (!childId || (!serviceId && !eventId)) {
    return res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
  }

  try {
    const newRegistration = await ServiceRegistration.create({ childId, serviceId, eventId });
    res.status(201).json({ success: true, registration: newRegistration });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy đăng ký dịch vụ theo childId
export const getRegistrationsByChild = async (req, res, next) => {
  const { childId } = req.query;
  try {
    const registrations = await ServiceRegistration.find({ childId, serviceId: { $ne: null } }).populate("serviceId");
    res.status(200).json({ success: true, registrations });
  } catch (err) {
    next(err);
  }
};

// ✅ Lấy danh sách eventId mà học sinh đã tham gia
export const getRegisteredEventIdsByChild = async (req, res) => {
  const { childId } = req.query;
  if (!childId) {
    return res.status(400).json({ success: false, message: "Thiếu childId" });
  }

  try {
    const registrations = await ServiceRegistration.find({ childId, eventId: { $ne: null } });
    const eventIds = registrations.map(r => r.eventId?.toString()).filter(id => !!id);
    res.status(200).json({ success: true, eventIds });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Huỷ đăng ký sự kiện (dùng eventId + childId)
export const cancelEventRegistration = async (req, res) => {
  const { eventId } = req.body;
  const { childId } = req.query;

  if (!childId || !eventId) {
    return res.status(400).json({ success: false, message: "Thiếu eventId hoặc childId" });
  }

  try {
    const deleted = await ServiceRegistration.findOneAndDelete({ childId, eventId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Không tìm thấy đăng ký sự kiện" });
    }

    res.status(200).json({ success: true, message: "Đã huỷ đăng ký sự kiện" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Cập nhật đăng ký (chỉ cho dịch vụ)
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

// ✅ Xoá đăng ký (theo _id)
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

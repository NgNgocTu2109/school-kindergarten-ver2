import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  sessionCount: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });



export const ServiceRegistration = mongoose.model("ServiceRegistration", registrationSchema);



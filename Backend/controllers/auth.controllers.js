import nodemailer from "nodemailer";
import crypto from "crypto";

// Store OTPs temporarily (for demo; in production, use Redis or DB)
const otpStore = new Map();

export async function sendOTP(email) {
  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Save OTP with expiry (5 minutes)
  otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

  // Configure email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "prakashyadav9576@gmail.com", // Your Gmail
      pass: "lkwy gutl wvjr itbu", // Gmail App Password
    },
  });

  // Send email
  await transporter.sendMail({
    from: '"CityFix" <yourgmail@gmail.com>',
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  console.log(`OTP sent to ${email}: ${otp}`);
}

// Verify OTP
export function verifyOTP(email, enteredOtp) {
  const data = otpStore.get(email);
  if (!data) return false;
  if (Date.now() > data.expires) {
    otpStore.delete(email);
    return false; // Expired
  }
  if (data.otp === enteredOtp) {
    otpStore.delete(email);
    return true;
  }
  return false;
}

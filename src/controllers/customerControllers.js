import * as customerServices from "../services/customerServices.js";
import { generateJWT } from "../utils/jwt.js";
import dotenv from 'dotenv';

dotenv.config();

// REGISTER
const handleRegister = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    await customerServices.handleRegister(fullname, email, password);
    res.status(200).json({ success: true, message: "Tạo tài khoản thành công" });
  } catch (e) {
    next(e); 
  }
};

// LOGIN
const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const customer = await customerServices.handleLogin(email, password);
    const { maKH, hoTen, soDienThoai, diaChi, ngayTao, trangThai } = customer;

    const token = await generateJWT(maKH, hoTen, email);

    res.cookie("jwt", token, {
      secure: process.env.URL_FONTEND === "http://localhost:5173" ? false : true,
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 2, // 2 giờ
      sameSite: process.env.URL_FONTEND === "http://localhost:5173" ? "Lax" : "None",
    });

    res.status(200).json({
      success: true,
      message: 'Đăng nhập thành công',
      customer: { maKH, hoTen, email, soDienThoai, diaChi, ngayTao, trangThai }
    });
  } catch (e) {
    next(e); 
  }
};

export { handleRegister, handleLogin };

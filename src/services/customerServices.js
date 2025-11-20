import db from '../config/db.js';
import createError from '../utils/createError.js';
import bcrypt from 'bcrypt';

// REGISTER
const handleRegister = async (fullname, email, password) => {
    const [checkExist] = await db.query(
        `SELECT email FROM khachhang WHERE email = ?`,
        [email]
    );

    if (checkExist.length > 0) {
        throw createError(409, 'Email đã tồn tại');
    }

    const hash = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO khachhang (hoTen, email, matKhau) VALUES (?, ?, ?)`;
    await db.query(sql, [fullname, email, hash]);
};

// LOGIN
const handleLogin = async (email, password) => {
    const [customers] = await db.query(
        `SELECT * FROM khachhang WHERE email = ?`,
        [email]
    );

    if (customers.length === 0) {
        throw createError(404, 'Tài khoản không tồn tại');
    }

    const customer = customers[0];
    const isMatch = await bcrypt.compare(password, customer.matKhau);
    if (!isMatch) {
        throw createError(401, 'Mật khẩu sai');
    }

    return customer;
};

export { handleRegister, handleLogin };

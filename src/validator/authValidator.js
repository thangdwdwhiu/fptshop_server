import { body } from 'express-validator';

// Validator cho đăng ký
export const registerValidator = [
  body('fullname')
    .notEmpty().withMessage('Họ và tên không được để trống')
    .isLength({ min: 3 }).withMessage('Họ tên phải ít nhất 3 ký tự'),
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),
  body('password')
    .isLength({ min: 6 }).withMessage('Mật khẩu phải ít nhất 6 ký tự'),
];

// Validator cho đăng nhập
export const loginValidator = [
  body('email')
    .isEmail().withMessage('Email không hợp lệ'),
  body('password')
    .notEmpty().withMessage('Mật khẩu không được để trống'),
];

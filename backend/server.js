const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;

// Secret key
const SECRET_KEY = "my_secret_key";

// Cấu hình CORS
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ]
}));

// Đọc dữ liệu JSON
app.use(express.json());

// API ĐĂNG NHẬP
app.post("/login", (req, res) => {
    const { email, matKhau } = req.body;

    if (
        email === "admin@gmail.com" &&
        matKhau === "123456"
    ) {
        const token = jwt.sign(
            { email: email },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Dang nhap thanh cong",
            token: token
        });
    }

    return res.status(401).json({
        message: "Email hoac mat khau khong dung"
    });
});

// Import middleware xác thực
const { xacThuc } = require("./middleware");

// Danh sách sản phẩm ảo
const products = [
    { id: 1, ten: "But bi", gia: 5000 },
    { id: 2, ten: "Vo hoc sinh", gia: 10000 },
    { id: 3, ten: "Thuoc ke", gia: 7000 },
    { id: 4, ten: "Hop but", gia: 25000 }
];

// API LẤY DANH SÁCH SẢN PHẨM
app.get("/api/products", xacThuc, (req, res) => {
    res.status(200).json({
        message: "Lay danh sach san pham thanh cong",
        products: products
    });
});

// Chạy Server
app.listen(PORT, () => {
    console.log(`Server dang chay tai http://localhost:${PORT}`);
});

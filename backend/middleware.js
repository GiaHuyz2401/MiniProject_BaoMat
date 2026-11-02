const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_secret_key";

const xacThuc = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Ban chua dang nhap!"
        });
    }

    const parts = authHeader.split(" ");

    if (
        parts.length !== 2 ||
        parts[0] !== "Bearer" ||
        !parts[1]
    ) {
        return res.status(401).json({
            message: "Token khong hop le!"
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(403).json({
            message: "Token het han hoac khong hop le!"
        });
    }
};

// Xuất middleware
module.exports = { xacThuc };


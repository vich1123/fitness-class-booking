const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://fitness-class-booking.onrender.com",
            changeOrigin: true,
        })
    );
};

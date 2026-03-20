// app.js - Slightly improved version
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import creditRoutes from "./routes/credit.js";
import verificationRouter from "./routes/verification.js";
import loanRoutes from "./routes/loans.js";
import adminRoutes from "./routes/admin.js";


const app = express();
const allowedOrigins = [
    "https://credi-score-client.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    ...(process.env.CLIENT_URLS?.split(",").map((origin) => origin.trim()).filter(Boolean) || []),
];

const corsOptions = {
    origin(origin, callback) {
        // Allow tools like curl/Postman that do not send an Origin header.
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

// Mount auth routes
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/loans", loanRoutes);

app.use("/api/credit", creditRoutes);

app.use("/api/verification", verificationRouter);

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "CrediScore Backend is running!",
        status: "OK",
    });
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;

import express from "express";
import cors from "cors";
import ErrorHandler from "./Middleware/ErrorHandler.js";
import authRouter from "./Routes/AuthRouter.js";
import productRouter from "./Routes/ProductRouter.js";
import AuthorizationMiddleware from "./Middleware/AuthorizationMiddleware.js";
import RoleMiddleware from "./Middleware/RoleMiddleware.js";
import dotenv from "dotenv";
import preOrderRouter from "./Routes/PreOrderRouter.js";
import retailOrderRouter from "./Routes/RetailOrderRouter.js";
import partnershipRouter from "./Routes/PartnershipRouter.js";
import paymentRouter from "./Routes/PaymentRouter.js";
import cartRouter from "./Routes/CartRouter.js";
import cookieSession from "cookie-session";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import imageRouter from "./Routes/ImageRouter.js";

const app = express();
const port = 3000;
dotenv.config();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cookieSession({
    name: "netfish.session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Mengizinkan pengiriman cookie bersama permintaan
    optionsSuccessStatus: 200, // Untuk memastikan respons untuk preflight request tidak diblokir di beberapa browser
  })
);

// app.use(
//   cors({
//     origin: "*", // Mengizinkan semua origin (tidak disarankan untuk production)
//   })
// );

// app.options("*", cors()); // Menangani preflight requests untuk semua routes


app.get("/", (req, res) => {
  res.send("Welcome to Netfish API!");
});

app.use("/api", authRouter);
app.use(
  "/api/products",
  AuthorizationMiddleware.accessValidation,
  productRouter
);

app.use('/api/uploads', imageRouter);

app.use(
  "/api/pre-orders",
  AuthorizationMiddleware.accessValidation,
  RoleMiddleware.authorizeRole("CONSUMER"),
  preOrderRouter
);

app.use(
  "/api/retail-orders",
  AuthorizationMiddleware.accessValidation,
  RoleMiddleware.authorizeRole("CONSUMER"),
  retailOrderRouter
);

app.use(
  "/api/partnership",
  AuthorizationMiddleware.accessValidation,
  RoleMiddleware.authorizeRole("PARTNER"),
  partnershipRouter
);

app.use("/api/payments", paymentRouter);

app.use(
  "/api/users/cart",
  AuthorizationMiddleware.accessValidation,
  RoleMiddleware.authorizeRole("CONSUMER"),
  cartRouter
);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

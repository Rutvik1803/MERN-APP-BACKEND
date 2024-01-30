import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { registerController } from "./controllers/auth.controller.js";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";
import postRoutes from "./routes/postRouter.js";
import { createPostController } from "./controllers/post.controller.js";
import { verifyToken } from "./middleware/verifyUser.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILESORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }); //Anytime we want to upload a file we can use this

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), registerController);
app.post("/posts", verifyToken, upload.single("picture"), createPostController);

// OTHER ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6000;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log("App started on port " + PORT));
  })
  .catch((error) => console.log(error));

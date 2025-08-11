const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
const { testRoute, verifyLogin } = require("./controllers/test.controller");
const connectToDB = require("./models/db.connection");

// controllers
const {
  createUser,
  loginUser,
  logOutUser,
  myReportsDetails,
} = require("./controllers/user.controller");
const { reportIssue, findIssue } = require("./controllers/issue.controller");
const { loginAdmin } = require("./controllers/admin.controller");
const verifyToken = require("./middlewares/verify.token");

// middle wares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://final-project-virid-omega.vercel.app",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json()); //to parse json
const upload = multer({ dest: "uploads/" });

// connect to DB
const DB_URL = process.env.DB_URL;
connectToDB(DB_URL);

app.get("/", testRoute);
app.post("/", verifyToken, verifyLogin);

// user routes
app.post("/user/register", createUser);
app.post("/user/login", loginUser);
app.get("/user/logout", logOutUser);

// admin routes
app.get("/admin/login", loginAdmin);

// main action routes
app.post("/issue/report", upload.single("image"), reportIssue);
app.post("/issue/find", findIssue);
app.get("/user/myreports" , myReportsDetails)

const PORT = process.env.PORT;
app.listen(8080, () => {
  console.log(`server running at PORT ${8080}`);
});

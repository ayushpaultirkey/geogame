import express from "express";

import Data from "./controller/user/data.js";
import QList from "./controller/quiz/list.js";
import QImage from "./controller/quiz/image.js";
import PList from "./controller/post/list.js";
import Login from "./controller/user/login.js";
import Create from "./controller/post/create.js";
import Signup from "./controller/user/signup.js";
import Logout from "./controller/user/logout.js";

const router = express.Router();

router.use("/api/user/login", Login);
router.use("/api/user/signup", Signup);
router.use("/api/user/logout", Logout);
router.use("/api/user/data", Data);

router.use("/api/post/list", PList);
router.use("/api/post/create", Create);

router.use("/api/quiz/list", QList);
router.use("/api/quiz/image", QImage);
//router.use("/api/post/list?recent", Create);

export default router;
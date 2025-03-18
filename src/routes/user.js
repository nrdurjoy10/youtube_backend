import { Router } from "express";
import { registration } from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";


const router = Router()


router.route("/user").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),registration);




export default router;
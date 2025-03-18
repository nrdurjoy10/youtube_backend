import { Router } from "express";
import { upload } from "../controllers/video.js";


const router = Router()


router.route("/upload").post(upload);




export default router;
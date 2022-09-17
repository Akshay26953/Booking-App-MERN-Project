import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// import { createError } from "../utils/error.js";
const router = express.Router();

router.post("/",verifyAdmin, createHotel);
router.put("/:id",verifyAdmin, updateHotel);
router.delete("/:id",verifyAdmin, deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getAllHotels);
router.get("/countbycity", countByCity);
router.get("/countbytype", countByType);

export default router;
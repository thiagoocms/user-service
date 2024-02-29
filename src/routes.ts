import express,{ Router } from "express";
import UserController from "./controllers/UserController";
import UserServiceDefaultImpl from "./service/impl/UserServiceDefaultImpl";

const router: Router = express.Router()
const userControler = new UserController(new UserServiceDefaultImpl())

router.get("/api/v1/user", userControler.listAll.bind(userControler))
router.get("/api/v1/user/:id", userControler.findById.bind(userControler))
router.post("/api/v1/user", userControler.create.bind(userControler))
router.put("/api/v1/user/:id",userControler.update.bind(userControler))
router.delete("/api/v1/user/:id", userControler.delete.bind(userControler))



export default router;
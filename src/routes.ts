import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AutenticateUserController } from "./controllers/AutenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();

const createUserControler = new CreateUserController();
router.post("/users", createUserControler.handle );

const createTagControler = new CreateTagController();
router.post("/tags", ensureAdmin, createTagControler.handle );

const autenticateUserController = new AutenticateUserController();
router.post("/login", autenticateUserController.handle);

const createComplimentController = new CreateComplimentController();
router.post("/compliments", createComplimentController.handle);

export {router}
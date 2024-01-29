import { populateDBFakeUsers } from "../controller/populateDb.js";
import { Router } from "express";
const router = Router();
router.get("/", populateDBFakeUsers);
export default router;
//# sourceMappingURL=populateDB.js.map
const router = require("express").Router();
const userController = require("../controllers/user.controller");
const validateBody = require("../middlewares/validateBody");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/user.validator");

router.post(
  "/",
  validateBody(createUserSchema),
  userController.createUser
);

router.get("/", userController.getUsers);

router.put(
  "/:id",
  validateBody(updateUserSchema),
  userController.updateUser
);

router.delete("/:id", userController.deleteUser);

module.exports = router;

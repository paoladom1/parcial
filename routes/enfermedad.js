var express = require("express");
var router = express.Router();
var enfermedadController = require("../controllers/enfermedadController");

router.get("/:nombre", enfermedadController.getOne);
router.get("/", enfermedadController.getAll);
router.post("/", enfermedadController.createEnfermedad);
router.put("/:nombre", enfermedadController.update);
router.delete("/:nombre", enfermedadController.delete);

module.exports = router;

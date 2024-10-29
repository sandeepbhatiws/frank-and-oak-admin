const express = require("express")
const { insertSize, readSize, deleteSize, activeSize, updateSize, readSizebyid, deleteManySize, activeSizesAvailable } = require("../../../controller/controller")

const sizeroutes = express.Router()

sizeroutes.post("/insert-size",insertSize);
sizeroutes.get("/read-Size",readSize);
sizeroutes.delete("/delete-Size/:_id",deleteSize);
sizeroutes.put("/update-status/:_id",activeSize);
sizeroutes.get("/read-size-byid/:_id",readSizebyid);
sizeroutes.put("/update-size/:_id",updateSize);
sizeroutes.post("/delete-many",deleteManySize);
sizeroutes.get("/active-Size",activeSizesAvailable);

module.exports = sizeroutes;

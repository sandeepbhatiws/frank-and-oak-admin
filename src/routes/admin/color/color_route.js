const express = require('express');
const { 
    insertColor,
     readColors,
     deleteColor,
     updateStatusColor,
     multipledeleteColor,
     readColorById,
     updateColor,
     activeColor
 } = require('../../../controller/controller');

const colors = express.Router();

colors.post('/insert-color',insertColor);
colors.get('/read-color',readColors);
colors.delete('/delete-color/:_id',deleteColor);
colors.put('/update-color-status/:_id',updateStatusColor);
colors.post('/multi-delete-color',multipledeleteColor);
colors.get('/read-color-byId/:_id',readColorById);
colors.put('/update-color/:_id',updateColor);
colors.get('/active-colors',activeColor);

module.exports = colors;
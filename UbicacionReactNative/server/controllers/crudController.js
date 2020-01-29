const express = require('express');
const ubicModel = require('../models/ubicacionModel')
const routerApi = express.Router();

routerApi.route('/ubication')
  .post((req, res) => {
    let ubicaciones = new ubicModel(req.body)

    ubicaciones.save((err,resp) => {
      if(err){
        return res.json(err);
      }
      return res.send(true);
    })
  });


module.exports = routerApi;


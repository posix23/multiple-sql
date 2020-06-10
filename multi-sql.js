'use strict';

const express = require("express");
const app = express();
const multer = require("multer");
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(multer().none());

const Database = require("./lib/sql-object.js");
const config = require("./config.json");

// Initialize all databases in the config file
const db = [];
for (let i = 0; i < config.db.length; i++) {
  db[i] = new Database(config.db[i].host, config.db[i].port, config.db[i].user,
                       config.db[i].password, config.db[i].database);
}

app.post("/insert", async (req, res) => {
  if (req.body.name && req.body.age && req.body.gender && req.body.job) {
    let name = req.body.name, age = req.body.age, gender = req.body.gender, job = req.body.job;

    for (let i = 0; i < db.length; i++) {
      await db[i].insert("test_table", ["name", "age", "gender", "job"], [name, parseInt(age), gender,
                                                                    job]);
    }

    res.json({"response": "Success"});
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
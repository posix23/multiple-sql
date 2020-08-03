// Copyright (c) 2020 Toan Ly

'use strict';

const mysql = require("mysql2/promise");
let db = "";

module.exports = class Database {
  constructor(host, port, user, password, database) {
    db = mysql.createPool({
      host: process.env.DB_URL || host,
      port: process.env.DB_PORT || port,
      user: process.env.DB_USERNAME || user,
      password: process.env.DB_PASSWORD || password,
      database: process.env.DB_NAME || database
    });
  }

  async insert(tableName, columns, params) {
    let columnsString = "(", paramsString = "(";
    for (let i = 0; i < columns.length; i++) {
      if (i === columns.length - 1) {
        columnsString += columns[i] + ")";
        paramsString += "?)";
      } else {
        columnsString += columns[i] + ", ";
        paramsString += "?, ";
      }
    }

    let qry = "INSERT INTO " + tableName + columnsString + " VALUES " + paramsString;
    try {
      await db.query(qry, params);
    } catch (error) {
      console.log(error);
    }
  }
}

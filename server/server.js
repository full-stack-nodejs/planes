require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { body, param, validationResult } = require("express-validator");

const app = express();

app.use(cors());
app.use(express.json());

//create connection to database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// Get all
app.get("/api/v1/planes", (req, res) => {
  const getQuery = `SELECT id, from_town AS fromTown, airline, arrival_time AS arrivalTime, 
  is_late AS isLate FROM planes ORDER BY id DESC`;
  db.query(getQuery, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.status(200).send(results);
    }
  });
});

// Create
app.post(
  "/api/v1/planes",

  body("fromTown").notEmpty().isLength({ max: 64 }),
  body("airline").notEmpty().isLength({ max: 32 }),
  body("arrivalTime").isISO8601(),
  body("isLate").isIn(["0", "1"]),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const createQuery = `INSERT INTO planes (from_town, airline, arrival_time, is_late)
   values (?, ?, ?, ?)`;
    db.query(
      createQuery,
      [
        req.body.fromTown,
        req.body.airline,
        req.body.arrivalTime,
        req.body.isLate,
      ],
      (err, results) => {
        if (err) {
          throw err;
        } else {
          res.status(201).send(results);
        }
      }
    );
  }
);

//Delete
app.delete(
  "/api/v1/planes/:id",

  param("id").isNumeric(),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    db.query(
      "DELETE FROM planes WHERE id = ?",
      req.params.id,
      (err, results) => {
        if (err) {
          throw err;
        } else {
          res.status(204).send(results);
        }
      }
    );
  }
);

// Update
app.put(
  "/api/v1/planes/:id",

  body("fromTown").notEmpty().isLength({ max: 64 }),
  body("airline").notEmpty().isLength({ max: 32 }),
  body("arrivalTime").isISO8601(),
  body("isLate").isIn(["0", "1"]),
  param("id").isNumeric(),

  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateQuery =
      "UPDATE planes SET from_town = ?, airline = ?, arrival_time = ?, is_late = ? WHERE id = ?";
    db.query(
      updateQuery,
      [
        req.body.fromTown,
        req.body.airline,
        req.body.arrivalTime,
        req.body.isLate,
        req.params.id,
      ],
      (err, results) => {
        if (err) {
          throw err;
        } else {
          res.send(results);
        }
      }
    );
  }
);

const hostname = process.env.HOSTNAME || localhost;
const port = process.env.PORT || 3005;

app.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`);
});

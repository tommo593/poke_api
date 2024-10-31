const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// TODO: connect have caught sections correctly

// middleware
app.use(cors());
app.use(express.json());

// create a todo

app.post("/haveCaught", async (req, res) => {
    try {
      const { description } = req.body;
      const newHaveCaught = await pool.query(
        "INSERT INTO haveCaught (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newHaveCaught.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // get all todos
  
  app.get("/haveCaught", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM haveCaught");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // get a todo
  
  app.get("/haveCaught/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const haveCaught = await pool.query("SELECT * FROM haveCaught WHERE haveCaught_id = $1", [
        id,
      ]);
      res.json(haveCaught.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // update a todo
  
  app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query(
        "UPDATE haveCaught SET description = $1 WHERE haveCaught_id = $2",
        [description, id]
      );
      res.json("Pokemon was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // delete a todo
  
  app.delete("/haveCaught/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteHaveCaught = await pool.query("DELETE FROM haveCaught WHERE haveCaught_id = $1", [
        id,
      ]);
      res.json("Pokemon was deleted");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
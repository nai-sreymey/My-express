const pool = require("../config/db")
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = async (req, res) => {
  const selectdata= "SELECT * FROM Tasktodo";
  try {
    const result = await pool.query(selectdata);

    res.status(201).json({
      message: "Task Fetched successfully",
      task: result.rows, // Return the newly inserted task
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send("server error");
  }
};


//@desc Create New contacts
//@route  POST /api/contacts
//@access public

//POST
const createContact = async (req, res) => {
  const { task, complete,id } = req.body;
  
  const createTable = `
  CREATE TABLE IF NOT EXISTS Tasktodo (
    id SERIAL PRIMARY KEY, 
    task TEXT,
    complete BOOLEAN
  )`;

  const insertData = `
  INSERT INTO Tasktodo(
  task, complete, id)
  VALUES ($1, $2, $3) 
  RETURNING id, task, complete`

  try {
    await pool.query(createTable);

    const result = await pool.query(insertData, [task, complete,id]);

    res.status(201).json({
      message: "Task created successfully",
      task: result.rows, 
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).send("server error");
  }
};

const updateContact = async (req, res) => {
const {id} = req.params
const {task, complete} = req.body;
const Updatedata = `
  UPDATE Tasktodo
  SET task= $2, complete=$3
  WHERE id = $1
  RETURNING  task, complete, id`


try {

  const result = await pool.query(Updatedata, [id, task, complete]);

  res.status(201).json({
    message: "Task updated successfully",
    task: result.rows, 
  });
} catch (err) {
  console.log("error", err);
  res.status(500).send("server error");
}};


  const deleteContact = async (req, res) => {
    const {id} = req.params
    const deleteData = `
      DELETE FROM Tasktodo
      WHERE id = $1
      RETURNING id`
    
    
    try {
    
      const result = await pool.query(deleteData, [id]);
    
      res.status(201).json({
        message: "Task Deleted successfully",
        task: result.rows, 
      });
    } catch (err) {
      console.log("error", err);
      res.status(500).send("server error");
    }};

module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
};

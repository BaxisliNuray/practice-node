const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid")
const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());



// CRUD

const studentsRoute = require('./routes/student.routes');
app.use('/students', studentsRoute)

// get all students
app.get("/studens", (req, res) => {

    if (students.length === 0) {
        res.status(204).send("no content");
        return;
    } else {
        res.status(200).send(students);
        return;
    }
});

//get student by id
app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  const singleData = students.find((data) => data.id === parseInt(id));

  if (singleData === undefined) {
    res.status(204).send("data not found ");
    return;
  } else {
    res.status(200).send(singleData);
    return;
  }
});


//delete student by id
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;
    const data = students.find((data) => data.id === parseInt(id));
    if (data === undefined) {
        res.status(404).send("no such student found!");
        return;
    } else {
        const idx = students.indexOf(data);
        students.splice(idx, 1);
        res.status(202).send("students deleted");
    }
});

//post student
app.post("/students", bodyParser.json(), (req, res) => {
    const newStudent = {
        id:uuid.v4(),
        name: req.body.name,
        price: req.body.price
    }
    students.push(newStudent);
    res.status(201).send("student posted ");
});

//put student
app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let student = students.find((x) => x.id == id);
    if (!student) return res.status(204).send();
    if (!name) {
        return res.status(400).send({ message: 'name is required!' })
    }
    if (name) {
        student.name = name;
    }

    res.send(200).send("student updated ");
}
)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
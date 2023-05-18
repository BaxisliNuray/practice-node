const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

app.use(cors());
const bodyParser = require("body-parser"); app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dotenv = require('dotenv');
dotenv.config();




// MONGO DB CONNECTION
DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
    .then(() => console.log("Mongo DB Connected!"))
console.log(DB_CONNECTION.replace("<password>", DB_PASSWORD));



// get Student Scheme
const StudentSchema = mongoose.Schema({
    name: String,
    surname: String,
    birthdate: String,
    faculty: String,
    GPA: Number,
    isMarried: Boolean

})

// tudent Module
const StudentModel = mongoose.model('Students', StudentSchema)






// get all students
app.get("/students", async (req, res) => {
    const { name } = req.query;
    const students = await StudentModel.find();
    if (name === undefined) {
        res.status(404).send("404 error");
    } else {
        res.status(200).send({
            data: students.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
            message: "data get ",
        });
    }
});
// get  student by id\
app.get("/students/:id", async (req, res) => {
    const id = req.params.id;
    const student = await StudentModel.findById(id);
    console.log('artist found: ', artist);
    if (!student) {
        res.status(204).send("student not found!");
    } else {
        res.status(200).send({
            data: student,
            message: "data get success!",
        });
    }
});



//   delete student by id

app.delete("/students/:id", async (req, res) => {
    const id = req.params.id;
    const student = await StudentModel.findByIdAndDelete(id);
    if (student === undefined) {
        res.status(404).send("student not found");
    } else {
        const idx = student.indexOf(student);
        student.splice(idx, 1);
        res.status(203).send({
            data: student,
            message: "student deleted successfully",
        });
    }
});

//post students
app.post("/students", async (req, res) => {
    const { name, surname, birthdate, faculty, GPA, isMarried } = req.body;
    const newStudent = new StudentModel({
        name: name,
        surname: surname,
        birthdate: birthdate,
        faculty: faculty,
        GPA: GPA,
        isMarried: isMarried
    })
    await newStudent.save();
    res.status(201).send("created");
});
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
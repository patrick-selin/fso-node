require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

morgan.token("type", (req, res) => JSON.stringify(req.body));

app.use(express.static("dist"));
app.use(cors());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :type")
);
app.use(express.json());

//
const generateId = () => {
  const randomInteger = Math.floor(Math.random() * Math.pow(10, 15));

  return randomInteger;
};

const getCurrentTime = () => {
  return (currentDate = new Date());
};

const getPeopleAmount = () => {
  return persons.length;
};

const nameExists = (name) => {
  // change to check if in db, not persons object
  return persons.find((person) => person.name === name);
};

app.get("/", (req, res) => {
  res.send("<h1>Heello world</h1>");
});

app.get("/api/persons", (req, res) => {
  //
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has info for ${getPeopleAmount()} people</p>
  <p>${getCurrentTime()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  // const person = persons.find((person) => person.id === id);

  // Person.findById(id).then(person => {
  //   if (person) {
  //     res.json(person)
  //   } else {
  //     res.statusMessage = "didn't find person";
  //     res.status(404).end();
  //   }
  // })

  Person.findById(req.params.id).then((person) => {
    res.json(person);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // check if name exist in db, now
  // if (nameExists(body.name)
  // if (nameExists(body.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number || false,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });

  // res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

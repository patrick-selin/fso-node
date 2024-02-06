const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  return persons.find((person) => person.name === name);
};

app.get("/", (req, res) => {
  res.send("<h1>Heello world</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has info for ${getPeopleAmount()} people</p>
  <p>${getCurrentTime()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.statusMessage = "Current password does not match";
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(req.body);

  if (nameExists(body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

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

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

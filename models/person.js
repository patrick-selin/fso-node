const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// const password = "l10cCAO1uaCPqD9g";
// const url = `mongodb+srv://fso2024:${password}@cluster0.a0iujyf.mongodb.net/phonebook?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema)
require('dotenv').config();
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({name: "Martin", age: 21, favoriteFoods: ["pizza", "bacon", "bitches"]});
  person.save(function(err, data)
  {
    if (err) return console.error(err);
    done(null, data);
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  
  Person.create(arrayOfPeople, function(err, people)
  {
    if (err) return console.log(err);
    done(null, people);
  });

  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data)
  {
    done(null , data);
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err, data)
  {
    if (err) return console.log(err);
    done(null , data);
  });
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data)
  {
    done(null , data);
  });
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, data)
  {
    if (err) return console.log(err);

    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedPerson) => 
    {
      if (err) return console.log(err)
      done(null , updatedPerson);
    })

    
  });

  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, { age: ageToSet}, function(err, data)
  {
    if (err) return console.log(err);

    done(null, data);
  });

  // done(null /*, data*/);
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, function(err, data)
  {
    if (err) return console.log(err);

    done(null, data);
  });

  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, res) => 
  {
    if (err) return console.log(err);
    done(null, res);
  });


  // done(null, res);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
  .sort({name: -1})
  .limit(2)
  .select({name: 0})
  .exec((err, data) => 
  {
    if (err) return console.log(err);

    done(err, data);
  });

  // done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

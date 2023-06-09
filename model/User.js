const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;




// 1. const mongoose = require('mongoose');:
// This line imports the mongoose module, which is an Object Data Modeling (ODM) library for MongoDB. It allows you to interact with MongoDB in a more structured way, providing features like schema definition and validation.

// 2. const { Schema } = mongoose;:
// This line uses destructuring assignment to extract the Schema object from the mongoose module. The Schema object is used to define the structure and data types of a MongoDB document.

// 3. const UserSchema = new Schema({ ... });:
// This line creates a new instance of the Schema object and assigns it to the UserSchema constant. Inside the object, you define the structure and properties of the user document. In this case, it has three fields: name, phone_number, and password.

// 4. name: { type: String, required: true }:
// This line defines the name field within the UserSchema. It specifies that the field should be of type String and is required, meaning it must have a value when creating a new user document.

// 5. phone_number: { type: Number, required: true }:
// This line defines the phone_number field within the UserSchema. It specifies that the field should be of type Number and is required.

// 6. password: { type: String, required: true }:
// This line defines the password field within the UserSchema. It specifies that the field should be of type String and is required.

// 7. const User = mongoose.model('user', UserSchema);:
// This line creates a model named User using the UserSchema and assigns it to the User constant. The model represents a collection in the MongoDB database and provides an interface for interacting with the collection. In this case, the model is named 'user', and it will correspond to a collection named 'users' in the database.

// 8. module.exports = User;:
// This line exports the User model, making it available to other modules that require this file. It allows other parts of the application to access and use the User model for performing database operations.
// Overall, this code sets up a User model with a specific schema using Mongoose, which can be used for interacting with a MongoDB collection representing users.
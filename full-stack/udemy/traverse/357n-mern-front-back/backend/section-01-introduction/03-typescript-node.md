# TypeScript + Node Node Resources
## creating rest-api-express-typescript tutorial
* https://tutorialedge.net/typescript/creating-rest-api-express-typescript/#package-json
* [building a REST API in TypeScript with ExpressJS Part 1](https://www.youtube.com/watch?v=tcB3HZoy5N8)
* [building a RESTful API using Express and TypeScript](https://tutorialedge.net/typescript/creating-rest-api-express-typescript/#package-json)
* [strongly-typed-models-with-mongoose-and-typescript](https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722)
* [typescript, node.js and express ultimate project setup](https://www.youtube.com/watch?v=0qFcdNkPhnk)
* [0-60 with typescript and node.js video](https://www.youtube.com/watch?v=vxvQPHFJDRo)

## Complete guide for Typescript with Mongoose for Node
https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1

* https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/

## Using Typescript with mongodb and mongoose 
* https://medium.com/swlh/using-typescript-with-mongodb-393caf7adfef
* TypeScript allows us to create TypeScript files, and `ts-node` allows us to execute those files in Node
  - https://github.com/BretCameron/typescript-mongodb

### VS Code Tip
* Add comment `//@ts-check`
    - And vs code will check your code for TS errors

## npm-run-all
* [docs](https://www.npmjs.com/package/npm-run-all)
* Simplify
    - The official npm run-script command cannot run multiple scripts, so if we want to run multiple scripts, it's redundant a bit
    - Let's shorten it by glob-like patterns
* Before: `npm run clean && npm run build:css && npm run build:js && npm run build:html`
* After: `npm-run-all clean build:*`

## Copying favicon generated stuff to dist/public from src/public on build
```
    "build": "npm-run-all clean lint format && tsc -p ./ && cp -R src/public dist"
```

## Example of Mongoose Schema
```
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  activeMembership: () => boolean;
  membershipExpires: Date;
  registeredOn: Date;
  lastLogin: Date;
  isAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  activeMembership: { type: Boolean, required: true, default: false },
  membershipExpires: { type: Number, required: true, default: 0 },
  registeredOn: { type: Date, required: true },
  lastLogin: { type: Date },
  isAdmin: { type: Boolean, required: true, default: false }
});

userSchema.pre<IUser>("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      next();
    });
  });
});
```

## Troubleshooting
* **REMINDER** Don't use fat arrow syntax to define mongoose methods and hooks

* https://stackoverflow.com/questions/42448372/typescript-mongoose-static-model-method-property-does-not-exist-on-type

```
import * as bcrypt from 'bcryptjs';
import { Document, Schema, Model, model } from 'mongoose';

import { IUserDocument } from '../interfaces/IUserDocument';

export interface IUser extends IUserDocument {
    comparePassword(password: string): boolean; 
}

export interface IUserModel extends Model<IUser> {
    hashPassword(password: string): string;
}

export const userSchema: Schema = new Schema({
    email: { type: String, index: { unique: true }, required: true },
    name: { type: String, index: { unique: true }, required: true },
    password: { type: String, required: true }
});

userSchema.method('comparePassword', function (password: string): boolean {
    if (bcrypt.compareSync(password, this.password)) return true;
    return false;
});

userSchema.static('hashPassword', (password: string): string => {
    return bcrypt.hashSync(password);
});

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;
And your (newly renamed) ../interfaces/IUserDocument module would look like this:

import { Document } from 'mongoose';

export interface IUserDocument extends Document {
    email: string;
    name: string;
    password: string;
}
```

* Remember that we are dealing with two different Mongo/Mongoose concepts: a `Model`, and `Documents`
* Many `Documents` can be created from a single `Model`
* The Model is the blueprint, the Document is the thing created according to the Model's instructions
* Each Document contains its own data

## How this all relates to TypeScript?
* Extend `Document` to define types for instance properties and `.method` functions
* Extend the Model (of a Document) to define types for `.static` functions
* And remember when you go to use these things in your code, the `Model` is used to create new Documents and to call static methods like `User.findOne` or your custom statics
* And `Documents` are what you use to access the specific data from the object, or to call instance methods like `this.save` and custom instance methods like `this.comparePassword` defined above

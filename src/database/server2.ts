import db from "./connection";
import { v4 as uuidv4 } from 'uuid';
import Profile from "../authentication/Profile";

interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string;
}

async function getUserByEmail(email: string): Promise<User | null> {
  const query = `
    SELECT user_id, first_name, last_name, email_address
    FROM users
    WHERE email_address = $1
  `;
  const result = await db.oneOrNone<User>(query, email);
  return result || null;
}

async function createUser(firstName: string, lastName: string, email: string): Promise<User> {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log("User already exists in database");
    return existingUser;
  }

  const userId = uuidv4();
  const query = `
    INSERT INTO users (user_id, first_name, last_name, email_address)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, first_name, last_name, email_address
  `;
  const result = await db.one(query, [userId, firstName, lastName, email]);

  console.log("User created in database");
  return result;
}

// Assume email is obtained from the user when they sign up with Auth0
const email: string | null = Profile.email;

if (email) {
    const firstName = prompt("Please enter your first name:");
    const lastName = prompt("Please enter your last name:");
    const user = await createUser(uuidv4(), firstName, lastName, email);
    console.log(user); // { user_id: '...', first_name: 'John', last_name: 'Doe', email_address: '...' }
  } else {
    console.log('Email address is null');
  }


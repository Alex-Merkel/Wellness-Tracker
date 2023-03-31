import db from "./connection";
import { v4 as uuidv4 } from 'uuid';

interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email_address: string;
}

async function getUserByEmail(email_address: string): Promise<User | null> {
    const query = `
        SELECT *
        FROM users
        WHERE email = $1
    `;
    const result = await db.oneOrNone<User>(query, email);
    return result || null;
}

async function createUser(first_name: string, last_name: string, email_address: string): Promise<User> {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        console.log("User already exists in database");
        return existingUser;
    }

    const user_id = uuidv4();
    const query = `
        INSERT INTO users (user_id, first_name, last_name, email_address)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const result = await db.one(query, [user_id, first_name, last_name, email_address]);

    console.log("User created in database");
    return result;
}

// Example usage:
const email = "user@example.com";
const firstName = "John";
const lastName = "Doe";

const user = await createUser(firstName, lastName, email);
console.log(user); // { id: '69b6e956-21e2-48d1-9d6c-47d85c5b1630', email: 'user@example.com', first_name: 'John', last_name: 'Doe' }

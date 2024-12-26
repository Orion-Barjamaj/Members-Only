const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstName VARCHAR (255),
        lastName VARCHAR (255),
        userName VARCHAR (255),
        password VARCHAR (255),
        isMember BOOLEAN);`
;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
  
main();
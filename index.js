const sql = require('mysql2/promise');
const { readFile, writeFile } = require('node:fs').promises;
const { join } = require('path');
require('dotenv').config();

const JSON_LIST_FILE_NAME = process.env.JSON_LIST_FILE_NAME || 'data.json';
const DB_CONFIG = {
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME
};

async function main() {

    const connection = await sql.createConnection(DB_CONFIG).catch((error) => {
        console.error(error);
        process.exit(1);
    });

    const filePath = join(__dirname, JSON_LIST_FILE_NAME);

    const file = await readFile(filePath, 'utf-8');

    const parsedList = JSON.parse(file);

    const errors = [];

    for (const statement of parsedList) {
        try {
            await connection.query(statement);
            console.log('success statement:\n', statement);
        } catch (error) {
            console.error('error statement:\n', statement);
            errors.push(error);
        }
    }

    if (errors.length === 0) {
        console.log('no errors');
        process.exit(0);
    }
    console.error(errors);
    const savedStatus = await writeFile(join(__dirname, 'errors.json'), JSON.stringify(errors));

    if (savedStatus) {
        console.log('errors saved');
    } else {
        console.error('errors not saved');
    }

    process.exit(1);
}

main();

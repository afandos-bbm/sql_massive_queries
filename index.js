const sql = require('mysql2/promise');
const { readFile, writeFile } = require('node:fs').promises;
const { join } = require('path');
require('dotenv').config();

const JSON_LIST_FILE_NAME = process.env.JSON_LIST_FILE_NAME || null;
const DB_CONFIG = {
    "host": process.env.DB_HOST,
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME
};

async function main() {
    if (JSON_LIST_FILE_NAME === null) {
        console.error('JSON_LIST_FILE_NAME not set in .env file.');
        process.exit(5);
    }

    const connection = await sql.createConnection(DB_CONFIG).catch((error) => {
        console.error(error);
        process.exit(3);
    });

    const filePath = join(__dirname, JSON_LIST_FILE_NAME);

    const parsedFileList = [];
    try {
        const file = await readFile(filePath, 'utf-8');
        parsedFileList.push(...JSON.parse(file));
        console.log('File read successfully');
    } catch (error) {
        console.error('Error reading file');
        console.error(error);
        process.exit(4);
    }

    const errors = [];

    let i = 0;
    console.log('Executing statements...');
    for (const statement of parsedFileList) {
        try {
            await connection.query(statement);
            console.log('Statement ' + i + ' executed successfully.');
        } catch (error) {
            console.error('Statement ' + i + ' failed.');
            console.error(error);
            errors.push(error);
        }
        i++;
    }

    if (errors.length === 0) {
        console.log('\n\nNo errors detected\n\n');
        process.exit(0);
    }


    try {
        const errorFileName = (process.env.ERROR_FILE_NAME.split('.').slice(0, -1).join('.') + '_errors.json') || 'errors.json';
        await writeFile(join(__dirname, errorFileName), JSON.stringify(errors), 'utf-8');
        console.log('Errors written to file');
        process.exit(1);
    } catch (error) {
        console.error('Error writing errors to file, printing to console instead! \n\n Error:');
        console.error(error);
        console.log('\n\nSQL Statements that failed:');
        console.log(errors);
        process.exit(2);
    }
}

main();

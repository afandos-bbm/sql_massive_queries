# Script for execute massive queries to SQL database server

## Table of Contents

- [About](#about)
- [Install](#install)
- [Run script](#run-script)
- [Example of .env File](#example-env-file)
- [Example JSON List file](#example-json-list-file)
- [Error Codes](#error-codes)
- [License](#license)
- [Contributing](#contributing)
- [Author](#author)

## About

This project is a script for execute massive queries to SQL database server.
The queries are read from a JSON List file.

This script is useful for execute massive queries to a database server and not worry about the number of queries.
The script will execute the queries in the JSON List file and if some statement fails, the script will generate a file named `{JSON_LIST_FILE_NAME}_errors.json` with the failed statements.

## Install

This project uses [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) as package manager, so you need to install it first.

After that, you can install the project dependencies with the following command:

```bash
npm install
```

## Run script

First of all, you need to create a `.env` file in the root of the project with the following parameters:

### Example .env file

```bash
# File to be used as input for the script (Must be a JSON List)
# * Use relative path. ("data.json")
# * JSON File must be in project folder
# * for use absolute path use: abs:<ABSOLUTE_PATH> (Example: "abs:/home/user/data.json")
JSON_LIST_FILE_NAME=""

# Database connection parameters
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASSWORD=""
DB_NAME=""
```

#### Path to JSON List file

The `JSON_LIST_FILE_NAME` parameter is the path to the JSON List file.

You can use relative path or absolute path.

- Relative path: `data.json`
- Absolute path: `abs:/home/user/data.json`

#### Database connection parameters

The `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` parameters are the connection parameters to the database server.


### **Execute script**
And then, you can run the script with the following command:

```bash
npm run execute
```

If some statement fails, the script will generate a file named `{JSON_LIST_FILE_NAME}_errors.json`.

## Example JSON List file

[Example file](/example_data.json)

```json
[
  "INSERT INTO users ( id, username, password ) VALUES ( '1' , 'admin' , 'admin' );",
  "INSERT INTO users ( id, username, password ) VALUES ( '2' , 'user' , 'user' );",
  "INSERT INTO users ( id, username, password ) VALUES ( '3' , 'guest' , 'guest' );",
  "INSERT INTO users ( id, username, password ) VALUES ( '4' , 'test' , 'test' );"
]
```

## Error Codes

| Code | Description                                    |
| ---- | ---------------------------------------------- |
| 0    | No errors                                      |
| 1    | Some statements failed, written errors to file |
| 2    | Missing .env file                              |
| 3    | Missing JSON_LIST_FILE_NAME in .env            |
| 4    | Error in SQL Connection                        |
| 5    | Cannot read input file                         |
| 6    | Cannot write error file                        |

## License

This project is licensed under the terms of the free and open-source [MIT license](/LICENSE).

## Contributing

If you have any idea to improve this project, feel free to open an issue or a pull request.

## Author

This project was made with love by [Alejandro Fandos](https://github.com/alejandrofan2).

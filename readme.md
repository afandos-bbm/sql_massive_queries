# Script for execute massive queries to SQL database server

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
JSON_LIST_FILE_NAME=""

# Database connection parameters
DB_HOST=""
DB_PORT=""
DB_USER=""
DB_PASSWORD=""
DB_NAME=""
```

And then, you can run the script with the following command:

```bash
npm run execute
```

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

## License

This project is licensed under the terms of the free and open-source [MIT license](/LICENSE).

## Contributing

If you have any idea to improve this project, feel free to open an issue or a pull request.

## Author

This project was made with love by [Alejandro Fandos](https://github.com/alejandrofan2).

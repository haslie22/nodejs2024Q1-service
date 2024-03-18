# :books: Home Library Service

## :clipboard: Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## :hammer_and_wrench: Installation and Set Up

:one: Clone this repo:

```bash
git clone https://github.com/haslie22/nodejs2024Q1-service.git
```

:two: Change branch:

```bash
git switch dev-part1
```

:three: Install NPM modules:

```bash
npm install
```

:four: Rename `.env.example` file to `.env`:

```bash
cp .env.example .env
```

## :rocket: Running the Application

Run the application:

```bash
npm start
```

Application starts on the port indicated in the `.env` file or dafault (**4000**) port.

:warning: If you encounter `Already in use` error, please change port in `.env` file or stop the application that runs on the neccessary port.

## :test_tube: Testing

To run all tests without authorization:

```bash
npm run test
```

### :memo: Documentation

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

### :cherry_blossom: Auto-fix and format

To check existing linting and formatting:

```bash
npm run lint
```

```bash
npm run format
```

To fix linting and formatting:

```bash
npm run lint:fix
```

```bash
npm run format:fix
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

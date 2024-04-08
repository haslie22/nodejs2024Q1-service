# :books: Home Library Service [<img src="https://img.shields.io/badge/DockerHub-latest-blue.svg?logo=LOGO">](https://hub.docker.com/repository/docker/haslie22/home-library-service/general)

## :clipboard: Prerequisites

| Software    | Link                                                                    |
| ----------- | ----------------------------------------------------------------------- |
| Git         | [download and install](https://git-scm.com/downloads)                   |
| Node.js/npm | [download and install](https://nodejs.org/en/download/)                 |
| Docker      | [download and install](https://www.docker.com/products/docker-desktop/) |
| Docker Hub  | [create an account](https://hub.docker.com/)                            |

## :hammer_and_wrench: Installation and Set Up

:one: Clone this repo:

```bash
git clone https://github.com/haslie22/nodejs2024Q1-service.git
```

:two: Change branch:

```bash
git switch dev-part2
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

Run the multi-container application:

```bash
npm run docker:start
```

Application starts on the port indicated in the `.env` file or default (**4000**) port.

Postgres database starts on the indicated in the `.env` file (**5432**) port.

:warning: If you encounter `Already in use` error, please stop processes that are using the indicated ports.

## :package: Docker features

To perform a vulnerability scan and receive recommendations from Docker Scout, execute the following command:

```bash
npm run docker:full-analysis
```

:link: To view the repository containing the app image on Docker Hub, please visit [this link](https://hub.docker.com/repository/docker/haslie22/home-library-service/general).

## :card_file_box: Prisma features

To access the GUI of the database, you can initiate it by running the following command:

```bash
npx prisma studio
```

:link: After executing the command, you can open the GUI in your browser by typing http://localhost:5555/.

## :test_tube: Testing

To run all tests without authorization:

```bash
npm run test
```

### :memo: Documentation

:link: Once the app is running, you can easily access the OpenAPI documentation by typing http://localhost:4000/doc/ into your browser's address bar.

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

:link: For more information, please check [this link](https://code.visualstudio.com/docs/editor/debugging).

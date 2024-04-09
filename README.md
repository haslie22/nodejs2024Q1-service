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

:two: Install NPM modules:

```bash
npm install
```

:three: Rename `.env.example` file to `.env`:

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

:warning: If you encounter **`Already in use`** error, please stop processes that are using the indicated ports.

## :orange_book: Postman Collection

Discover the app API using this Postman Collection:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/24383003-db2513cf-a587-4cd5-b0c7-9e4f8844c17f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24383003-db2513cf-a587-4cd5-b0c7-9e4f8844c17f%26entityType%3Dcollection%26workspaceId%3Da7f2203f-5b3a-4a0a-a08b-a798ec838960)

:one: Follow the link by clicking the orange button  
:two: Press `Fork Collection` button in the popup  
:three: Fill in `Fork label` and `Workspace` fields, or leave them as-is  
:four: Proceed by clicking the `Fork Collection` button  
:five: Set the neccessary values for the environmental variables in the `Variables` tab  
:six: Send requests and explore the responses :mag:  

## :package: Docker Features

To perform a vulnerability scan and receive recommendations from Docker Scout, execute the following command:

```bash
npm run docker:full-analysis
```

:link: To view the repository containing the app image on Docker Hub, please visit [this link](https://hub.docker.com/repository/docker/haslie22/home-library-service/general).

## :card_file_box: Prisma Features

To access the GUI of the database, you can initiate it by running the following command:

```bash
npx prisma studio
```

:link: After executing the command, you can open the GUI in your browser by typing http://localhost:5555/.

## :vertical_traffic_light: Logger and Exception Filter features

Logs are stored into the `volume`, so that they can be preserved between application restarts.

#### To view the log files:

1. Open the Docker Desktop app.
2. Navigate to the `Volumes` tab.
3. Click on the `nodejs2024q1-service_logs` volume.

The logs are separated into different files according to their level. The name of the file consists of the log level and counter (e.g. `log-1.log`, `error-3.log`, `warn-2.log`).

#### To test Logger and Exception Filter:

1. Go to `main.ts` file.
2. Find the following piece of code:

```typescript
await app.listen(APP_PORT, () => {
  loggingService.log(`Application started on port ${APP_PORT}`);

  // Uncomment the next lines to test Logger and unhandled exceptions/rejections.
  // Get acquainted with README to get more info about logs.

  // loggingService.error('Test Error');
  // loggingService.warn('Test Warn');
  // loggingService.log('Test Log');
  // loggingService.verbose('Test Verbose');
  // loggingService.debug('Test Debug');

  // Promise.reject('Test UnhandledRejection');
  // throw new Error('Test UncaughtException');
});
```

3. Uncomment it and save the file.
4. Wait until the container is rebuilt
5. Check the log files according to the aforementioned instructions.

**:bulb: Tip:** You can also observe how the Logger works when you run tests!

## :test_tube: Testing

#### Parts 1-2

To run all tests without authorization:

```bash
npm run test
```

#### Part 3

To check authorization:

```bash
npm run test:auth
```

To check refresh token functionality:

```bash
npm run test:refresh
```

:exclamation: If the tests fail with a **`read ECONNRESET`** error, it means that the container is currently rebuilding and unavailable. Please wait a moment and try again.  

:warning: After adding the authentication functionality, tests which previously could be run with `npm run test` command should be run using `npm run test:refresh` instead.

### :memo: Documentation

:link: Once the app is running, you can easily access the OpenAPI documentation by typing http://localhost:4000/doc/ into your browser's address bar.

### :cherry_blossom: Auto-fix and Format

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

# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Docker

### Build and Run container
```
docker-compose up --build
```

### Running tests in the container
```
docker exec -i -t <Container ID> sh
npm run test
```
for closing a terminal in the container, please type ```exit```.

## Installing NPM modules

```
npm install
```

## Build application

```
npm run build
```

## Running application

```
npm start
```

```
npm start:prod
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Performance


### Express

|               |                                               |                        |
| ------------- | --------------------------------------------- | ---------------------- |
| http.codes    | [200, 201, 400]                               | [5, 1, 4]              |
| requests      | [request_rate, requests]                      | [3/sec, 10]            |
| response_time | [min, max, median, p95, p99]                  | [1, 65, 2, 58.6, 58.6] |
| responses     | [responses, created, created_by_name, failed] | [10, 5, 5, 5]          |

### Fastify

|               |                                               |                        |
| ------------- | --------------------------------------------- | ---------------------- |
| http.codes    | [200, 201, 400]                               | [5, 3, 2]              |
| requests      | [request_rate, requests]                      | [4/sec, 10]            |
| response_time | [min, max, median, p95, p99]                  | [5, 117, 10.1, 100.5, 100.5] |
| responses     | [responses, created, created_by_name, failed] | [10, 5, 5, 5]          |

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

# Demo API
This is a simple demo Node.js API using Express that performs CRUD operations on a User entity. The application is Dockerized for easy deployment.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Node.js](https://nodejs.org/) installed on your machine (for local development without Docker)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/demo-api.git
cd demo-api
```

### Running the App with Docker
1. Build the Docker Image
```bash
docker build -t demo-api .
```

2. Run the Docker Container
```bash
docker run -p 3000:3000 demo-api
```
This command will start the server, and it will be accessible at http://localhost:3000.

### Running the App Locally (Without Docker)
1. Install Dependencies
```bash
npm install
```

2. Start the Server
```bash
node app.js

OR 

npm start
```
The server will be running at http://localhost:3000.

## Using the API
The API provides CRUD operations for managing users.

### Create a New User
#### Endpoint: POST /v1/users

Request Body:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 28
}
```

Response:
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 28
}
```

### Get All Users
#### Endpoint: GET /v1/users
Response:
```json
[
  {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "age": 28
  }
]
```

### Get a User by ID
#### Endpoint: GET /v1/users/:id
Response:
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "age": 28
}
```

### Update a User by ID
#### Endpoint: PUT /v1/users/:id
Request Body:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "age": 29
}
```

Response:
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Smith",
  "age": 29
}
```

### Delete a User by ID
#### Endpoint: DELETE /v1/users/:id
Response:
```json
{}
```

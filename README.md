# INTRODUCTION

This API is a simple and user-friendly application programming interface designed to perform basic CRUD (Create, Read, Update, Delete) operations. This API serves as a fundamental building block for managing and maintaining users' tasks.

The API functionalities includes:

1. Display tasks - Stored tasks in the memory can be accessed. An endpoint that shows all the tasks which will include the title,description,dueDate,status and id.
2. Delete task.
3. Add task.
4. Update task.
5. Update task status

## Getting started

### Installation

Developers who are interested in using this API should have node installed on their local machines if not already installed.

### Clone the repository

```
git clone https://github.com/LivingHopeDev/task-management

```

- move into the cloned directory

```
cd task-management
```

To install all dependencies, run `npm install`

### Configuration

```
PORT=5000
```

To run the application, run any of the commands

```
nodemon app
npm start
```

The application will run on `http://127.0.0.1:5000/`.

## API Reference

### Endpoints

To test for the endpoints, the developer should have installed Postman or thunder client or any other application with similar capability or use curl.

#### GET /

Returns details of all the tasks registered to a particular user if any task has been created..

sample: `localhost:5000/api/tasks`

```

[
  {
    "id": 1,
    "title": "cook",
    "description": "this is the description",
    "dueDate": "23/11/23",
    "status": "pending"
  },
  {
    "id": 2,
    "title": "Read a book",
    "description": "this is the description",
    "dueDate": "23/11/23",
    "status": "pending"
  }
]
```

if no task. A response will be generated

```
{
  "message": "No tasks yet"
}
```

#### POST

This endpoint registers a new user. It returns a success message.
sample: `localhost:5000/api/register`

- body (JSON)

```
{
  "username": "Adetayo",
  "password":"test12"
}
```

```

{
  "message": "Registration successful"
}

```

#### POST

This endpoint logs in a user. It returns the users details when the login is successful.
sample: `localhost:5000/api/login`

- body (JSON)

```
{
  "username": "Adetayo",
  "password":"test12"
}
```

```

{
  "message": {
    "username": "Adetayo",
    "password": "test12"
  }
}

```

### PUT /id

This endpoint updates the user's task by passing the id of the task to be updated. It returns a success message if a correct task id is passed. Else, an error message will be returned.

sample: `localhost:5000/api/tasks/1`

- body (JSON)

```
{
  "title":"Read a book updated",
  "description":"this is the description",
  "dueDate": "23/11/23"
}
```

```
{
  "message": "Task updated successfully"
}

```

if the task id passed is not correct.

```
{
  "message": "Task not found"
}

```

### DELETE /id

This endpoint removes a user's task with the id passed as a params and returns a success message.
sample: `localhost:5000/api/tasks/1`

```
{
  "message": "Task deleted successfully"
}
```

### PUT /id

This endpoint toggle the task's status. For instance, if the status of a task is pending and this endpoint is hit on that task id, the status of the task will be changed to completed.

sample: `localhost:5000/api/tasks/1/status`

```
{
  "message": "Task completed"
}

```

### Error codes in the API

- 404: Not found
- 500: Internal server error
- 200: ok

### Limitation

` This API doesn't hash the user's password. Also, all details are stored in memory which means they are lost when the server restarts.
### Task breakdown
-url https://trello.com/b/iaPGCxow/my-trello-board

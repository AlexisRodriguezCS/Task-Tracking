<a name="readme-top"></a>

<p align="center">
  <img src="https://raw.githubusercontent.com/AlexisRodriguezCS/Task-Tracking/main/images/tasks.jpg" alt="Grid" style="display:block;margin:auto;" height="500">
</p>
<h1 align="center">Track Tracking</h1>

<!-- TABLE OF CONTENTS -->
<p align="center">
  <a href="#about">About The Project</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#usage">Usage</a> •
  <a href="#contact">Contact</a>
</p>

<!-- ABOUT THE PROJECT -->

<a name="about"></a>

## About The Project

The Task Tracking App is a dynamic web application built on the MERN (MongoDB, Express.js, React, Node.js) stack, following the Model–View–Controller (MVC) architectural pattern. This comprehensive task management tool combines a user-friendly interface with powerful backend technologies to streamline task organization and productivity. Leveraging REST APIs, the app enables users to seamlessly Create, Read, Update, and Delete (CRUD) tasks, providing complete control over their task lists.

One of the project's core features is its integration of JSON Web Tokens (JWT) for robust user authentication. With JWT, users can securely access their tasks and data while enjoying a personalized experience. This app empowers users to categorize tasks based on their status, set due dates, and prioritize them, facilitating efficient task management. It is a versatile tool suitable for individuals and teams seeking to enhance their productivity and stay organized.

### Key Technologies Used

- MongoDB: A NoSQL database for storing task data.
- Express.js: A Node.js framework for building the backend API.
- React: A JavaScript library for creating user interfaces.
- Node.js: A JavaScript runtime environment for server-side development.
- Material-UI (MUI): A React UI framework for designing user interfaces.
- REST API: Employed for creating, reading, updating, and deleting tasks (CRUD operations).
- JWT (JSON Web Tokens): Used for user authentication.
- Cookies: Utilized for managing user sessions and authentication state.
- Mocha: A JavaScript test framework for backend testing.
- Chai: An assertion library for Node.js.
- Chai-HTTP: An HTTP assertion library for testing HTTP requests and responses.
- Jest: A JavaScript testing framework for frontend testing.
- Axios: A library for making HTTP requests in both frontend and backend.
- Sinon: A library for creating spies, mocks, and stubs in JavaScript tests.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

<a name="project-structure"></a>

## Project Structure

### Front-End

The front-end of the application is organized into the following directories:

- `client` Folder:
  - `src` Folder:
    - `components:` Contains React components for various UI elements.
    - `context/providers`: Provides context and state management for tasks and user authentication.
    - `pages`: Defines the main application pages.
    - `styles`: Holds the stylesheets for the application.

### Components

| File                    | Description                                         |
| ----------------------- | --------------------------------------------------- |
| Header.js:              | The header component of the application.            |
| ForgotPassword.js:      | Handles user password recovery.                     |
| Login.js:               | Responsible for user authentication.                |
| Modal.js:               | Manages modal content display.                      |
| Profile.js:             | Allows users to manage their profiles.              |
| RegistrationSuccess.js: | Displays a success message after user registration. |
| SignUp.js:              | Handles user registration.                          |
| TaskAdd.js:             | Allows users to add new tasks.                      |
| TaskBoard.js:           | The main task management board.                     |
| TaskCard.js:            | Displays individual task cards.                     |
| TaskColumn.js:          | Manages columns of tasks.                           |
| TaskEdit.js:            | Handles task editing.                               |
| AuthContext.js:         | Manages authentication state.                       |
| TaskContext.js:         | Manages task-related state.                         |

### Back-End

The back-end of the application is organized into the following directories:

- `server` Folder:
  - `src` Folder:
    - `controller:` Contains controller functions for handling routes.
    - `middleware`: Defines authentication middleware.
    - `database`: Manages database connection
    - `routes`: Defines API routes.
    - `utils`: Contains utility functions.

### Components

| File                   | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| taskController.js:     | Contains controller functions for handling task-related routes.      |
| userController.js:     | Contains controller functions for handling user-related routes.      |
| databaseConnection.js: | Establishes a connection to the MongoDB database using Mongoose.     |
| cleanupTasks.js:       | Defines cleanup tasks to remove old anonymous tasks.                 |
| authMiddleware.js:     | Authentication middleware for verifying JWTs.                        |
| task.js:               | Defines the Mongoose schema for the Task model.                      |
| user.js:               | Defines the Mongoose schema for the User model.                      |
| taskRoutes.js:         | Defines API routes for managing tasks.                               |
| userRoute.js:          | Defines API routes for managing users.                               |
| hashPassword.js:       | Utility function for password hashing.                               |
| uuid.js:               | Utility function to generate UUIDs.                                  |
| app.js:                | Sets up the Express server, connects to MongoDB, and defines routes. |
| server.js:             | Starts the Express server and listens on a specified port.           |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

<a name="getting-started"></a>

## Getting Started

To set up a project locally, follow these simple steps.

### Prerequisites

_Software used to run the program._

- [Visusal Studio Code](https://code.visualstudio.com/)

- [Node](https://nodejs.org/en)

- [Git](https://git-scm.com/)

### Installation

_Here's how to install and set up the program._

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/AlexisRodriguezCS/Task-Tracking.git

# Go into the repository
$ cd Task-Tracking

# Go into the repository
$ cd client

# Install client dependencies
$ npm install

# Start the client(front end)
$ npm start

# Go back into root repository
$ cd ..

# Go into the repository
$ cd server

# Install server dependencies
$ npm install

# Start the server(back end)
$ npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

<a name="contact"></a>

## Contact

Alexis Rodriguez - [LinkedIn](https://www.linkedin.com/in/alexisrodriguezcs/) - alexisrodriguezdev@gmail.com

Project Link: [https://github.com/AlexisRodriguezCS/Task-Tracking.git](https://github.com/AlexisRodriguezCS/Task-Tracking.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

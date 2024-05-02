
# Task Management App

A simple web application for managing tasks using React, Material-UI, and a MERN stack. Visit the website using the [Live Link](https://draganddroptasks.onrender.com/)

## Description

This project is a task management web application built with React, Material-UI, and a MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, manage, and organize their tasks using a Kanban-style board. Tasks can be moved between different columns ("To-Do", "Doing", and "Done"), marked as completed, and deleted.

## Features

- User authentication and authorization.
- Drag-and-drop functionality for moving tasks between columns.
- Mark tasks as completed or undo the completion status.
- Delete tasks.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nabeel-w/AS-Assignment.git
   cd AS-Assignment/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your .env file like this:
   ```
   PORT
   LINK
   ```

5. Start the development server:
   ```bash
   npm run dev
   node index.js
   ```

6. Open your browser and go to `http://localhost:5173` to access the application.

## Screenshot
![Website Preview](https://i.ibb.co/n65dsCC/Screenshot-2023-08-26-211204.png)

## Usage

1. Upon opening the application, you'll be directed to the homepage.
2. If not authenticated, you'll be redirected to the login page.
3. After logging in, you'll see a navigation bar at the top.
4. You can create new tasks using the "New Task" button.
5. Tasks are displayed in columns based on their completion status.
6. Drag tasks to different columns to update their status.
7. Click on a task to view its details and mark it as completed or undo completion.
8. Click the "Logout" button in the navigation bar to log out.

## Technologies

- Frontend:
  - React
  - Material-UI

- Backend:
  - Node.js
  - Express.js
  - MongoDB

- Third-party Libraries:
  - Axios (HTTP requests)
  - react-router-dom (routing)
  - Validator
  - Body-Parser

---

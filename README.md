# Project Management System

## Overview

This project is a **web-based Project Management System** designed to centralize essential tools required for collaborative project development, with a primary focus on student group projects. The platform integrates project coordination, task management, real-time communication, and document collaboration into a single unified application, enabling teams to work efficiently and deliver high-quality results.

The system also includes an intelligent **text-based grade prediction feature**, allowing users to evaluate written content directly within the platform. By consolidating commonly used tools and workflows, the application reduces fragmentation and enhances productivity throughout the project lifecycle.

---

## Features

- Centralized project and task management
- Secure, real-time built-in chat system
- Text-based grade prediction (A–F)
- Task collections and reminder system
- Integration with external collaboration tools
- Intuitive and user-friendly interface

---

## Technology Stack

### Frontend
- **ReactJS**

### Backend
- **NodeJS**

### Database
- **MongoDB**

### Communication
- **ChatEngine.io**

### Machine Learning
- **Brain.js (LSTM Model)** – Used for text-based grade prediction

---

## System Architecture

The application follows a modern web architecture:
- The **ReactJS frontend** provides a responsive and interactive user interface.
- The **NodeJS backend** handles business logic, API communication, and authentication.
- **MongoDB** stores user data, project information, and task-related content.
- **ChatEngine.io** enables real-time, secure communication between users.
- The **Brain.js LSTM model** processes user-submitted text and generates grade predictions.

---

## Purpose

The goal of this project is to provide a single, integrated platform that supports effective collaboration, communication, and project organization. By combining essential project management features with intelligent automation, the system helps teams stay organized and focused throughout their project workflow.


## How to start this project:

Please, following the steps below:

1) Make sure you have installed NodeJS, npm, and MongoDB on your system.
2) Run your local MongoDB on port 27017 or on dedicated server.
3) Create 'test' collection inside of your MongoDB.
4) Open server/client folders inside of the terminal.
5) Run 'npm install' command in both folders.
6) Inside of the server folder, please create '.env' file from 'env-template'.
7) Paste the required variables into the '.env' file. 
8) Go to server folder, and run 'npm run dev' command. Wait until it is up and running on port 2000.
9) Go to client folder, and run 'npm start' command.
10) If everything is fine, you shall see the Login page automacally opened inside of your browser where you can start testing the project.
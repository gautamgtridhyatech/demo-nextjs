# Next.js Blog Demo Project

## Overview

This project is a demo blog application built using **Next.js**. It demonstrates CRUD operations while showcasing Next.js features such as routing and server-side rendering.

---

## Table of Contents
1. [What is Next.js?](#what-is-nextjs)
2. [Why Next.js over React?](#why-nextjs-over-react)
3. [How Next.js Works](#how-nextjs-works)
4. [App Router](#app-router)
5. [Project Setup](#project-setup)
6. [Environment Configuration](#environment-configuration)
7. [Libraries and Tools Used](#libraries-and-tools-used)
8. [Features](#features)
9. [Usage](#usage)
10. [License](#license)

---

## What is Next.js?

Next.js is a React framework that enables functionality such as server-side rendering (SSR) and static site generation (SSG) for building production-grade web applications.

---

## Why Next.js over React?

Next.js extends React's capabilities with features such as:

- **Server-Side Rendering (SSR)**
- **Static Site Generation (SSG)**
- **File-Based Routing**
- **API Routes**
- **Built-in CSS and SCSS support**

---

## How Next.js Works

Next.js offers a **hybrid rendering** approach, combining SSR, SSG, and client-side rendering with a file-based routing system.

---

## App Router

In Next.js 14, the routing structure for this project is defined as follows:

- **Blog Pages:**
  - View a single blog: `src/app/blogs/show/[id]/page.jsx`
  - Edit a blog: `src/app/blogs/edit/[id]/page.jsx`
  - Create a new blog: `src/app/blogs/create/page.jsx`
  - List all blogs: `src/app/blogs/page.jsx`

- **API Routes:**
  - Fetch a single blog: `src/app/api/blogs/[id]/route.js`
  - Fetch all blogs: `src/app/api/blogs/route.js`

---

## Project Setup

To run this demo locally, ensure you have **Node.js v22.9.0** installed.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/gautamgtridhyatech/demo-nextjs.git
   cd demo-nextjs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   - Duplicate the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your database credentials:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=blog
     ```

4. **Create the MySQL database**:
   ```sql
   CREATE DATABASE blog;
   ```

5. **Run the SQL query to create the `blogs` table**:
   ```sql
   CREATE TABLE IF NOT EXISTS blogs (
     id INT AUTO_INCREMENT PRIMARY KEY, 
     title VARCHAR(255) NOT NULL, 
     description VARCHAR(255) NOT NULL, 
     content TEXT NOT NULL, 
     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

6. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Libraries and Tools Used

- **Next.js v14.2.13**
- **Node.js v22.9.0**
- **Bootstrap**
- **Bootstrap Icons**
- **MySQL2**
- **Yup**

---

## Features

- Create, read, update, and delete blog posts.
- Responsive design using Bootstrap.
- API integration using Next.js API routes.

---

## Usage

- Visit the homepage to see a list of blog posts.
- Click "Create Post" to add a new entry.
- Edit and delete functionalities are available for each post.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

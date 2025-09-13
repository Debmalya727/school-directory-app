# School Directory & Management Application

[![Deploy with Vercel](https://vercel.com/button)](https://school-directory-app.vercel.app/)

A comprehensive, full-stack web application built to serve as a modern, user-friendly directory for schools. This project provides a public interface for finding and comparing schools, along with a secure, authenticated administrative system for managing the directory's data.

**Live Demo Link: [https://school-directory-app.vercel.app/](https://school-directory-app.vercel.app/)**

---

## 📖 Project Overview

The goal of this project was to develop a centralized platform where users can easily access detailed information about schools. The application addresses the common challenge of scattered and hard-to-compare school data by providing advanced search, filtering, and side-by-side comparison tools.

Initially built as a public directory, the project was later extended to include a robust authentication layer. This second phase introduced a secure administrative backend, allowing authorized users to add and manage school listings while protecting these functionalities from public access. The implementation focuses on modern web development practices, security, and a clean, intuitive user experience.

## ✨ Core Features

The application is divided into two main components: a public-facing directory and a secure administrative panel.

#### 📢 Public Directory Features

* **Advanced School Search:** A powerful search bar allows users to find schools instantly by name.
* **Multi-Criteria Filtering:** Users can refine their search with a combination of filters, including City, Board (CBSE, ICSE, etc.), School Type (Co-Ed, All Boys, All Girls), and Hostel Availability.
* **Comprehensive School Profiles:** Each school has a dedicated detail page that provides extensive information, including address, contact details, board affiliation, school type, rating, and a complete list of available facilities.
* **Side-by-Side Comparison:** A unique feature allowing users to select up to four schools and compare their attributes in a clear, organized table format. This simplifies the decision-making process for parents and students.

#### 🔐 Admin & Security Features

* **Secure OTP Authentication:** A passwordless login system ensures secure access for administrators. Users receive a 6-digit One-Time Password (OTP) via email, which is valid for 10 minutes.
* **Session Management with JWT:** User sessions are managed using secure, `httpOnly` JSON Web Token (JWT) cookies. This industry-standard approach prevents common client-side vulnerabilities like Cross-Site Scripting (XSS).
* **Protected Routes:** The application uses Next.js Middleware to protect administrative routes (`/addSchool`) and their corresponding API endpoints. Any unauthorized attempt to access these routes results in an automatic redirection to the login page.
* **Dynamic UI Rendering:** The user interface, especially the main navigation header, is context-aware. It dynamically changes to display either a "Login" button for guests or a personalized welcome message and "Logout" option for authenticated administrators.
* **School Management:** Once authenticated, administrators have the ability to add new schools to the directory through a comprehensive and validated form.

---

## 🛠️ Technology & Architecture

This project leverages a modern tech stack to deliver a high-performance, secure, and scalable application.

* **Framework:** **Next.js** was chosen as the full-stack React framework for its powerful features like Server-Side Rendering (SSR), API routes, and Middleware, which are essential for both performance and security.
* **Database:** A **TiDB Cloud** cluster (MySQL compatible) serves as the primary database, providing a reliable and scalable data persistence layer.
* **ORM:** **Prisma** is used as the Object-Relational Mapper. It provides type-safe database access, simplifies queries, and manages schema migrations, significantly improving developer productivity and reducing runtime errors.
* **Styling:** **Tailwind CSS** is utilized for its utility-first approach to styling, enabling the rapid development of a custom, responsive, and modern user interface.
* **Image Management:** **Cloudinary** handles all image uploads and provides a robust CDN for fast and optimized image delivery.
* **Authentication:** The custom authentication layer is built using **Nodemailer** for sending email OTPs and the **`jose`** library for creating and verifying JWTs.
* **Deployment:** The application is deployed on **Vercel**, the native platform for Next.js, ensuring optimal performance, continuous integration, and seamless deployments.

---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

#### Prerequisites
* Node.js (version 18.x or later)
* npm (or yarn/pnpm)
* A running MySQL-compatible database (e.g., a free TiDB Cloud cluster)
* A Cloudinary account for image hosting
* A Gmail account with an "App Password" for sending emails

#### Step-by-Step Installation

1.  **Clone the GitHub Repository:**
    ```bash
    git clone [https://github.com/Debmalya727/school-directory-app.git](https://github.com/Debmalya727/school-directory-app.git)
    cd school-directory-app
    ```

2.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the project's root directory. You can copy the example file to get started:
    ```bash
    cp .env.example .env
    ```
    Next, open the `.env` file and fill in your credentials for the database, Cloudinary, email service, and JWT secret.

4.  **Apply Database Schema:**
    Run the Prisma migrate command to sync your database schema with the Prisma schema file. This will create all the necessary tables (`School`, `User`, etc.).
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will now be running and accessible at `http://localhost:3000`.

---

### Environment Variables Explained

The following variables must be defined in your `.env` file for the application to function correctly:

```env
# Prisma Database Connection String
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# Cloudinary URL for image uploads
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"

# Nodemailer credentials for sending OTP emails
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-16-digit-gmail-app-password"

# JWT Secret for signing session tokens (use a long, random string)
JWT_SECRET="YOUR_SUPER_SECRET_AND_LONG_RANDOM_STRING"
```

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

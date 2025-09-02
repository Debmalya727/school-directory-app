# School Directory & Comparison App

A full-stack web application built with **Next.js** and a **MySQL** database that allows users to search, add, and compare detailed information about various schools. This project was developed as a comprehensive web development assignment, incorporating a modern tech stack and professional features.

### **Live Demo**

**[Link to your live Vercel deployment will go here]**

---

### ✨ Key Features

* **🏫 Add New Schools:** A comprehensive, user-friendly form to add new schools with details like location, academic information, and available facilities.
* **🖼️ Cloud Image Uploads:** Integrated with Cloudinary for permanent cloud-based storage and fast delivery of images.
* **🔍 Advanced Search & Filtering:** A dynamic dashboard to instantly search by name and filter by city, board, school type, and hostel availability.
* **📇 Responsive Card Layout:** A clean, responsive grid view for schools that works well on desktop and mobile.
* **📄 Detailed School Pages:** Dedicated, dynamically generated pages for each school.
* **⚖️ Side-by-Side Comparison:** Compare up to four schools in a detailed table format.
* **🎨 Professional UI/UX:** A modern, intuitive interface with smooth animations and a clean design.

---

### 💻 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database ORM:** [Prisma](https://www.prisma.io/)
* **Database:** [TiDB Cloud](https://tidbcloud.com/) (Serverless MySQL)
* **Image Storage:** [Cloudinary](https://cloudinary.com/)
* **Deployment:** [Vercel](https://vercel.com/)

---

### 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/school-directory-app.git](https://github.com/your-username/school-directory-app.git)
    cd school-directory-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the root of the project and add the following variables. You will need your own credentials for a MySQL database (like TiDB Cloud) and a Cloudinary account.
    ```env
    # Your cloud MySQL connection string
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    
    # Your Cloudinary connection string
    CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
    ```

4.  **Sync the database schema:**
    This command will create the `School` table in your database based on the Prisma schema.
    ```bash
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### 👤 Author

* **Debmalya Panda**

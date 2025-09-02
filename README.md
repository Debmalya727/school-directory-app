Here’s a **clean and well-formatted README.md** for your GitHub repository:

---

````markdown
School Directory & Comparison App

A **full-stack web application** built with **Next.js** and a **MySQL database** that allows users to search, add, and compare detailed information about various schools. This project was developed as a comprehensive web development assignment, incorporating a modern tech stack and professional features.

## Live Demo
[Link to your live Vercel deployment will go here]

---

## ✨ Key Features
- **🏫 Add New Schools** – A comprehensive, user-friendly form to add new schools with details like location, academic information, and facilities.
- **🖼️ Cloud Image Uploads** – Integrated with **Cloudinary** for permanent cloud-based storage and fast delivery of images.
- **🔍 Advanced Search & Filtering** – Dynamic search with filters for city, board, school type, and hostel availability.
- **📇 Responsive Card Layout** – Clean, responsive grid view for schools that works well on desktop and mobile.
- **📄 Detailed School Pages** – Dedicated, dynamically generated pages for each school.
- **⚖️ Side-by-Side Comparison** – Compare up to four schools in a detailed table format.
- **🎨 Professional UI/UX** – Modern, intuitive interface with smooth animations and a clean design.

---

## 💻 Tech Stack
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma
- **Database**: TiDB Cloud (Serverless MySQL)
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/school-directory-app.git
cd school-directory-app
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add:

```env
# MySQL connection string
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# Cloudinary connection string
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

> Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE` with your MySQL credentials, and `API_KEY`, `API_SECRET`, and `CLOUD_NAME` with your Cloudinary account details.

### 4. Sync the database schema

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 License

This project is licensed under the MIT License.


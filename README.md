# QuickHire — Mini Job Board Application

QuickHire is a full-stack mini job board application that connects job seekers with open opportunities. It features a polished public-facing UI for browsing and applying to jobs, and a protected admin dashboard for posting and managing listings.

> 📋 Built as a technical assessment demonstrating frontend UI fidelity, backend REST API design, database modeling, and overall code quality.

---

## ✨ Features

### Job Seeker
- Browse all available job listings in a responsive grid layout
- Search by keyword (job title)
- Filter by Category and/or Location
- View full job details on a dedicated page
- Apply to a job by submitting a form (Name, Email, Resume URL, Cover Note)
- Client-side validation with clear error messages
- Success confirmation on application submission

### Admin
- View a table of all posted jobs
- Post new job listings via a form (Title, Company, Location, Category, Description)
- Delete existing job listings with a single click

---

## 🛠️ Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React.js (Vite), React Router DOM, Tailwind CSS v4, Lucide React |
| Backend    | Node.js, Express.js, CORS, dotenv               |
| Database   | Supabase (PostgreSQL) via `@supabase/supabase-js` |

---

## 📁 Project Structure

```
quickhirew/
├── backend/
│   ├── routes/
│   │   ├── jobRoutes.js          # GET, POST, DELETE /api/jobs
│   │   └── applicationRoutes.js  # POST /api/applications
│   ├── server.js                 # Express server entry point
│   ├── supabase.js               # Supabase client initialization
│   ├── .env.example              # Environment variable template
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Badge.jsx         # Reusable category/status badge
    │   │   ├── Button.jsx        # Reusable button (primary/secondary/danger)
    │   │   ├── Input.jsx         # Reusable input/textarea with validation display
    │   │   ├── JobCard.jsx       # Job listing card for the grid
    │   │   └── Layout.jsx        # App shell with header and footer
    │   ├── pages/
    │   │   ├── HomePage.jsx      # Job listings page with search & filters
    │   │   ├── JobDetailsPage.jsx # Single job view + application form
    │   │   └── AdminPage.jsx     # Admin dashboard
    │   ├── App.jsx               # Router setup
    │   └── main.jsx              # React entry point
    ├── .env.example
    └── package.json
```

---

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- A free [Supabase](https://supabase.com) account

---

### 1. Database Setup (Supabase)

1. Create a new project on [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor** and run the following to create the schema:

```sql
-- Jobs table
CREATE TABLE jobs (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       text NOT NULL,
  company     text NOT NULL,
  location    text NOT NULL,
  category    text NOT NULL,
  description text NOT NULL,
  created_at  timestamp with time zone DEFAULT now()
);

-- Applications table (with cascade delete)
CREATE TABLE applications (
  id          uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id      uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  name        text NOT NULL,
  email       text NOT NULL,
  resume_link text NOT NULL,
  cover_note  text,
  created_at  timestamp with time zone DEFAULT now()
);
```

3. From your Supabase project settings, copy your **Project URL** and **`service_role` secret key**.

---

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
PORT=5000
```

Start the backend server:

```bash
node server.js
# Server running on port 5000
```

---

### 3. Frontend Setup

```bash
# From the project root, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
```

The frontend `.env` only needs one variable:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
# App available at http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable              | Description                                    | Required |
|-----------------------|------------------------------------------------|----------|
| `SUPABASE_URL`        | Your Supabase project URL                      | ✅        |
| `SUPABASE_SERVICE_KEY`| Your Supabase `service_role` secret key        | ✅        |
| `PORT`                | Port for the Express server (default: `5000`)  | Optional |

### Frontend (`frontend/.env`)

| Variable       | Description                                              | Required |
|----------------|----------------------------------------------------------|----------|
| `VITE_API_URL` | Base URL for the backend API (e.g. `http://localhost:5000/api`) | ✅ |

---

## 📡 API Endpoint Documentation

All responses follow a standard structure:
- **Success**: `{ "success": true, "data": { ... } }`
- **Error**: `{ "success": false, "error": "Error message" }`

---

### Jobs

#### `GET /api/jobs`
Fetch all job listings. Supports optional query parameters for filtering.

| Query Param | Type   | Description                          |
|-------------|--------|--------------------------------------|
| `search`    | string | Case-insensitive search by job title |
| `location`  | string | Case-insensitive filter by location  |
| `category`  | string | Exact match filter by category       |

**Example:** `GET /api/jobs?search=engineer&location=remote`

---

#### `GET /api/jobs/:id`
Fetch a single job by its UUID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Senior React Developer",
    "company": "Acme Corp",
    "location": "Remote",
    "category": "Engineering",
    "description": "...",
    "created_at": "2025-01-15T10:00:00Z"
  }
}
```

---

#### `POST /api/jobs`
Create a new job listing (admin).

**Request Body:**
```json
{
  "title": "Product Designer",
  "company": "Startup Inc",
  "location": "New York",
  "category": "Design",
  "description": "We are looking for..."
}
```

All fields are **required**. Returns `400` if any field is missing.

---

#### `DELETE /api/jobs/:id`
Delete a job listing by UUID. Also cascades deletion to all related applications.

**Response (200):**
```json
{ "success": true, "message": "Job deleted successfully" }
```

---

### Applications

#### `POST /api/applications`
Submit an application for a job.

**Request Body:**
```json
{
  "job_id": "uuid-of-the-job",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "resume_link": "https://drive.google.com/...",
  "cover_note": "I am very interested in this position..."
}
```

**Validation:**
- `job_id`, `name`, `email`, and `resume_link` are **required**.
- `email` must be a valid email format.
- `resume_link` must be a valid URL.

Returns `400` with a descriptive error for invalid input.

---

## 🔀 Git Commit History Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` — A new feature
- `fix:` — A bug fix
- `chore:` — Maintenance tasks (e.g., dependency updates, config changes)
- `docs:` — Documentation changes
- `style:` — Code formatting (no logic changes)
- `refactor:` — Code changes that neither fix a bug nor add a feature

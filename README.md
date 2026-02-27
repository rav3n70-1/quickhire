# QuickHire

QuickHire is a mini job board application designed to connect job seekers with open opportunities, and allow administrators to manage job postings. 

## Project Overview
This project is built as a technical assessment focusing on a polished user interface matching a Figma design, clean component architecture, and a functional REST API working with Supabase PostgreSQL.

### Features
- **Job Seeker**: Browse jobs, filter by keyword, location, or category, view job details, and submit an application.
- **Admin**: View all posted jobs, delete filled/old jobs, and publish new job listings.

## Tech Stack
- **Frontend**: React.js (Vite), React Router DOM, Tailwind CSS, Lucide React (Icons)
- **Backend**: Node.js, Express.js, CORS, Dotenv
- **Database**: Supabase (PostgreSQL)

## Local Setup Instructions

### 1. Database Setup (Supabase)
Create a new Supabase project and execute the following SQL in the SQL Editor to set up your schema:

```sql
CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE applications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  resume_link text NOT NULL,
  cover_note text,
  created_at timestamp with time zone DEFAULT now()
);
```

### 2. Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and add your keys:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key
   PORT=5000
   ```
4. Start the server: `node server.js`

### 3. Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server: `npm run dev`

## API Endpoints

### Jobs
- `GET /api/jobs`: Fetch all jobs. Supports query parameters `?search=X&location=Y&category=Z`.
- `GET /api/jobs/:id`: Fetch a single job by its ID.
- `POST /api/jobs`: Post a new job. 
  - Body: `{ title, company, location, category, description }`
- `DELETE /api/jobs/:id`: Delete a specific job.

### Applications
- `POST /api/applications`: Submit a job application.
  - Body: `{ job_id, name, email, resume_link, cover_note }`

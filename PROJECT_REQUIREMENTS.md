# DM-Website Project Requirements (Discrete Mathematics Course)

Lightweight, focused portal for **Discrete Mathematics & Data Fundamentals (CS-201)** (Dr. Tahaei & Head TA Amir Jebbeli).

---

## 💡 Simplified Architecture & Principles

1. **Static Frontend Content (No Database needed)**:
   - Course Info & Professor Details (Fixed static page)
   - TA Team Cards with Oval Avatars (Fixed static array)
   - Navigation Menu & Footer (Fixed layout)
   - **No Search Bar Needed**: Content volume is small (~10 homeworks, 3 TAs, ~10 recitations), so scanning organized category grids is faster and cleaner.

2. **Backend Use Case (Managed via Django Admin `/admin/`)**:
   - **Recitation Classes (`RecitationClass`)**: Amir can add/edit weekly practice class dates, times, locations/links, and video links via `/admin/`.
   - **Downloadable Course Files (`CourseFile`)**: Amir can upload or update Homework, Quiz, Project, and Sample Question PDF files and download links during the semester.

---

## 📄 Page Layouts & Features

### 1. Landing Page (`/`)
- 2–4 static classroom environment photos.
- Course overview, instructor info, offered term ("Fall 2026").
- Social media links (Telegram Channel, Group, Bale).
- Footer with menu links.

### 2. Main Navigation Items
- **Lecture Notes** (`/notes`)
- **Assignments** (`/assignments`) - Download buttons for homework PDFs.
- **Quizzes** (`/quizzes`) - Download buttons for quiz PDFs.
- **Recitation Classes** (`/recitations`) - Schedule, dates, times, and video links (Managed by Amir via Admin).
- **Projects** (`/projects`) - Downloadable project specs.
- **Sample Exams** (`/sample-exams`) - Past exam PDFs.
- **Teaching Assistants Team** (`/tas`) - Static grid (max 3 columns) with oval avatars, role, email, and Telegram handle.
- **Contact Us** (`/contact`)

---

## 🌐 Dynamic Backend Endpoints (`/api/`)
- `GET /api/recitations/` - Weekly recitation class schedules, times, and links.
- `GET /api/files/?category=<type>` - Downloadable course files by category (`assignment`, `quiz`, `project`, `sample_exam`, `lecture_note`).

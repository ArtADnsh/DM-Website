# DM-Website Project Requirements (Discrete Mathematics Course)

This portal is a dedicated website exclusively for **Discrete Mathematics & Data Fundamentals (CS-201)** taught by **Dr. Tahaei** at the Department of Computer Engineering.

---

## 📌 Scope & Architecture
- **Single Course Focus**: Discrete Mathematics for CS.
- **Static Assets & Content**: Course details, classroom photos, semester information, and social media links are maintained in clean, static structures.
- **No Over-Engineering**: Lightweight architecture focused purely on course navigation, TA team display, downloadable material categories, and in-site internal search.

---

## 🎨 Design & Aesthetic Guidelines
- **Color Palette Options**: Pistachio Green, Soft Light Orange, Muted Light Blue, or Soft Lavender accents.
- **Navigation**: Collapsible Sandwich (Hamburger) Menu & Header/Footer navigation.

---

## 📄 Pages & Layout Sections

### 1. Landing Page (`/`)
- **Classroom Photo Album**: 2–4 classroom environment photos.
- **Course Description & Overview**:
  - Course overview & syllabus summary
  - Offered term ("Fall 2026")
  - Course characteristics and prerequisites
- **Social Media Links Section**: Telegram Channel, Telegram Group, Bale, etc.
- **Footer**: Re-used navigation links and social links.

### 2. Main Navigation Menu Items
- **Lecture Notes** (`lecture_notes`)
- **Assignments** (`assignment`)
- **Quizzes** (`quiz`)
- **Recitation Classes** (`recitation`)
- **Projects** (`project`)
- **Sample Exams** (`sample_exam`)
- **Teaching Assistants Team** (`tas`)
- **Contact Us** (`contact`)

### 3. Teaching Assistants Page (`/ta-team`)
- Grid layout with **maximum 3 columns**.
- Ellipse/oval avatar frames (with default male/female avatar placeholders if photo is missing).
- TA profile details:
  1. Full Name
  2. Role / Responsibility in team (e.g. Head TA, Quiz Lead, Project Lead)
  3. Email
  4. Telegram Handle/ID

### 4. Search Functionality
- **In-Site Internal Search**: Searches through course materials (booklets, exercises, quizzes, exams) and TA team list directly without redirecting to external search engines.

---

## 🌐 API Endpoints (`/api/`)
- `GET /api/course-info/` - Retrieve course description, instructor info, term, and social links.
- `GET /api/photos/` - Retrieve classroom album photos for landing page.
- `GET /api/materials/?category=<category>` - Downloadable materials by category.
- `GET /api/tas/` - TA team list with roles and contact info.
- `GET /api/search/?q=<query>` - Internal search API.

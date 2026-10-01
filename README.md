# DM-Website

Full-stack portal for **Discrete Mathematics & Data Fundamentals (CS-201)**, featuring a React SPA frontend and a Django API backend, containerized for production deployment with Docker and Nginx.

---

## 🚀 Quick Start (Local Development)

### Frontend
```bash
cd Front-end
npm install
npm run dev
```
Access dev server at: `http://localhost:5173`

### Backend
```bash
cd Back-end
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```
Access API server at: `http://localhost:8000`

---

## 🐳 Production Deployment with Docker

To build and run the production environment (Frontend Nginx container + Backend Django container):

```bash
# Build and start services in detached mode
docker compose up -d --build

# View container logs
docker compose logs -f

# Stop containers
docker compose down
```
Access app at: `http://localhost` (Port 80) and API at `http://localhost:8000`.

---

## ☁️ VM Deployment Instructions (Ubuntu / Debian / Linux)

### Step 1: Install Docker & Docker Compose on VM
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
```

### Step 2: Clone Repository & Start Service
```bash
git clone <YOUR_GIT_REPOSITORY_URL> dm-website
cd dm-website

# Run Production Containers
docker compose up -d --build
```

### Step 3: Firewall Configuration (Optional)
Ensure ports 80 (HTTP) and 443 (HTTPS) are open:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🛠 Project Structure

```
.
├── docker-compose.yml       # Production Docker Compose setup
├── Dockerfile               # Production Nginx Dockerfile for Frontend
├── nginx.conf               # Custom Nginx config (SPA routing & Gzip)
├── .gitignore               # Root git ignore rules
├── .dockerignore            # Docker context ignore rules
├── Back-end/                # Django REST API directory
│   ├── api/                 # Django application app
│   ├── config/              # Django settings & URL configuration
│   ├── Dockerfile           # Backend container build instructions
│   └── requirements.txt     # Python dependencies
└── Front-end/               # React + Vite source directory
    ├── src/                 # Components, Pages, Assets
    ├── public/              # Static assets
    ├── package.json         # Frontend dependencies
    └── vite.config.js       # Vite configuration
```

---

## 🌿 Git Operations

```bash
# Check repository status
git status

# Stage production configuration files
git add .gitignore .dockerignore Dockerfile docker-compose.yml nginx.conf README.md

# Commit changes
git commit -m "chore: configure production Docker deployment setup"
```

# DM-Website Frontend

React Single Page Application (SPA) powered by Vite, prepared for seamless deployment with Docker, Docker Compose, Virtual Machines (VM), and Git.

---

## 🚀 Quick Start (Local Development without Docker)

```bash
cd Front-end
npm install
npm run dev
```
Access dev server at: `http://localhost:5173`

---

## 🐳 Running with Docker

### 1. Production Mode (Multi-stage Build with Nginx)
To run the optimized production build using Nginx web server:

```bash
# Build and start container in detached mode
docker compose up -d --build

# View logs
docker compose logs -f

# Stop container
docker compose down
```
Access app at: `http://localhost` (Port 80)

### 2. Development Mode with Docker (Hot-Reloading)
To run inside a Docker container with hot reloading:

```bash
docker compose -f docker-compose.dev.yml up --build
```
Access dev app at: `http://localhost:5173`

---

## ☁️ VM Deployment Instructions (Ubuntu / Debian / CentOS Linux)

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

# Run Production Container
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
├── docker-compose.dev.yml   # Development Docker Compose setup
├── Dockerfile               # Production multi-stage Nginx Docker build
├── Dockerfile.dev           # Development Node container build
├── nginx.conf               # Custom Nginx config (SPA routing & Gzip)
├── .gitignore               # Root git ignore rules
├── .dockerignore            # Docker context ignore rules
└── Front-end/               # React + Vite source directory
    ├── src/                 # Components, Pages, Assets
    ├── public/              # Static assets
    ├── package.json         # Project dependencies
    └── vite.config.js       # Vite configuration
```

---

## 🌿 Git Operations

```bash
# Check repository status
git status

# Stage initialization files
git add .gitignore .dockerignore Dockerfile Dockerfile.dev docker-compose.yml docker-compose.dev.yml nginx.conf README.md

# Commit setup
git commit -m "chore: initialize Docker, VM deployment config, and Git setup"
```

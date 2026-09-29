FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python packages
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . ./

EXPOSE 8000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/api/health/ || exit 1

# Run migrations, collect static files, and seed data on startup before starting Gunicorn
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && python manage.py seed_data && gunicorn --bind 0.0.0.0:8000 --workers 3 config.wsgi:application"]


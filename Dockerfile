# Menggunakan base image Node.js
FROM node:latest

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstall dependencies dr package.json
RUN npm install

# Mengeset variabel lingkungan untuk Firebase dan Google Cloud Console (ganti dengan nilai yang sesuai)
ENV FIREBASE_PROJECT_ID=carupah-backend-878a3
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/google-services.json

# Menyalin file ke dalam container
COPY server.js .
COPY services ./services
COPY handlers ./handlers
COPY routes ./routes
COPY services/ /app/services/

EXPOSE 3000

# Menjalankan aplikasi saat container dijalankan
CMD ["node", "server.js"]

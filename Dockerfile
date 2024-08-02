# Base image olarak node kullan
FROM node:20

# Çalışma dizinini ayarla
WORKDIR /app

# Paket dosyalarını kopyala
COPY package.json .
COPY bun.lockb .

# Bun.js'i kur
RUN npm install -g bun@latest

# Bağımlılıkları kur
RUN bun install

# Uygulama dosyalarını kopyala
COPY . .

# Uygulamayı başlat
CMD ["bun", "run", "src/index.ts"]
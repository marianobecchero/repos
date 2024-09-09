# Stage 1: Instala las dependencias. También ya se define la imagen de Docker Hub
FROM node:18-alpine AS deps

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json a la carpeta raíz (/app) y luego instala las dependencias necesitarias definidas 
# en ese archivo
COPY package.json ./
RUN npm install

# Stage 2: Se crea el build
FROM node:18-alpine AS builder

# Se posiciona en el mismo directorio de trabajo definido anteriormente
WORKDIR /app

# Copia los módulos instalados en el satage 1
COPY --from=deps /app/node_modules ./node_modules

# Copia el código de la aplicación
COPY . .

# Crea el build
RUN npm run build

# Es una variable de entorno que define que la app va a correr en producción y limpia la cache de la creación 
# del build así reduce el tamaño de la imagen
ENV NODE_ENV=production
RUN npm cache clean --force

# Stage 3: Se define el runner
FROM node:18-alpine AS runner

# Nuevamente se establece el mismo directorio de trabajo
WORKDIR /app

# Copia los archivos de la carpeta dist generados en el stage de build y los módulos de la aplicación
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Define con qué permisos de usuario va a correr la aplicación (evita que corra con los permisos de root)
USER node

# Define los que va a ejecutar cuando levante el contenedor
CMD ["node", "dist/main.js"]
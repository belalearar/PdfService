FROM node:alpine

ENV NODE_ENV development
ENV PORT 80
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
EXPOSE 80
EXPOSE 81

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn
RUN yarn add puppeteer@11.0.0

# Set the current directory in the container
WORKDIR /src

# Copy only the dependencies so they can have their own layer
COPY package*.json ./

# Install exact version of package-lock.json
RUN npm install

RUN npm install -g typescript

# Copy the application directory to the container current directory
COPY . .

# Build the application
RUN npm run build

# Run the application
CMD [ "node" , "dist/Program" ]

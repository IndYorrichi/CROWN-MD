FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  npm i pm2 -g && \
  rm -rf /var/lib/apt/lists/*
  
RUN git clone https://github.com/mrlit-a/crown-md  /root/crown-md
WORKDIR /root/crown-md/

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]

FROM node:16-alpine

# EXPOSE 4000
WORKDIR /my-api
COPY package.json .
RUN npm install
# RUN npm install nodemon -g
COPY . .
# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start"]
# CMD ["nodemon", "--exec", "npm", "run", "start"]
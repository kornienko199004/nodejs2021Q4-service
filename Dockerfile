FROM node:16-alpine

# EXPOSE 4000
WORKDIR /my-api
COPY package.json .
RUN npm install
# RUN npm install nodemon -g
COPY . .
# CMD ["npm", "run", "start:prod"]
# RUN npm run generate
# RUN npm run generate
CMD npm run migration:run && npm start
# CMD ["npm", "run", "start"]
# CMD ["nodemon", "--exec", "npm", "run", "start"]
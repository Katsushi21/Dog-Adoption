FROM node:latest

RUN mkdir /dog_adoption
WORKDIR /dog_adoption
ENV PATH /dog_adoption/node_modules/.bin:$PATH
COPY . /dog_adoption/

CMD npm start
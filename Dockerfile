FROM node:12
LABEL  modulink node@kakao.com
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN npm install
ENV NODE_ENV development
EXPOSE 3000

CMD ["npm", "build"]
CMD ["npm", "start"]
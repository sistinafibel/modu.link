FROM node:16 as common-build-stage
LABEL  MyungJun node@kakao.com
RUN mkdir -p /app
WORKDIR /app
COPY . /app

RUN npm install --no-optional
EXPOSE 3000

# Development build stage
FROM common-build-stage as development-build-stage
ENV NODE_ENV development
CMD ["npm", "run", "devServer"]


# Production build stage
FROM common-build-stage as production-build-stage
ENV NODE_ENV production
CMD ["npm", "run", "start"]
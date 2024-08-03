FROM node:22-alpine3.19

ENV NODE_ENV=production
EXPOSE 3000

# Update Package Index, Upgrade Packages, and Cleanup
RUN apk update
RUN apk upgrade
RUN rm -rf /tmp/* /var/tmp/*

RUN mkdir -p /app && chown node /app
WORKDIR /app
USER node
COPY --chown=node . /app

RUN npm ci --omit=dev --omit=optional --ignore-scripts

ENTRYPOINT [ "node" ]
CMD [ "src/app.js" ]

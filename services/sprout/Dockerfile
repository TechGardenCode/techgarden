# FROM nginx:1.17.9

# ## Copy our default nginx config
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# ## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
# COPY ./dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]


FROM node:lts-slim
WORKDIR /usr/src/app
COPY ./dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
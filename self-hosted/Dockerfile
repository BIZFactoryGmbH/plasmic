FROM node:20.18.0-alpine3.20

# System setup
RUN apk add --no-cache bash=5.2.26-r0 make=4.4.1-r2 bubblewrap=0.10.0-r0 git=2.45.2-r0 python3=3.12.7-r0 rsync=3.3.0-r0
SHELL ["/bin/bash","-o", "pipefail","-l","-c"]

WORKDIR /plasmic

# Clone repo
RUN git clone https://github.com/BIZFactoryGmbH/plasmic.git /plasmic --depth 1 --branch feature/update-plasmic --single-branch

ARG CODEGEN_HOST=https://plasmic.staging.bizfactory.tech
ARG HOST=https://host.plasmic.staging.bizfactory.tech
ARG MAIL_CONFIG='{"mailFrom":"Plasmic <team@example.com>","mailUserOps":"ops@example.com"}'
ARG NODE_ENV=production
ARG PUBLIC_URL=https://plasmic.staging.bizfactory.tech
ARG REACT_APP_DEFAULT_HOST_URL=https://host.plasmic.staging.bizfactory.tech/static/host.html
ARG REACT_APP_PUBLIC_URL=https://plasmic.staging.bizfactory.tech
ARG REACT_APP_CDN_URL=https://plasmic.staging.bizfactory.tech
ARG SITE_ASSETS_BASE_URL=http://assets.plasmic.staging.bizfactory.tech/plasmic-site-assets/
ARG SITE_ASSETS_BUCKET=plasmic-site-assets

RUN yarn bootstrap; exit 0

RUN yarn setup && \
    yarn setup:canvas-packages

RUN cd platform/wab && \
    yarn build-css && \
    yarn build
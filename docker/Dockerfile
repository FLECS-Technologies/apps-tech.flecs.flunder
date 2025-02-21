#
# Copyright 2021-2023 FLECS Technologies GmbH

ARG ARCH
ARG VERSION
ARG VARIANT

FROM --platform=amd64 node:22 AS flunderdash-builder

ARG VERSION

RUN git clone --depth 1 --branch ${VERSION} \
    https://github.com/FLECS-Technologies/apps-tech.flecs.flunder.git \
    /usr/src/apps-tech.flecs.flunder

WORKDIR /usr/src/apps-tech.flecs.flunder/app/flunderdash

RUN npm ci && npm run build

FROM nginx:stable-bookworm AS flunder

ARG ARCH
ARG VERSION
ARG VARIANT

RUN [ ! -z "${ARCH}" ]
RUN [ ! -z "${VERSION}" ]

ADD docker/fs/ /

ADD docker/assets/zenoh-1.0.0-${ARCH}.tar.xz /

COPY --from=flunderdash-builder /usr/src/apps-tech.flecs.flunder/app/flunderdash/dist /usr/share/nginx/html

ENTRYPOINT [ "/entrypoint.sh" ]

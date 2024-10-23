#
# Copyright 2021-2023 FLECS Technologies GmbH

ARG ARCH
ARG VERSION
ARG VARIANT

FROM debian:bookworm-slim

ARG ARCH
ARG VERSION
ARG VARIANT

RUN [ ! -z "${ARCH}" ]
RUN [ ! -z "${VERSION}" ]

ADD docker/fs/ /

ADD docker/assets/zenoh-1.0.0-${ARCH}.tar.xz /

ENTRYPOINT [ "/entrypoint.sh" ]

# Dockerfile
FROM postgres:13

RUN apt-get update && apt-get install -y \
    build-essential \
    postgresql-server-dev-13 \
    git

RUN git clone https://github.com/ankane/pgvector.git \
    && cd pgvector \
    && make \
    && make install

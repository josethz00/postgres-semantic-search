# Dockerfile
FROM postgres:13

# Install build tools required to compile the extension
RUN apt-get update && apt-get install -y \
    build-essential \
    postgresql-server-dev-13 \
    git \
    ca-certificates

# Download the pgvector source code
RUN git clone https://github.com/ankane/pgvector.git

# Build and install the extension
RUN cd pgvector && make && make install

# Move pgvector files to the location where postgres looks for extensions
RUN cp /usr/local/share/postgresql/extension/pgvector* /usr/share/postgresql/13/extension/

# Create an initialization script while still root
RUN echo "CREATE EXTENSION IF NOT EXISTS pgvector;" > /docker-entrypoint-initdb.d/init-pgvector.sql

# Switch back to the postgres user
USER postgres

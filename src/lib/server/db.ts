import postgres from 'postgres';

// Create a postgres client with the connection string from .env
const sql = postgres("postgresql://denis:BJPV2Q9gNSKRnu7WUswZpL@db.style32.online:5432/EnglishProd", {
  max: 10, // Max number of connections in the pool
  idle_timeout: 30, // How long a connection can be idle before being closed
  connect_timeout: 30, // How long to wait for a connection
});

export { sql }; 
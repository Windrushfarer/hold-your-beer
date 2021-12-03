docker build -t prisma-server .
docker run -d -t -p 3001:3001 prisma-server
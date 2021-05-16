## Requirements

- Node 14.7.0+: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Yarn LTS: [https://classic.yarnpkg.com/en/docs/install/](https://classic.yarnpkg.com/en/docs/install/)
- Docker Desktop: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

## Environment setup

- Create a new RabbitMQ container
    - `docker run -d --hostname local-rabbitmq --name local-rabbitmq -p 8080:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management`
- Use tracking-simulator for simulating vehicle gps tracking data (using rabbitmq queues)
- Install mongodb container
- Use tracking-receiptor for receipting vehicles gps tracking data and persisting it
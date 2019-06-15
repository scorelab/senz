### :crystal_ball: SenZ Admin Panel

This is the admin panel for the senz server, dedicated to ease device management on the senz server.

### Run using docker (Once dependencies are installed)

- Remove the 'dbURI' option from dev.json in the config directory.

- Attach to containers using

```bash
docker-compose build
```

- Run containers using

```bash
docker-compose up
```

- Remove containers using

```bash
docker-compose down
```

### Run without docker

- Run the backend part.(PORT=8080)
- Run the frontend part.(PORT=3000)

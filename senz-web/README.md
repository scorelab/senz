## senz-web

[![API](https://img.shields.io/badge/API-documentation-success.svg?style=for-the-badge&logo=appveyor)](https://senzadmin.herokuapp.com/apidoc/) [![npm](https://img.shields.io/npm/v/senz)](https://www.npmjs.com/package/senz) ![GitHub](https://img.shields.io/github/license/scorelab/senz) ![Docker](https://img.shields.io/badge/image%20size-397%20MB-blue)

The Admin Panel to interact with the senz server.

## Setup and Installation

- [Backend](https://github.com/scorelab/senz/tree/master/senz-web/backend)
- [Frontend](https://github.com/scorelab/senz/tree/master/senz-web/frontend)

#### Running using docker

- Change the dbURI in the 'main.js' to point to docker.
- Attach to containers using

```
docker-compose build
```

- Run containers using

```
docker-compose up
```

- Remove containers using

```
docker-compose down
```

## Using the Admin Panel

- Generate your signature by logging in the admin panel.
- Create a project.
- Create devices and set the public keys.
- Set the device name corresponding to the public key using the query.

```
SHARE #pubkey <device-public-key> @senz #time <timestamp> ^<device-name> <signature>
```

- Send and receive data using the query.

```
DATA <data-string> @dev2 #time <timestamp> ^<device-name> <signature>
```

- Logout the device from the server.

```
UNSHARE #pubkey <device-public-key> @senz #time <timestamp> ^<device-name> <signature>
```

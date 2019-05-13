## Senz Admin Backend

This is the backend API for the admin-panel

### Installation

```bash
npm install
```
### Pre-Running
Create a dev.json file in the config directory with the following details.

```bash
{
"port":8080,
"dbURI":"URI of your database",
"secretKey":"Your secret key"
}
```

### Running

```bash
npm start
```
### Pre-Testing
Create a test.json file in the config directory with the following details.

```bash
{
"port":8080,
"dbURI":"URI of your testing database",
"secretKey":"Your secret key"
}
```

### Testing

```bash
npm test
```
### Documentation
The documentation of the API can be found here-
[Documentation](https://senzadmin.herokuapp.com/apidoc/)

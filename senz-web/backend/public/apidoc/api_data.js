define({ "api": [
  {
    "type": "delete",
    "url": "delete/:deviceId",
    "title": "Remove a device of a project",
    "group": "Devices",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "deviceId",
            "optional": false,
            "field": "id",
            "description": "<p>Device id</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 204 No Content\n{\n    \"Deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/deviceRoutes.js",
    "groupTitle": "Devices",
    "name": "DeleteDeleteDeviceid"
  },
  {
    "type": "get",
    "url": "device/:projectId",
    "title": "Get all the devices of a project",
    "group": "Devices",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "projectId",
            "optional": false,
            "field": "id",
            "description": "<p>Project id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Devices",
            "description": "<p>Device's list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "PublicKey",
            "description": "<p>Device's public key</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Device name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "project",
            "description": "<p>Project of the device</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of creation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "  HTTP/1.1 200 OK\n[\n {\n     \"project\": {\n         \"id\": \"5ca5837c93644d45649e73d7\"\n     },\n     \"_id\": \"5ca5d7a107ddd95f0a2e56b5\",\n     \"name\": \"device1\",\n     \"pubkey\": \"123@#\",\n     \"date\": \"2019-04-04T10:08:33.025Z\",\n     \"__v\": 0\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Task not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/deviceRoutes.js",
    "groupTitle": "Devices",
    "name": "GetDeviceProjectid"
  },
  {
    "type": "post",
    "url": "device/:projectId",
    "title": "Create a new device",
    "group": "Devices",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "projectId",
            "optional": false,
            "field": "id",
            "description": "<p>Project id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"Device1\",\n  \"pubkey\":\"123#$\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Device name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pubkey",
            "description": "<p>Device's public key</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "project",
            "description": "<p>Project of the device</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of creation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n{\n  \"project\": {\n      \"id\": \"5ca5837c93644d45649e73d7\"\n  },\n  \"_id\": \"5ca5d7a107ddd95f0a2e56b5\",\n  \"name\": \"device1\",\n  \"pubkey\": \"123@#\",\n  \"date\": \"2019-04-04T10:08:33.025Z\",\n  \"__v\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"auth\":false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/deviceRoutes.js",
    "groupTitle": "Devices",
    "name": "PostDeviceProjectid"
  },
  {
    "type": "delete",
    "url": "project/:userId/delete/:projectId",
    "title": "Remove a project of a user",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "userId",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 204 No Content\n{\n    \"Deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/projectRoutes.js",
    "groupTitle": "Projects",
    "name": "DeleteProjectUseridDeleteProjectid"
  },
  {
    "type": "get",
    "url": "project/:userid/all",
    "title": "Get all the projects of a user",
    "group": "Projects",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "userId",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Projects",
            "description": "<p>Project's list</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Project name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "devices",
            "description": "<p>Devices of a project</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of creation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n[\n  {\n   \"devices\": [],\n   \"_id\": \"5ca5837c93644d45649e73d7\",\n  \"name\": \"Project1\",\n   \"date\": \"2019-04-04T04:09:32.895Z\",\n   \"__v\": 0\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Task not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Find error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/projectRoutes.js",
    "groupTitle": "Projects",
    "name": "GetProjectUseridAll"
  },
  {
    "type": "post",
    "url": "project/:userid/new",
    "title": "Create a new project",
    "group": "Projects",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Authorization\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "userId",
            "optional": false,
            "field": "id",
            "description": "<p>User id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"Project1\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Project name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id of the project</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "devices",
            "description": "<p>Devices of a project</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "date",
            "description": "<p>Date of creation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"devices\": [],\n  \"_id\": \"5ca5837c93644d45649e73d7\",\n  \"name\": \"Project1\",\n  \"date\": \"2019-04-04T04:09:32.895Z\",\n  \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"auth\":false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/projectRoutes.js",
    "groupTitle": "Projects",
    "name": "PostProjectUseridNew"
  },
  {
    "type": "post",
    "url": "api/login",
    "title": "Login a new User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"yash123@gmail.com\",\n  \"password\":\"yash123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auth",
            "description": "<p>authentication state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"auth\": true,\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTUxMzFmOTUzYmNmMGNhOThlN2Q3OCIsIm5hbWUiOiJ5YXNoIiwiaWF0IjoxNTU0MzIyNDQyLCJleHAiOjE1NTQ0MDg4NDJ9.9lQ_IN0AZjfcJoGh-f9F8HmG3Yt-RghMGhLxqGpYJJs\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"Error on the server.\"\n}\nHTTP/1.1 404 Not Found\n{\n  \"No user found\"\n}\nHTTP/1.1 401\n{\n  \"auth\":false,\n   \"token\":null\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/userRoutes.js",
    "groupTitle": "Users",
    "name": "PostApiLogin"
  },
  {
    "type": "post",
    "url": "api/register",
    "title": "Register a new user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"Yash\",\n  \"email\": \"yash123@gmail.com\",\n  \"password\":\"yash123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "auth",
            "description": "<p>authentication state</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"auth\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"auth\":false\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./routes/userRoutes.js",
    "groupTitle": "Users",
    "name": "PostApiRegister"
  }
] });

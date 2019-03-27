# Senz

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://raw.githubusercontent.com/sumedhe/senz/master/LICENSE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1e53e1509f714cf781df157ace7a0cf9)](https://www.codacy.com/app/sumedhe/senz?utm_source=github.com&utm_medium=referral&utm_content=scorelab/senz&utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/scorelab/senz.svg?branch=master)](https://travis-ci.org/scorelab/senz)
[![Gitter chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/scorelab/senz)

SenZ is a new kind of query language that can be used to communicate with IoT devices. It is easily integrable, incredibly fast, and is in the highest end of security integration. Also, it is developed live. As said earlier SenZ uses a #twitter like messaging syntax which makes this language more usable, powerful, and understandable. The communication between each of these devices are done via the MySensors switch which was developed using Python; a high-end application switch which works as a message broker. Once client devices are registered in the switch they should share their data to specific people (other client devices). Then, they are capable of sharing messages accordingly.

![SenZ](https://user-images.githubusercontent.com/2020370/40389831-fbb0b9a8-5e30-11e8-93da-496632d20d12.png)

Currently, the MySensors switch is implemented on two languages: one is Python and the other one is Scala. In either case it doesn't matter in which language your clients are built on. You can use either of the implementations to suit your product. As of now there are two implementations which work on the UDP packet connection and TCP packet connections.

# Internal Working

SenZ uses five types of messages for the communication:

| Type    | Description                                                                                    |
| ------- | ---------------------------------------------------------------------------------------------- |
| SHARE   | Share some attributes to some client/device                                                    |
| UNSHARE | Stop sharing some attributes                                                                   |
| GET     | Request a SHARES attribute from a client/device                                                |
| PUT     | To do some alternation to the device. When you need to control some device/application/client. |
| DATA    | Reply to a GET, PUT or a SHARE. To send the reply with the requested data.                     |

SenZ messages follow a Twitter-like message structure.

    <type> #<attribute name> <attribute value> #time <current timestamp> @<receiver> ^<sender> <digital signature>

| Tag                    | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| &lt;type>              | Type of the message. One of the types from SHARE, UNSHARE, GET, PUT, DATA              |
| #&lt;attribute name>   | Name of the attribute you need to use in the message. It depends on your purpose.      |
| $&lt;attribute name>   | Name of the attribute which is encrypted                                               |
| &lt;attribute value>   | Value of the attribute you are sharing                                                 |
| #time                  | The attribute to represent the current timestamp. This has to be sent in every message |
| &lt;current timestamp> | This is the value of the time attribute                                                |
| @&lt;receiver>         | This is the user name of the receiver of the message                                   |
| ^&lt;sender>           | This is the user name of the sender of the message                                     |
| &lt;digital signature> | The digital signature which is used by SenZ-switch to verify the sender                |

# Setting up the project

[Senz server](senz-server/README.md)

## Sample programs

-   [Python](senz-client-samples/python/README.md)
-   [JavaScript](senz-client-samples/javascript/README.md)

# How to Contribute

## Issues

Feel free to submit issues and enhancement requests.

## Contribute

1.  **Fork** the repo on GitHub
2.  **Clone** the project to your own machine
3.  **Commit** changes to your own branch
4.  **Push** your work back up to your fork
5.  Submit a **Pull request** so that we can review your changes

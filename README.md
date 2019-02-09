# Senz

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1fe7fd504fa64047a287a046cc92f213)](https://app.codacy.com/app/sumedhe/senz?utm_source=github.com&utm_medium=referral&utm_content=sumedhe/senz&utm_campaign=badger) [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://raw.githubusercontent.com/sumedhe/senz/master/LICENSE) [![Build Status](https://travis-ci.org/sumedhe/senz.svg)](https://travis-ci.org/sumedhe/senz)

SenZ is a new kind of query language that can be used to communicate with IoT devices. It is easily integrable, incredibly fast, and is in the highest end of security integration. Also, it is developed live. As said earlier SenZ uses a #twitter like messaging syntax which makes this language more usable, powerful, and understandable. The communication between each of these devices are done via the MySensors switch which was developed using Python; a high-end application switch which works as a message broker. Once client devices are registered in the switch they should share their data to specific people (other client devices). Then, they are capable of sharing messages accordingly.

![SenZ](https://user-images.githubusercontent.com/2020370/40389831-fbb0b9a8-5e30-11e8-93da-496632d20d12.png)

Currently, the MySensors switch is implemented on two languages: one is Python and the other one is Scala. In either case it doesn't matter in which language your clients are built on. You can use either of the implementations to suit your product. As of now there are two implementations which work on the UDP packet connection and TCP packet connections.

# Internal Working
SenZ uses five types of messages for the communication:

| Type | Description |
| ------- | ------- |
| SHARE |  Share some attributes to some client/device |
| UNSHARE | Stop sharing some attributes |
| GET | Request a SHARES attribute from a client/device |
| PUT | To do some alternation to the device. When you need to control some device/application/client. |
| DATA | Reply to a GET, PUT or a SHARE. To send the reply with the requested data. |

SenZ messages follow a Twitter-like message structure.

    <type> #<attribute name> <attribute value> #time <current timestamp> @<receiver> ^<sender> <digital signature>

| Tag | Description |
| --- | ----------- |
| &lt;type&gt; | Type of the message. One of the types from SHARE, UNSHARE, GET, PUT, DATA
| #&lt;attribute name&gt; | Name of the attribute you need to use in the message. It depends on your purpose. |
| $&lt;attribute name&gt; | Name of the attribute which is encrypted |
| &lt;attribute value&gt; | Value of the attribute you are sharing |
| #time | The attribute to represent the current timestamp. This has to be sent in every message |
| &lt;current timestamp&gt; | This is the value of the time attribute |
| @&lt;receiver&gt; | This is the user name of the receiver of the message |
| ^&lt;sender&gt; | This is the user name of the sender of the message |
| &lt;digital signature&gt; | The digital signature which is used by SenZ-switch to verify the sender |

# Setting up the project
These are the instructions on how to setup the project:
## Pre-requisites
- Scala 2.12.6 or higher
- MongoDB Community edition (Server)

## Run server
1. `cd` in to the project folder
2. Run `sbt run`

## Run tests
1. `cd` in to the project folder
2. Run `sbt test`

# Running sample Codes

## Python

#### Pre-requisites
- Python 2
- pip

```bash
pip install pycrypto
cd samples/python
python receiver.py
python sender.py
```
## NodeJS

#### Pre-requisites
- node
- npm

```bash
cd samples/javascript
npm install
cd transfer_image
node sender.js
node receiver.js
```

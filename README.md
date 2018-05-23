# Senz
SenZ is a new kind of query language that can be used to communicate with IoT Devices . It is easily integrable, Ultimately fast and is in the Highest end of security integration. Also it is lively developed accordingly. As it is said earlier this uses a #twitter like massaging syntax which has made this language a usable, more powerful and understandable. The communication between each of these devices are done via the My sensors switch which was developed using python, A high-end application switch which works as a massage broker. Once client devices are registered in the switch they should share their data to specific people (Other client devices). Then they are capable of sharing massages accordingly.

![PlayToLearn](https://user-images.githubusercontent.com/2020370/40389831-fbb0b9a8-5e30-11e8-93da-496632d20d12.png)

Currently MySensors switch is implemented on two languages one is Python and the other one is Scala. In either case it doesn't matter in which language your clients are built on. You can use either of the implementations to suit your product. Currently there are two implementation which works on UDP packet connection and TCP packet connections.

## Internal Working
SenZ uses five types of messages for the communication

| Type | Description |
| ------- | ------- |
| SHARE |  Share some attributes to some client/device |
| UNSHARE | Stop sharing some attributes |
| GET | Request a SHARES attribute from a client/device |
| PUT | To do some alternation to the device. When you need to control some device/application/client. |
| DATA | Reply to a GET, PUT or a SHARE. To send the reply with the requested data. |

SenZ messages follow a twitter like message structure.

    <type> #<attribute name> <attribute value> #time <current timestamp> @<receiver> ^<sender> <digital signature>

| Tag | Description |
| --- | ----------- |
| &lt;type&gt; | Type of the message. One of the types from SHARE, UNSHARE, GET, PUT, DATA
| #&lt;attribute name&gt; | Name of the attribute you need to use in the message. It depends on your purpose. |
| $&lt;attribute name&gt; | Name of the attribute which is encrypted |
| &lt;attribute value&gt; | Value of the attribute you are sharing |
| #time | The attribute to represent the current timestamp. This has to be sent in every messages |
| &lt;current timestamp&gt; | This is the value of the time attribute |
| @&lt;receiver&gt; | This is the user name of the receiver of the massage |
| ^&lt;sender&gt; | This is the user name of the sender of the massage |
| &lt;digital signature&gt; | The digital signature which is used by SenZ-switch to verify the sender |

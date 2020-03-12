# Sample Client : Transfer Image (python)

### Pre running Steps
1. Setup and run [senz-switch](../../senz-switch/README.md).
2. Now setup and Run senz-web client both [frontend](../../senz-web/frontend/README.md) and [backend](../../senz-web/backend/README.md).
3. Now click on your profile icon and then click on My signature to get your signature.
4. In order to communicate between 2 devices you need to add both the devices in the same project. So if not added then add 2 devices in any of your projects.
5. Now go to device_1 folder for [sender.py](./device_1/sender.py) and device_2 folder for [receiver.py](./device_2/receiver.py) file replace the signature and pubkey with your signature and pubkey respectively. Also make sure that sender and reciever pubkeys are different.

## Instructions

1.  Install required packages

    ```sh
    pip install -r requirements.txt
    ```

2.  Run receiver device
    ```sh
    cd device_2
    python3 receiver.py
    ```
3.  Run sender device
    ```sh
    cd device_1
    python3 sender.py
    ```

4.  In order to run tests first install the pytest package
    `pip install pytest`

    and then in terminal run 

    `pytest`

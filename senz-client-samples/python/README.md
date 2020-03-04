# Sample Client : Transfer Image (python)

## Instructions

1.  Install required packages

    ```sh
    pip install -r requirements.txt
    ```

2.  Setup and run [Senz server](../../senz-server/README.md)

3.  Run receiver device
    ```sh
    cd device_2
    python3 receiver.py
    ```
4.  Run sender device
    ```sh
    cd device_1
    python3 sender.py
    ```

5.  In order to run tests first install the pytest package
    `pip install pytest`

    and then in terminal run 

    `pytest`

    
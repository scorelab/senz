# Rust Sample Client

### Pre running Steps
1. Setup and run [senz-switch](../../senz-switch/README.md).
2. Now setup and Run senz-web client both [frontend](../../senz-web/frontend/README.md) and [backend](../../senz-web/backend/README.md).
3. Now click on your profile icon and then click on My signature to get your signature.
4. In order to communicate between 2 devices you need to add both the devices in the same project. So if not added then add 2 devices in any of your projects.
5. Now in [main.rs](./rust-sender/src/main.rs) under rust-sender/src folder and in [main.rs](./rust-receiver/src/main.rs) file under rust-receiver/src folder replace the signature and pubkey with your signature and pubkey respectively. Also make sure that sender and reciever pubkeys are different.

## Instructions

1.  Install requirements

    Rust version 1.33.0 <br> 
    Cargo version 1.33.0

    Dependencies requirements <br>
    sodiumoxide = "0.2.1"<br>
    base64 = "0.10.1"<br>
    chrono = "0.4"  <br>

    


2.  Run receiver device
    ```sh
    cd rust-receiver
    cargo run
    ```
3.  Run sender device
    ```sh
    cd rust-sender
    cargo run
    ```

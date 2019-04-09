# Rust Sample Client

## Instructions

1.  Install requirements

    Rust version 1.33.0 <br> 
    Cargo version 1.33.0

    Dependencies requirements <br>
    sodiumoxide = "0.2.1"<br>
    base64 = "0.10.1"<br>
    chrono = "0.4"  <br>

    

2.  Setup and run [Senz server](../../senz-server/README.md)

3.  Run receiver device
    ```sh
    cd rust-receiver
    cargo run
    ```
4.  Run sender device
    ```sh
    cd rust-sender
    cargo run
    ```

# Sample Client : Transfer Image (python)

## Instructions
1. Setup and run senz server

2. Run receiver device
    ```
    $ cd device_2
    $ python receiver.py
    Registering...
    [Server] DATA #msg OK #time 20181123110507+05 @dev2 ^senz
    
    Ready to receive image
    Image received..
    Image saved (received.jpg)
    ```
    
     
3. Run sender device
    ```
    $ cd device_1
    $ python sender.py
    Registering device...
    [Server] DATA #msg OK #time 20181123110309+05 @dev1 ^senz
    
    Press enter to send the image...
    
    [Server] Message is sent to the device dev2
        
    ```
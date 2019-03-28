extern crate chrono;

use std::net::{TcpStream};
use std::io::{Read, Write};
use chrono::{DateTime, Utc};



// Function to receive messeges from server 
fn receive_mes(mut stream: TcpStream){

    let mut data = [0; 1024]; 
            match stream.read(&mut data) {
                Ok(_) => {
                println!("{}",String::from_utf8_lossy(&data[..]));
                },
                Err(e) => {
                    println!("Failed to receive data: {}", e);
                }
            }

}

// Function to register a device
fn register_dev(dev: String, time: String){

    match TcpStream::connect("localhost:2552") {
            Ok(mut stream) => {
                println!("Successfully registered in server");

                let msg = format!("SHARE #pubkey KEY @senz #time {} ^{} signature ",time,dev);

                stream.write(msg.as_bytes()).unwrap();
                println!("Server response:");

                let mut data = [0; 1024]; 
                match stream.read(&mut data) {
                    Ok(_) => {
                    println!("{}",String::from_utf8_lossy(&data[..]));
                    println!("Ready to receive a image");
                    receive_mes(stream);
                    },
                    Err(e) => {
                        println!("Failed to receive data: {}", e);
                    }
                }
                
            },
            Err(e) => {
                println!("Failed to connect: {}", e);
            }
        }
        println!("Terminated.");
    }



fn main() {
    let device = "device_1"; //device name
    
    let now: DateTime<Utc> = Utc::now(); // timestamp
    
    register_dev(device.to_string(),now.to_string());
}

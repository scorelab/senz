extern crate chrono;

use std::net::{TcpStream};
use std::io::{Read, Write};
use chrono::{DateTime, Utc};



// Function to send messeges to server 
fn send_mes(mut stream: TcpStream, mes: String){

    stream.write(mes.as_bytes()).unwrap();

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
                    println!("Ready to send a image");
                    let now: DateTime<Utc> = Utc::now(); // timestamp
                    let img = format!("DATA $image test_data @device_1 #time {} ^device_2 signature\n",now);
                    send_mes(stream, img.to_string());
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
    let device = "device_2"; //device name
    
    let now: DateTime<Utc> = Utc::now(); // timestamp
    
    register_dev(device.to_string(),now.to_string());
}
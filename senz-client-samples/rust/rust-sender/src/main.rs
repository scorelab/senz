extern crate chrono;

use std::net::{TcpStream};
use std::io::{Read, Write};
use chrono::{DateTime, Utc};

use sodiumoxide::crypto::secretbox;
use sodiumoxide::crypto::secretbox::xsalsa20poly1305::Key;
use sodiumoxide::crypto::secretbox::xsalsa20poly1305::Nonce;
use base64::{encode, decode};

static SEC_NONCE: &str = "dW3gh5r7DFj25gKd74kl99e5nHL47t1j";

static SEC_KEY: &str = "dW3gh5r7DFj25gKd74kl99e5nHL47t1j";


pub fn from_slice(bytes: &[u8]) -> [u8; 32] {
    let mut array = [0; 32];
    let bytes = &bytes[..array.len()]; 
    array.copy_from_slice(bytes); 
    array
}
pub fn from_nslice(bytes: &[u8]) -> [u8; 24] {
    let mut array = [0; 24];
    let bytes = &bytes[..array.len()]; 
    array.copy_from_slice(bytes); 
    array
}


// Function to Encrypt (AES)

 pub fn encryp(mes: String, sec: Key, nor: Nonce) -> String {
    let key = sec;
    let nonce = nor;
    let plaintext = mes.as_bytes();
    let ciphertext = secretbox::seal(plaintext, &nonce, &key);
    let enc_ciper = encode(&ciphertext);
    return(enc_ciper);
} 

fn senz_encrypt(messege: String) -> String{
    let no = from_nslice(SEC_NONCE.to_string().as_bytes());
    let nonce_g = Nonce(no);
    let ke = from_slice(SEC_KEY.to_string().as_bytes());
    let key_g = Key(ke);
    let tex = encryp(messege,key_g, nonce_g);
    return tex
}


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
                    let encrypted_messege = senz_encrypt("test image-data".to_string());
                    let img = format!("DATA $image {} @device_1 #time {} ^device_2 signature\n",encrypted_messege,now);
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

import * as crypto from 'crypto';


import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Generate a new keypair
const keypair = Keypair.generate();

// Extract the public and private keys
const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

// Display the keys
console.log("Public Key:", publicKey);
console.log("Private Key (Secret Key):", secretKey);

// Convert the message "hello world" to a Uint8Array
const message = new TextEncoder().encode("hello world");

const signature = nacl.sign.detached(message, secretKey);
const result = nacl.sign.detached.verify(
  message,
  signature,
  keypair.publicKey.toBytes(),
);

console.log(result);
function hash(input : string){
    const output = crypto.createHash('sha256').update(input).digest('hex')
    console.log(output)
}


//hash("2");

function mint(prefix : string){
    let input = 0;
    while(true){
        let inputstr = input.toString();
        const val = crypto.createHash('sha256').update(inputstr).digest('hex')
        if(val.startsWith(prefix)){
           console.log(val,inputstr);
        }
        input++;
    }
}
//mint("000000")

function nonce(prefix : string, word : string){
    let input = 0;
    while(true){
        let inputstr = word +  input.toString();
        const val = crypto.createHash('sha256').update(inputstr).digest('hex')
        if(val.startsWith(prefix)){
           console.log(val,inputstr);
        }
        input++;
    }
}
// nonce("00000", "Ram => Ankit | Rs 10")

function asciiToBytes(asciiString : string) {
    const byteArray = [];
    for (let i = 0; i < asciiString.length; i++) {
      byteArray.push(asciiString.charCodeAt(i));
    }
    return byteArray;
  }
  
  
  const ascii = "Hello";
  const byteArray = asciiToBytes(ascii);
  //console.log(byteArray); 

  const uint8Array = new Uint8Array([72, 101, 108, 108, 111]);
const base64Encoded = Buffer.from(uint8Array).toString("base64");
 // console.log(base64Encoded);
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { PublicKey } from "@solana/web3.js"


const userAddress = new PublicKey("Bs81VEDezeWxTwyQsm8pPXWRVn41QSQbGmHSnJZzrQWY")
const tokenAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

function getATA(){
    return PublicKey.findProgramAddressSync(
        [
            userAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenAddress.toBuffer()
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    )
}

const[associatedToken , bump ]=getATA()
console.log("ata:",associatedToken.toBase58() , "bump : ",bump )
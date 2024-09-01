"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
// Initialize the connection to the devnet via Alchemy
const connection = new web3_js_1.Connection("https://solana-devnet.g.alchemy.com/v2/qlsrTkNGjnuK46GWAC2AVAaVnVZ2ylVf");
function airdrop(to, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lamports = amount * web3_js_1.LAMPORTS_PER_SOL;
            const publicKey = new web3_js_1.PublicKey(to);
            // Request the airdrop
            const airdropSignature = yield connection.requestAirdrop(publicKey, lamports);
            console.log("Airdrop signature:", airdropSignature);
            // Confirm the transaction
            const confirmation = yield connection.confirmTransaction(airdropSignature);
            console.log("Airdrop confirmation:", confirmation);
        }
        catch (error) {
            console.error("Error during airdrop:", error);
        }
    });
}
// Call the airdrop function
airdrop("4PBUECPpQMetbP7eFGQ9udguzVAovjEJjnVyEv13LMxe", 5);

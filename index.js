const crypto = require('crypto');
const bitcoin = require('bitcoinjs-lib');
const request = require('request');

// Konfigurasi koneksi ke node Bitcoin
const rpcConfig = {
  url: 'http://localhost:8332', // Ganti dengan URL dan port node Bitcoin Anda
  method: 'POST',
  auth: {
    username: 'rpcUsername', // Ganti dengan username RPC Anda
    password: 'rpcPassword', // Ganti dengan password RPC Anda
  },
  jsonrpc: '2.0', // Versi JSON-RPC
};

// Fungsi untuk generate hash
function generateHash(data, nonce) {
  const hash = crypto.createHash('sha256');
  hash.update(data + nonce);
  return hash.digest('hex');
}

// Fungsi untuk validasi nilai hash berdasarkan kesulitan
function validateHash(hash, difficulty) {
  const target = '0'.repeat(difficulty);
  return hash.slice(0, difficulty) === target;
}

// Fungsi untuk mengirim hadiah ke wallet
// function sendRewardToWallet(walletAddress, rewardAmount) {
//   const keyPair = bitcoin.ECPair.fromWIF('privateKey'); // Ganti dengan kunci privat Anda
//   const tx = new bitcoin.TransactionBuilder(); // Membuat transaksi
//   tx.addInput('previousTransactionHash', 0); // Menambahkan input transaksi sebelumnya
//   tx.addOutput(walletAddress, rewardAmount); // Menambahkan output ke wallet
//   tx.sign(0, keyPair); // Tanda tangani transaksi

//   // Kirim transaksi ke jaringan Bitcoin (contoh: menggunakan layanan blockchain.info)
//   request.post('https://blockchain.info/pushtx', {
//     form: {
//       tx: tx.build().toHex(),
//     },
//   }, (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       console.log('Reward sent successfully!');
//     } else {
//       console.error('Error sending reward:', error);
//     }
//   });
// }

const dataToMine = 'Hello, World!';
const difficulty = 4; // Tingkat kesulitan penambangan
const rewardAmount = 0.001; // Jumlah reward yang akan dikirim
// const walletAddress = 'YourWalletAddress'; // Ganti dengan alamat wallet penerima reward

let nonce = 0;
let minedHash = generateHash(dataToMine, nonce);

// Terus menerus mencari hash yang valid
function mine() {
    console.log('Hash yang tidak valid ditemukan!');
  console.log('Nonce:', nonce);
  console.log('Hash:', minedHash);
  while (!validateHash(minedHash, difficulty)) {
    nonce++;
    minedHash = generateHash(dataToMine, nonce);
  }

  console.log('Hash yang valid ditemukan!');
  console.log('Nonce:', nonce);
  console.log('Hash:', minedHash);

  // Kirim reward ke wallet jika hash valid
//   sendRewardToWallet(walletAddress, rewardAmount);

  // Mulai penambangan lagi
  nonce = 0;
  minedHash = generateHash(dataToMine, nonce);
  setTimeout(mine, 100); // Coba kembali setelah 100ms (atur sesuai kebutuhan)
}

mine(); // Memulai penambangan

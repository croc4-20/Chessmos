
async function walletConnect() {
  console.log("Keplr connect called!");

  // Here you should be able to use apolloClient and stargateClient
  // But make sure they are initialized before using them

  // Initialize Keplr
   if (window.keplr) 
   {
    console.log("Keplr found");
    await window.keplr.enable("stargaze-1");

    const offlineSigner = window.getOfflineSigner("stargaze-1");
    const accounts = await offlineSigner.getAccounts();

    console.log("Connected wallet address:", accounts[0].address);
    // console.log("trying to fetch nft on users adress");
  //   fetchNFTByAddress("stars18d7ver7mmjdt06mz6x0pz09862060kupju75kpka5j0r7huearcsq0gyg0")
  // .catch(console.error);
    //await fetchCollection('accounts[0].address');
  } else {
    console.log("Keplr extension not found!");
  }



}
document.addEventListener("DOMContentLoaded", function() {
  var connectButton = document.querySelector("#connectWalletButton");
  
  // Add a click event listener to the button
  connectButton.addEventListener('click', function() {
    walletConnect();
  });
});

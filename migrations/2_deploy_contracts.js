var SimpleStorage = artifacts.require("SimpleStorage");

module.exports = async function (deployer) {
  try {
    await deployer.deploy(SimpleStorage);
    const contract = await SimpleStorage.deployed();
    console.log(`contract deployed to:"${contract.address}`);
  } catch (e) {
    console.error(e);
  }
};
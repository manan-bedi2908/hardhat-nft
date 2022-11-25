const { network } = require("hardhat")
const { developmentChains, mainnet } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("---------------------------------------------")

    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying contract...")
        await verify(basicNft.address, args)
    }
}

module.exports.tags = ["all", "BasicNft", "main"]

import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts/index'

export const FACTORY_ADDRESS = '0x2FC7B621aB51108e3108dD0EbCE76cb05545743a'

export const REFERENCE_TOKEN = '0xCF4825F0dCaEAa158310473C1FFF1980Acb5b9F7' // WETH

// Stablecoin pair addresses (actual pair addresses needed)
export const STABLE_TOKEN_PAIRS: string[] = [
  // Add TestToken/WETH pair address here
  // Example: '0x...' // TestToken/WETH pair address
  // You need to get the actual pair address from UniswapV2Factory
]

// Whitelisted tokens for liquidity tracking
export const WHITELIST: string[] = [
  '0xCF4825F0dCaEAa158310473C1FFF1980Acb5b9F7', // WETH
  '0x35364563485c4f6204677A414b66cb68474F4cD8', // TestToken (stablecoin)
]

// Stablecoin addresses
export const STABLECOINS: string[] = [
  '0x35364563485c4f6204677A414b66cb68474F4cD8', // TestToken (stablecoin)
]

// Lower thresholds for testnet
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('100')
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('0.01')

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = [
  {
    address: Address.fromString('0xCF4825F0dCaEAa158310473C1FFF1980Acb5b9F7'),
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: BigInt.fromI32(18),
  },
  {
    address: Address.fromString('0x35364563485c4f6204677A414b66cb68474F4cD8'),
    symbol: 'TEST', // Or change to 'USDT', 'USDC' etc. for stablecoin symbols
    name: 'Test Token', // Or change to 'Tether USD', 'USD Coin' etc.
    decimals: BigInt.fromI32(18), // Please confirm actual precision
  },
]

export const SKIP_TOTAL_SUPPLY: string[] = [] 
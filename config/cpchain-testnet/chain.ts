import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts/index'

export const FACTORY_ADDRESS = '0x593b44b2C309468072A8f4d952a085E25A4E8E48'

export const REFERENCE_TOKEN = '0xC18eA88732464dc5E38372A7Fb1d30b56Dd0E4d5' // WETH

// Stablecoin pair addresses (actual pair addresses needed)
export const STABLE_TOKEN_PAIRS: string[] = [
  // Add TestToken/WETH pair address here
  // Example: '0x...' // TestToken/WETH pair address
  // You need to get the actual pair address from UniswapV2Factory
]

// Whitelisted tokens for liquidity tracking
export const WHITELIST: string[] = [
  '0xC18eA88732464dc5E38372A7Fb1d30b56Dd0E4d5', // WETH
  '0x4cFBbe212366bf31DF01F5188d759c738a757509', // TestToken (stablecoin)
]

// Stablecoin addresses
export const STABLECOINS: string[] = [
  '0x4cFBbe212366bf31DF01F5188d759c738a757509', // TestToken (stablecoin)
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
    address: Address.fromString('0xC18eA88732464dc5E38372A7Fb1d30b56Dd0E4d5'),
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: BigInt.fromI32(18),
  },
  {
    address: Address.fromString('0x4cFBbe212366bf31DF01F5188d759c738a757509'),
    symbol: 'TEST', // Or change to 'USDT', 'USDC' etc. for stablecoin symbols
    name: 'Test Token', // Or change to 'Tether USD', 'USD Coin' etc.
    decimals: BigInt.fromI32(18), // Please confirm actual precision
  },
]

export const SKIP_TOTAL_SUPPLY: string[] = [] 
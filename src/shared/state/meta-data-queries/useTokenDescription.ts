import { Address } from "viem";
import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  DEGEN_ADDRESS,
  SEAM_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
} from "@meta";

export interface FullTokenData {
  description?: string;
}

interface ITokenDescriptionDict {
  [address: Address]: {
    lendingTitle: string;
    strategyTitle: string;
    strategyDescription?: string;
    description: string;
    secondaryStrategyTitle?: string;
  };
}

export const TokenDescriptionDict: ITokenDescriptionDict = {
  [WETH_ADDRESS]: {
    lendingTitle: "Supply WETH",
    strategyTitle: "Multiply ETH Long",
    secondaryStrategyTitle: "Increase ETH price exposure",
    strategyDescription:
      "This Integrated Liquidity Market (ILM) uses ETH deposits to borrow USDC, which is used to purchase more ETH to achieve the targeted multiple",
    description: "Wrapped Ethereum (WETH) allows Ethereum to be traded & used directly in smart contracts.",
  },
  [WSTETH_ADDRESS]: {
    lendingTitle: "Supply wstETH",
    strategyTitle: "Boost wstETH",
    secondaryStrategyTitle: "Increase ETH staking rewards automatically",
    strategyDescription:
      "This Integrated Liquidity Market (ILM) uses wstETH deposits to borrow ETH, which is used to purchase more wstETH to achieve the targeted multiple.",
    description:
      "wstETH is a wrapped version of stETH. Due to the nature of Lido, the amount of stETH on your balance is not constant - it changes daily as staking rewards come in.",
  },
  [CBETH_ADDRESS]: {
    lendingTitle: "Supply cbETH",
    strategyTitle: "Multiply cbETH staking rewards",
    description: "Coinbase ETH (cbETH) represents Ethereum staked through Coinbase, earning interest over time.",
  },
  [USDBC_ADDRESS]: {
    lendingTitle: "Supply USDbC",
    strategyTitle: "Multiply USDbC staking rewards",
    description: "USD Base Coin (USDbC) is a stablecoin pegged to the USD, providing a stable value for transactions.",
  },
  [DAI_ADDRESS]: {
    lendingTitle: "Supply DAI",
    strategyTitle: "Multiply DAI staking rewards",
    description: "Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar.",
  },
  [USDC_ADDRESS]: {
    lendingTitle: "Supply USDC",
    strategyTitle: "Multiply USDC staking rewards",
    description: "USD Coin (USDC) is a digital stablecoin that is pegged to the United States dollar.",
  },
  [SEAM_ADDRESS]: {
    lendingTitle: "Supply SEAM",
    strategyTitle: "Multiply SEAM staking rewards",
    description: "SEAM is the fair launch utility governance token of Seamless Protocol.",
  },
  [DEGEN_ADDRESS]: {
    lendingTitle: "Supply DEGEN",
    strategyTitle: "Multiply Degen staking rewards",
    description:
      "DEGEN is dubbed as the unofficial token created for the Farcaster community, a decentralized social network.",
  },
};

export const getTokenDescription = (token: Address | undefined, isStrategy: boolean): string | undefined => {
  if (!token) return undefined;
  return isStrategy ? TokenDescriptionDict[token]?.strategyDescription : TokenDescriptionDict[token]?.description;
};

export const getTokenTitle = (token: Address, isStrategy?: boolean): string | undefined => {
  return isStrategy ? TokenDescriptionDict[token]?.strategyTitle : TokenDescriptionDict[token]?.lendingTitle;
};

export const getOverridenName = (token: Address, name?: string, isStrategy?: boolean) => {
  if (isStrategy && TokenDescriptionDict[token]?.secondaryStrategyTitle)
    return TokenDescriptionDict[token]?.secondaryStrategyTitle;

  return name;
};

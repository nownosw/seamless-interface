import {
  CBETH_ADDRESS,
  DAI_ADDRESS,
  USDBC_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WSTETH_ADDRESS,
  sWETH_ADDRESS,
  wstETHBooster_ADDRESS,
} from "./constants";
import { Address } from "viem";

import wethLogo from "@assets/tokens/weth.svg";
import WstEthLogo from "@assets/tokens/wsteth.svg";
import ilmwstETHLogo from "@assets/tokens/ilmwstETH.svg";
import cbethLogo from "@assets/tokens/cbeth.svg";
import usdbcLogo from "@assets/tokens/usdbc.svg";
import daiLogo from "@assets/tokens/dai.svg";
import usdcLogo from "@assets/tokens/usdc.svg";

interface ITokenDataDict {
  [address: Address]: {
    name?: string;
    logo: string;
  };
}

export const TokenDataDict: ITokenDataDict = {
  [WETH_ADDRESS]: {
    logo: wethLogo,
  },
  [sWETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [WSTETH_ADDRESS]: {
    logo: WstEthLogo,
  },
  [wstETHBooster_ADDRESS]: {
    name: "wstETH Booster",
    logo: ilmwstETHLogo,
  },
  // Adding the missing contracts
  [CBETH_ADDRESS]: {
    logo: cbethLogo,
  },
  [USDBC_ADDRESS]: {
    logo: usdbcLogo,
  },
  [DAI_ADDRESS]: {
    logo: daiLogo,
  },
  [USDC_ADDRESS]: {
    logo: usdcLogo,
  },
};
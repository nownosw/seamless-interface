import React from "react";
import {
  FlexCol,
  FlexRow,
  Typography,
  DisplayValue,
  DisplayPercentage,
  DisplayMoney,
  DisplayText,
  Icon,
  SmallWatchAssetButton,
  SmallExternalLinkButton,
  Dropdown,
  useToken,
  useWatchAsset,
  Tooltip,
  useFullTokenData,
} from "@shared";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ilmStrategies } from "../../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "../../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useFetchViewAssetPrice } from "../../../../../state/common/queries/useFetchViewAssetPrice";
import { useFetchViewStrategyApy } from "../../../../../state/loop-strategy/hooks/useFetchViewStrategyApy";
import { RouterConfig } from "@router";
import { Address } from "viem";
import { aaveOracleAddress } from "@generated";

export const Heading: React.FC<{
  id: number;
}> = ({ id }) => {
  const strategyConfig = ilmStrategies[id];
  const {
    data: { symbol: strategySymbol },
  } = useToken(strategyConfig.address);

  const {
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
    data: targetMultiple,
  } = useFetchViewTargetMultiple(strategyConfig.address);

  const {
    isLoading: isOraclePriceLoading,
    isFetched: isOraclePriceFetched,
    data: oraclePrice,
  } = useFetchViewAssetPrice({
    asset: strategyConfig.underlyingAsset.address,
  });

  const {
    isLoading: isApyLoading,
    isFetched: isApyFetched,
    data: apy,
  } = useFetchViewStrategyApy(ilmStrategies[id].address);

  return (
    <div className="gap-10 md:gap-48 text-text-primary flex md:flex-row flex-col">
      <FlexRow className="gap-3 text-start">
        <Icon src={strategyConfig.logo} alt={strategyConfig.underlyingAsset.symbol || "asset"} width={40} height={40} />
        <FlexCol>
          <FlexRow className="gap-2 md:max-w-full max-w-[80%]">
            <DisplayText typography="main21" text={strategyConfig.underlyingAsset?.name} />
            <Dropdown
              className="mobile-dropdown-end"
              button={<SmallExternalLinkButton tooltipText="View Token Contracts" />}
            >
              <ul className="py-1">
                <ViewAssetOnBaseScan
                  className="border-b border-divider"
                  label="Underlying Asset"
                  {...strategyConfig.underlyingAsset}
                />
                <ViewAssetOnBaseScan label="Strategy Asset" {...strategyConfig} symbol={strategySymbol} />
              </ul>
            </Dropdown>

            <Dropdown className="mobile-dropdown-end" button={<SmallWatchAssetButton />}>
              <ul className="py-1">
                <WatchAsset
                  className="border-b border-divider"
                  label="Underlying Asset"
                  {...strategyConfig.underlyingAsset}
                />
                <WatchAsset label="Strategy Asset" {...strategyConfig} symbol={strategySymbol} />
              </ul>
            </Dropdown>
          </FlexRow>
          <DisplayText typography="description" text={strategyConfig.underlyingAsset?.symbol} />
        </FlexCol>
      </FlexRow>
      <FlexRow className="gap-8">
        <FlexCol>
          <Typography type="description" color="light">
            Target multiple
          </Typography>
          <DisplayValue
            typography="main21"
            {...targetMultiple}
            isLoading={isTargetMultipleLoading}
            isFetched={isTargetMultipleFetched}
            loaderSkeleton
          />
        </FlexCol>
        <FlexCol>
          <FlexRow className="gap-2">
            <Typography type="description" color="light">
              APY estimate
            </Typography>
            <Tooltip
              openOnClick
              tooltip={
                <Typography type="description">
                  30 day moving average denominated in {strategyConfig?.debtAsset?.symbol}
                </Typography>
              }
              size="small"
              theme="dark"
            >
              <InformationCircleIcon className="cursor-pointer" width={15} />
            </Tooltip>
          </FlexRow>
          <DisplayPercentage typography="main21" {...apy} isLoading={isApyLoading} isFetched={isApyFetched} />
        </FlexCol>
        <FlexCol>
          <Typography type="description" color="light">
            Oracle price
          </Typography>
          <FlexRow className="gap-2">
            <DisplayMoney
              typography="main21"
              {...oraclePrice}
              isLoading={isOraclePriceLoading}
              isFetched={isOraclePriceFetched}
            />
            <SmallExternalLinkButton
              tooltipText="View Oracle Contract"
              onClick={() => {
                window.open(RouterConfig.Builder.baseScanAddress(aaveOracleAddress), "_blank");
              }}
            />
          </FlexRow>
        </FlexCol>
      </FlexRow>
    </div>
  );
};

const ViewAssetOnBaseScan: React.FC<{
  address: string;
  symbol?: string;
  logo?: string;
  label?: string;
  className?: string;
}> = ({ address, symbol, logo, label, className }) => {
  return (
    <div className={`text-text-secondary ${className}`}>
      <div className="px-4 py-3 pb-2">
        <Typography type="secondary12">{label}</Typography>
      </div>
      <a target="_blank" href={RouterConfig.Builder.baseScanAddress(address)} rel="noreferrer">
        <FlexRow className="items-center gap-3 px-4 py-3 hover:bg-action-hover">
          <Icon width={16} src={logo} alt={symbol || ""} />
          <Tooltip tooltip={symbol} size="small">
            <DisplayText typography="subheader1" text={symbol} className="max-w-36" />
          </Tooltip>
        </FlexRow>
      </a>
    </div>
  );
};

const WatchAsset: React.FC<{
  address: Address;
  symbol?: string;
  logo?: string;
  label?: string;
  className?: string;
}> = ({ address, symbol, logo, label, className }) => {
  const { mutateAsync } = useWatchAsset();
  const { data: tokenData } = useFullTokenData(address);

  const handleWatchAsset = async () => {
    if (!address || !tokenData?.decimals || !tokenData.symbol) return;
    await mutateAsync({
      address,
      decimals: tokenData.decimals,
      symbol: tokenData.symbol,
      logo: tokenData.logo,
    });
  };

  return (
    <div className={`text-text-secondary ${className}`}>
      <div className="px-4 py-3 pb-2">
        <Typography type="secondary12">{label}</Typography>
      </div>
      <button onClick={handleWatchAsset} className="focus:outline-none w-full text-left">
        <FlexRow className="items-center gap-3 px-4 py-3 hover:bg-action-hover">
          <Icon width={16} src={logo} alt={symbol || ""} />
          <Tooltip tooltip={symbol} size="small">
            <DisplayText typography="subheader1" text={symbol} className="max-w-36" />
          </Tooltip>
        </FlexRow>
      </button>
    </div>
  );
};

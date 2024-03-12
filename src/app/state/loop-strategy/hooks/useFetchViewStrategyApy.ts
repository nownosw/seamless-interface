import { useBlock } from "wagmi";
import { StrategyConfig, ilmStrategies } from "../config/StrategyConfig";
import {
  APY_BLOCK_FRAME,
  COMPOUNDING_PERIODS_APY,
  SECONDS_PER_YEAR,
} from "../../../meta/constants";
import {
  formatFetchNumberToViewNumber,
  formatUnitsToNumber,
} from "../../../../shared/utils/helpers";
import { FetchData, FetchNumber } from "src/shared/types/Fetch";
import { Displayable, ViewNumber } from "src/shared/types/Displayable";
import { useFetchAssetPriceInBlock } from "../../common/queries/useFetchViewAssetPrice";

export function calculateApy(
  endValue: bigint,
  startValue: bigint,
  timeWindow: bigint
): number {
  if (startValue === 0n || endValue === 0n || timeWindow === 0n) {
    return 0;
  }

  const endValueNumber = formatUnitsToNumber(endValue, 18);
  const startValueNumber = formatUnitsToNumber(startValue, 18);
  const timeWindowNumber = Number(timeWindow);

  const apr =
    (endValueNumber / startValueNumber) **
      (SECONDS_PER_YEAR / timeWindowNumber) -
    1;

  return (
    ((1 + apr / COMPOUNDING_PERIODS_APY) ** COMPOUNDING_PERIODS_APY - 1) * 100
  );
}

export const useFetchStrategyApy = (
  strategyConfig: StrategyConfig
): FetchData<FetchNumber> => {
  const {
    data: latestBlockData,
    isLoading: isLatestBlockLoading,
    isFetched: isLatestBlockFetched,
  } = useBlock();
  const {
    data: prevBlockData,
    isLoading: isPrevBlockLoading,
    isFetched: isPrevBlockFetched,
  } = useBlock({
    blockNumber: latestBlockData
      ? latestBlockData?.number - APY_BLOCK_FRAME
      : 0n,
  });

  const {
    data: shareValueInLatestBlock,
    isLoading: isLatestBlockShareValueLoading,
    isFetched: isLatestBlockShareValueFetched,
  } = useFetchAssetPriceInBlock(
    strategyConfig.address,
    latestBlockData?.number || 0n,
    strategyConfig.underlyingAsset.address
  );

  const {
    data: shareValueInPrevBlock,
    isLoading: isPrevBlockShareValueLoading,
    isFetched: isPrevBlockShareValueFetched,
  } = useFetchAssetPriceInBlock(
    strategyConfig.address,
    prevBlockData?.number || 0n,
    strategyConfig.underlyingAsset.address
  );

  const apy = calculateApy(
    shareValueInLatestBlock.bigIntValue || 0n,
    shareValueInPrevBlock.bigIntValue || 0n,
    (latestBlockData?.timestamp || 0n) - (prevBlockData?.timestamp || 0n)
  );

  return {
    isLoading:
      isLatestBlockShareValueLoading ||
      isPrevBlockShareValueLoading ||
      isLatestBlockLoading ||
      isPrevBlockLoading,
    isFetched:
      isLatestBlockShareValueFetched &&
      isPrevBlockShareValueFetched &&
      isLatestBlockFetched &&
      isPrevBlockFetched,
    data: {
      value: apy ? apy : strategyConfig.defaultApy,
      symbol: "%",
    },
  };
};

export const useFetchViewStrategyApy = (
  index: number
): Displayable<ViewNumber> => {
  const {
    data: apy,
    isLoading,
    isFetched,
  } = useFetchStrategyApy(ilmStrategies[index]);

  return {
    isLoading,
    isFetched,
    data: formatFetchNumberToViewNumber(apy),
  };
};

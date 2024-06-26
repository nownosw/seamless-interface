import { Address } from "viem";
import { DisplayValue, FlexRow, Typography, FlexCol } from "@shared";
import { TokenDescriptionDict } from "../../../../../shared/state/meta-data-queries/useTokenDescription";
import { findILMStrategyByAddress, StrategyConfig } from "../../../../state/loop-strategy/config/StrategyConfig";
import { useFetchViewTargetMultiple } from "../../../../state/loop-strategy/hooks/useFetchViewTargetMultiple";
import { useAssetPickerState } from "../../../hooks/useAssetPickerState";
import { assetSlugConfig } from "../../../pages/test-page/tabs/earn-tab/config/SlugConfig";
import { StrategyApy } from "../../AssetApy";

export const StrategySummary: React.FC<{
  asset: Address;
}> = ({ asset }) => {
  const strategy = findILMStrategyByAddress(asset);

  if (!strategy) {
    // eslint-disable-next-line no-console
    if (asset) console.warn("Strategy not found!!!");
    return <>Strategy not found!</>;
  }

  return <StrategySummaryLocal strategy={strategy} />;
};

const StrategySummaryLocal: React.FC<{
  strategy: StrategyConfig;
}> = ({ strategy }) => {
  const { asset } = useAssetPickerState({ overrideUrlSlug: assetSlugConfig });

  const {
    data: targetMultiple,
    isLoading: isTargetMultipleLoading,
    isFetched: isTargetMultipleFetched,
  } = useFetchViewTargetMultiple(strategy.address);

  return (
    <FlexCol className="rounded-card bg-neutral-100 p-6 gap-4">
      <Typography type="bold3">Summary</Typography>
      <LocalRow label="Estimated APY">
        {asset && <StrategyApy asset={asset} className="text-navy-1000" typography="medium2" />}
      </LocalRow>
      <LocalRow label="Action">Deposit</LocalRow>
      <LocalRow label="Strategy">{asset ? TokenDescriptionDict[asset]?.strategyTitle : ''}</LocalRow>
      <LocalRow label="Multiplier">
        <DisplayValue
          {...targetMultiple}
          isLoading={isTargetMultipleLoading}
          isFetched={isTargetMultipleFetched}
          loaderSkeleton
        />
      </LocalRow>
    </FlexCol>
  );
};

const LocalRow: React.FC<{
  label: string;
  children?: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <FlexRow className="text-navy-600 justify-between">
      <Typography type="bold2">{label}</Typography>
      <Typography type="medium2" className="text-navy-1000">
        {children}
      </Typography>
    </FlexRow>
  );
};

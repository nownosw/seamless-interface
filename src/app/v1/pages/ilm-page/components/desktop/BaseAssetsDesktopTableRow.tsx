import React from "react";
import {
  DisplayMoney,
  DisplayPercentage,
  DisplayTokenAmount,
  FlexCol,
  TableCell,
  TableRow,
} from "../../../../../../shared";
import { TemporaryButton } from "../../../../components/temporary-components/TemporaryButton";
import { DisplayDepositAsset } from "../DisplayDepositAsset";
import { Link } from "react-router-dom";
import { RouterConfig } from "../../../../../router";
import { IncentivesButton } from "./IncentivesButton";
import { ViewBaseAsset } from "../../hooks/useFetchViewBaseAsset";
import { IncentivesDetailCard } from "./IncentivesDetailCard";

export const BaseAssetsDesktopTableRow: React.FC<{
  index: number;
  asset: ViewBaseAsset;
  isLoading: boolean;
  hideBorder?: boolean;
}> = ({ index, asset, isLoading, hideBorder }) => {
  return (
    <Link to={RouterConfig.Builder.assetDetails(index)}>
      <TableRow hideBorder={hideBorder} key={index} className="hidden md:grid grid-cols-7">
        <TableCell className="overflow-hidden col-span-1" alignItems="items-start">
          <DisplayDepositAsset depositAsset={asset.depositAsset} isLoading={isLoading} />
        </TableCell>

        <TableCell>
          <DisplayTokenAmount {...asset?.totalSupplied?.tokenAmount} typography="main16" isLoading={isLoading} />
          <DisplayMoney {...asset?.totalSupplied?.dollarAmount} typography="subheader2" isLoading={isLoading} />
        </TableCell>

        <TableCell>
          <FlexCol className="">
            <DisplayPercentage {...asset?.supplyApy} typography="main16" isLoading={isLoading} />
            {!!asset?.supplyIncentives?.totalApr?.viewValue && (
              <IncentivesButton {...asset?.supplyIncentives}>
                <IncentivesDetailCard {...asset?.supplyIncentives} assetSymbol={asset.depositAsset.symbol} />
              </IncentivesButton>
            )}
          </FlexCol>
        </TableCell>

        <TableCell className="flex items-center">
          <DisplayTokenAmount {...asset?.totalBorrowed?.tokenAmount} typography="main16" isLoading={isLoading} />
          <DisplayMoney {...asset?.totalBorrowed?.dollarAmount} typography="subheader2" isLoading={isLoading} />
        </TableCell>
        <TableCell>
          <DisplayPercentage {...asset?.borrowApyVariable} typography="main16" isLoading={isLoading} />
          {!!asset?.borrowVariableIncentives?.totalApr?.viewValue && (
            <IncentivesButton {...asset?.borrowVariableIncentives}>
              <IncentivesDetailCard {...asset?.borrowVariableIncentives} assetSymbol={asset.depositAsset.symbol} />
            </IncentivesButton>
          )}
        </TableCell>

        <TableCell>
          <DisplayPercentage {...asset?.borrowApyStable} typography="main16" isLoading={isLoading} />
        </TableCell>

        <TableCell>
          <TemporaryButton />
        </TableCell>
      </TableRow>
    </Link>
  );
};

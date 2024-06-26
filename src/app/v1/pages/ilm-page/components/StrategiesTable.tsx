import { Card, SimpleTable } from "../../../../../shared";
import { SearchInput } from "../../../components/temporary-components/SearchInput";
import { useFetchViewStrategy } from "../hooks/useFetchViewStrategy";
import { ilmStrategies } from "../../../../state/loop-strategy/config/StrategyConfig";
import { StrategiesDesktopTableRow } from "./desktop/StrategiesDesktopTableRow";
import { StrategiesMobileTableRow } from "./mobile/StrategiesMobileTableRow";

const columnNames = {
  c_1_depositAsset: "Deposit asset",
  c_2_strategyName: "Strategy name",
  c_3_targetMultiple: "Target multiple",
  c_4_loopAPY: "Estimated APY",
  c_5_availableToDeposit: "In your wallet",
  c_6_yourPosition: "Your current position",
  c_7_1: "",
};

const columns = Object.keys(columnNames).map((key) => ({
  id: key,
  label: columnNames[key as keyof typeof columnNames],
}));

export const StrategiesTable: React.FC = () => {
  return (
    <div className="flex flex-col xxl:items-center mt-[-46px]">
      <Card className="mx-2 lg:mx-10 xl:mx-24 xxl:w-[1440px]">
        <div className="pt-4">
          <SimpleTable
            columns={columns}
            bodyComponent={<TableBody />}
            title="Integrated Liquidity Market (ILM) Strategies"
            subtitle="Automate your strategy for increased rewards and reduced fees"
            filterComponent={<SearchInput />}
            settings={{
              skeletonRowCount: 1,
            }}
          />
        </div>
      </Card>
    </div>
  );
};

const TableBody: React.FC = () => {
  return (
    <>
      {ilmStrategies.map((_, index) => (
        <StrategiesTableRow index={index} key={index} />
      ))}
    </>
  );
};

const StrategiesTableRow: React.FC<{ index: number }> = ({ index }) => {
  const { data: strategy, isFetched } = useFetchViewStrategy(index);

  return (
    <>
      <StrategiesDesktopTableRow
        index={index}
        hideBorder={index === ilmStrategies.length - 1}
        strategy={strategy}
        isFetched={isFetched}
      />
      <StrategiesMobileTableRow index={index} isFetched={isFetched} columnNames={columnNames} strategy={strategy} />
    </>
  );
};

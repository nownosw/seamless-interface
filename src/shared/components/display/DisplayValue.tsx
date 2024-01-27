import { DisplayableAmount } from "../../types/Displayable";
import { Typography } from "../text/Typography/Typography";
import { TypographyType, TypographyColor } from "../text/Typography/mappers";

export interface DisplayValueProps extends DisplayableAmount {
  typography?: TypographyType;
  symbolColor?: TypographyColor;
  loaderSkeleton?: boolean;
  symbolPosition?: "before" | "after";
}
/**
 * `DisplayValue` Component
 *
 * The `DisplayValue` component is a versatile utility for displaying values with an optional symbol (like currency or unit), in a formatted manner.
 *
 * ## Key Features:
 * - **Value Formatting**: Displays the provided `value` with an optional `symbol` before or after the value.
 * - **Loading State**: Supports a loading state, which can be indicated with a spinner or a skeleton loader.
 * - **Custom Typography**: Allows for different typography styles and colors through `typography` and `symbolColor` props.
 * 
 * ## Props:
 * - `value`: The value to be displayed.
 * - `symbol`: Optional symbol to display alongside the value (e.g., $, %, etc.).
 * - `isFetched`: Indicates if the data is fetched; used to control the display of the loader.
 * - `isLoading`: Indicates if the data is currently loading.
 * - `symbolColor`: Optional color for the symbol.
 * - `loaderSkeleton`: Toggles between a spinner and a skeleton loader.
 * - `symbolPosition`: Positions the symbol either 'before' or 'after' the value.
 * - `typography`: The typography style to be used for displaying the value.
 *
 * ## Usage:
 *
 * ```jsx
 * <DisplayValue
 *   value="100"
 *   symbol="$"
 *   typography="main16"
 *   symbolColor="secondary"
 *   isLoading={dataLoading}
 *   isFetched={dataFetched}
 *   symbolPosition="before"
 * />
 * ```
 *
 * In the example above, the component will display "$100" with the main16 typography style and the symbol in secondary color. If the data is loading, it will show a loader instead.
 *
 * @param props Props for the component.
 * @returns The `DisplayValue` component.
 */

export const DisplayValue: React.FC<DisplayValueProps> = ({
  value,
  symbol,
  isFetched,
  isLoading,
  symbolColor,
  loaderSkeleton,
  typography = "secondary12",
  symbolPosition = "before",
}) => {
  if ((!isFetched && isFetched != null) || (isLoading && isLoading != null)) {
    return (
      <span
        className={
          loaderSkeleton
            ? "skeleton w-full h-full"
            : "loading loading-spinner flex self-center"
        }
      ></span>
    );
  } else {
    return (
      <Typography
        type={typography}
        className="whitespace-nowrap text-overflow-ellipsis"
      >
        {symbolPosition === "before" && symbol && (
          <>
            <Typography
              type={typography}
              tagOverride="span"
              color={symbolColor}
            >
              {symbol}
            </Typography>{" "}
          </>
        )}
        {value}

        {symbolPosition === "after" && symbol && (
          <>
            {" "}
            <Typography
              type={typography}
              tagOverride="span"
              color={symbolColor}
            >
              {symbol}
            </Typography>
          </>
        )}
      </Typography>
    );
  }
};

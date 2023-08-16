import * as React from "react";
import * as Sarif from "sarif";
import * as Keys from "./result-keys";
import { selectableZebraStripe } from "./result-table-utils";
import { ScrollIntoViewHelper } from "./scroll-into-view-helper";
import { AlertTablePathNodeRow } from "./AlertTablePathNodeRow";
import { AlertTableDropdownIndicatorCell } from "./AlertTableDropdownIndicatorCell";
import { useMemo } from "react";

interface Props {
  path: Sarif.ThreadFlow;
  pathIndex: number;
  resultIndex: number;
  currentPathExpanded: boolean;
  selectedItem: undefined | Keys.ResultKey;
  databaseUri: string;
  sourceLocationPrefix: string;
  updateSelectionCallback: (
    resultKey: Keys.PathNode | Keys.Result | undefined,
  ) => () => void;
  toggleExpanded: (e: React.MouseEvent, keys: Keys.ResultKey[]) => void;
  scroller: ScrollIntoViewHelper;
}

export function AlertTablePathRow(props: Props) {
  const {
    path,
    pathIndex,
    resultIndex,
    currentPathExpanded,
    selectedItem,
    databaseUri,
    sourceLocationPrefix,
    updateSelectionCallback,
    toggleExpanded,
    scroller,
  } = props;

  const pathKey = useMemo(
    () => ({ resultIndex, pathIndex }),
    [pathIndex, resultIndex],
  );
  const handleDropdownClick = useMemo(
    () => (e: React.MouseEvent) => toggleExpanded(e, [pathKey]),
    [pathKey, toggleExpanded],
  );

  const isPathSpecificallySelected = Keys.equalsNotUndefined(
    pathKey,
    selectedItem,
  );

  return (
    <>
      <tr
        ref={scroller.ref(isPathSpecificallySelected)}
        {...selectableZebraStripe(isPathSpecificallySelected, resultIndex)}
      >
        <td className="vscode-codeql__icon-cell">
          <span className="vscode-codeql__vertical-rule"></span>
        </td>
        <AlertTableDropdownIndicatorCell
          expanded={currentPathExpanded}
          onClick={handleDropdownClick}
        />
        <td className="vscode-codeql__text-center" colSpan={3}>
          Path
        </td>
      </tr>
      {currentPathExpanded &&
        path.locations.map((step, pathNodeIndex) => (
          <AlertTablePathNodeRow
            key={`${resultIndex}-${pathIndex}-${pathNodeIndex}`}
            step={step}
            pathNodeIndex={pathNodeIndex}
            pathIndex={pathIndex}
            resultIndex={resultIndex}
            selectedItem={selectedItem}
            databaseUri={databaseUri}
            sourceLocationPrefix={sourceLocationPrefix}
            updateSelectionCallback={updateSelectionCallback}
            scroller={scroller}
          />
        ))}
    </>
  );
}

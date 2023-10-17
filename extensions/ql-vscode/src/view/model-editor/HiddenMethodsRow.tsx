import * as React from "react";
import { styled } from "styled-components";
import { pluralize } from "../../common/word";
import { DataGridCell, DataGridRow } from "../common/DataGrid";
import { ModelEditorViewState } from "../../model-editor/shared/view-state";

const HiddenMethodsText = styled.div`
  text-align: center;
`;

interface Props {
  gridRow: number;
  numHiddenMethods: number;
  someMethodsAreVisible: boolean;
  viewState: ModelEditorViewState;
}

export function HiddenMethodsRow({
  gridRow,
  numHiddenMethods,
  someMethodsAreVisible,
  viewState,
}: Props) {
  if (numHiddenMethods === 0) {
    return null;
  }

  const gridColumn = viewState.showMultipleModels ? "span 6" : "span 5";

  return (
    <DataGridRow>
      <DataGridCell gridRow={gridRow} gridColumn={gridColumn}>
        <HiddenMethodsText>
          {someMethodsAreVisible && "And "}
          {pluralize(numHiddenMethods, "method", "methods")} modeled in other
          CodeQL packs
        </HiddenMethodsText>
      </DataGridCell>
    </DataGridRow>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEvent, useEffect, useCallback } from "react";
import { Button } from "../ui/button";
import { Check, Pencil, X } from "lucide-react";

export const EditedCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const validRow = meta?.validRows[row.id];
  const disableSubmit = validRow
    ? Object.values(validRow)?.some((item) => !item)
    : false;

  const handleAction = useCallback(
    (action: "edit" | "cancel" | "done") => {
      meta?.setEditedRows((old: Record<string, boolean>) => ({
        ...old,
        [row.id]: action === "edit" ? true : false,
      }));

      if (action !== "edit") {
        action === "cancel"
          ? meta?.revertData(row.index)
          : meta?.updateRow(row.index);
      }
    },
    [row.id, row.index, meta]
  );

  const setEditedRows = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const action = e.currentTarget.name as "edit" | "cancel" | "done";
      handleAction(action);
    },
    [handleAction]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        if (meta?.editedRows[row.id] && !disableSubmit) {
          handleAction("done");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleAction, row.id, meta?.editedRows, disableSubmit]);

  return meta?.editedRows[row.id] ? (
    <div className="flex items-center gap-2">
      <Button size={"icon"} onClick={setEditedRows} name="cancel">
        <X size={16} />
      </Button>
      <Button
        size={"icon"}
        onClick={setEditedRows}
        name="done"
        disabled={disableSubmit}
        className={disableSubmit ? "cursor-not-allowed" : ""}
      >
        <Check size={16} />
      </Button>
    </div>
  ) : (
    <Button size={"icon"} onClick={setEditedRows} name="edit">
      <Pencil size={16} />
    </Button>
  );
};

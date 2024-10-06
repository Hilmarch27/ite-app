/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent } from "react";
import { Button } from "../ui/button";
import { Check, Pencil, X } from "lucide-react";

export const EditedCell = ({ row, table }: any) => {
  const meta = table.options.meta;
  const validRow = meta?.validRows[row.id];
  const disableSubmit = validRow
    ? Object.values(validRow)?.some((item) => !item)
    : false;

  // console.log("disableSubmit", disableSubmit);
  const setEditedRows = (e: MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      e.currentTarget.name === "cancel"
        ? meta?.revertData(row.index)
        : meta?.updateRow(row.index);
    }
  };
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

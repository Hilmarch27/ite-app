/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { CustomSelect } from "../custom/custome-select";
import { Badge } from "../ui/badge";

type EditTableCellProps = {
  getValue: () => any; // or more specific type if you know it
  row: any; // replace any with the actual row type
  column: any; // replace any with the actual column type
  table: any; // replace any with the actual table type
};

// edittable
export const EditTableCell = ({
  getValue,
  row,
  column,
  table,
}: EditTableCellProps) => {
  const initialValue = String(getValue()); // Convert to string
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState("");
  console.log("value", columnMeta);

  useEffect(() => {
    setValue(String(initialValue)); // Ensure it is string
  }, [initialValue]);

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    tableMeta?.updateData(row.index, column.id, value, e.target.validity.valid);
  };

  const displayValidationMessage = <
    T extends HTMLInputElement | HTMLSelectElement
  >(
    e: ChangeEvent<T>
  ) => {
    if (columnMeta?.pattern) {
      const regex = new RegExp(columnMeta.pattern);
      const isValid = regex.test(e.target.value);
      if (isValid) {
        e.target.setCustomValidity("");
        setValidationMessage("");
      } else {
        e.target.setCustomValidity(columnMeta.validationMessage);
        setValidationMessage(columnMeta.validationMessage);
      }
    } else if (columnMeta?.validate) {
      const isValid = columnMeta.validate(e.target.value);
      if (isValid) {
        e.target.setCustomValidity("");
        setValidationMessage("");
      } else {
        e.target.setCustomValidity(columnMeta.validationMessage);
        setValidationMessage(columnMeta.validationMessage);
      }
    } else if (e.target.validity.valid) {
      setValidationMessage("");
    } else {
      setValidationMessage(e.target.validationMessage);
    }
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <CustomSelect
        options={columnMeta?.options || []}
        onValueChange={(value) => {
          setValue(value);
          tableMeta?.updateData(row.index, column.id, value, true);
        }}
        initialValue={initialValue}
        required={columnMeta?.required}
        placeholder="Select an option"
      />
    ) : (
      <Input
        className="h-[36px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
        required={columnMeta?.required}
        title={validationMessage}
        pattern={columnMeta?.pattern}
      />
    );
  }
  return (
    <>
      {columnMeta?.signature ? (
        <Badge
          variant="outline"
          className={`${
            value === "AKTIF"
              ? "text-green-500 border-green-500"
              : value === "TUTUP"
              ? "text-red-500 border-red-500"
              : ""
          } w-[60px] h-[24px] text-center`}
        >
          {value}
        </Badge>
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};

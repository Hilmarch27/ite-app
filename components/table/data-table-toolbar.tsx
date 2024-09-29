"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "@/data/example/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import * as ReactTable from "@tanstack/react-table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useDialogStore from "@/zustand/dialog-store";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const {openDialog} = useDialogStore()
  // Get selected rows
  const selectedRows = table.getSelectedRowModel().rows;

  // Delete handler
  function handleDeleteSelected(selectedRows: ReactTable.Row<TData>[]) {
    const selectedIds = selectedRows.map(
      (row) => (row.original as { id: string }).id
    );
    console.log("Deleting rows with IDs:", selectedIds);

    // Perform your delete logic here, e.g., API call with selectedIds
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* delete button in this */}
        {selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size={"sm"}
            onClick={() => handleDeleteSelected(selectedRows)}
          >
            {`Delete ${selectedRows.length} Selected`}
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <Popover>
          <PopoverTrigger>
            <Button size={"xs"}>Tambah Data</Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="max-w-[150px]">
            <div className="flex flex-col gap-2">
              <Button size={"xs"} onClick={() => openDialog("Import Excel")}>
                Tambah Excel
              </Button>
              <Button size={"xs"} onClick={() => openDialog("Create Router")}>
                Tambah Data
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

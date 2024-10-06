"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "../../ui/checkbox";

import { DataTableColumnHeader } from "../../table/data-table-column-header";
// import { DataTableRowActions } from "../../table/data-table-row-actions";
import { RouterType } from "@/lib/validations/router";
import { kanca, status, typeOfUker } from "@/data/router-data";
import { EditTableCell } from "@/components/table/data-table-cell";
import { EditedCell } from "@/components/table/data-table-edit-cell";
// import { Badge } from "../ui/badge";

export const columns: ColumnDef<RouterType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "typeOfUker", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Uker" />
    ),
    cell: EditTableCell,
    meta: {
      type: "select",
      options: typeOfUker,
    },
    enableSorting: true,
  },
  {
    accessorKey: "routerSeries", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Router Series" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
    },
    enableSorting: true,
  },
  {
    accessorKey: "nameUker", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Uker" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
      pattern: "^[a-zA-Z ]+$",
      validationMessage: "Name cannot be containing numbers",
    },
    enableSorting: true,
  },
  {
    accessorKey: "kanca", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kanca" />
    ),
    cell: EditTableCell,
    meta: {
      type: "select",
      options: kanca,
    },
  },
  {
    accessorKey: "kanwil", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kanwil" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
    },
  },
  {
    accessorKey: "status", // Status bisa berupa "AKTIF" atau "TUTUP"
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: EditTableCell,
    meta: {
      type: "select",
      options: status,
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "ipUker", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP Uker" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
    },
  },
  {
    accessorKey: "snDevice", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
    },
  },
  {
    accessorKey: "information", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Informasi" />
    ),
    cell: EditTableCell,
    meta: {
      type: "text",
      required: true,
    },
  },
  {
    id: "actions",
    cell: EditedCell,
    // cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

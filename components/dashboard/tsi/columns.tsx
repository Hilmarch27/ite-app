"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "../../ui/checkbox";

import { DataTableColumnHeader } from "../../table/data-table-column-header";
import { DataTableRowActions } from "../../table/data-table-row-actions";
import { RouterType } from "@/lib/validations/router";
import { Badge } from "@/components/ui/badge";
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
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("typeOfUker")}</div>
    ), // tampilkan nilai typeOfUker
    enableSorting: true,
  },
  {
    accessorKey: "routerSeries", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Router Series" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("routerSeries")}</div>
    ), // tampilkan nilai routerSeries
    enableSorting: true,
  },
  {
    accessorKey: "nameUker", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Uker" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.getValue("nameUker")}</div>
    ),
  },
  {
    accessorKey: "kanca", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kanca" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.getValue("kanca")}</div>,
  },
  {
    accessorKey: "kanwil", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kanwil" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("kanwil")}</div>
    ),
  },
  {
    accessorKey: "status", // Status bisa berupa "AKTIF" atau "TUTUP"
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <Badge
          variant="outline"
          className={`w-auto ${
            status === "AKTIF" ? "text-green-500" : "text-red-500"
          }`}
        >
          {String(status)}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "ipUker", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IP Uker" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("ipUker")}</div>
    ),
  },
  {
    accessorKey: "snDevice", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">{row.getValue("snDevice")}</div>
    ),
  },
  {
    accessorKey: "information", // Ubah ke field yang benar dari RouterFormType
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Informasi" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[250px] truncate">
        {row.getValue("information")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

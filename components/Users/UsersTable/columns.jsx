"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import Link from "next/link";
import ProductsActions from "./ProductsActions";

export const columns = (pusherData) => [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Id" />
  //   ),
  // },

  {
    accessorKey: "name_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (EN)" />
    ),
    cell: ({ row }) => {
      const rowData = row.original;
      const name = row.getValue("name_en");
      return (
        <Link
          href={`/products/${rowData?.id}`}
          className="font-medium px-2 py-1 rounded text-start block text-cyan-800 hover:text-cyan-500 hover:underline capitalize"
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "name_ar",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name (AR)" />
    ),
    cell: ({ row }) => {
      const rowData = row.original;
      const nameAr = row.getValue("name_ar");
      return (
        <Link
          href={`/products/${rowData?.id}`}
          className="font-medium px-2 py-1 rounded text-start block text-cyan-800 hover:text-cyan-500 hover:underline capitalize"
        >
          {nameAr}
        </Link>
      );
    },
  },
  {
    accessorKey: "product_type",
    header: () => <div className="text-start">Type</div>,
    cell: ({ row }) => {
      const type = Number(row.getValue("product_type"));
      return (
        <div
          className="font-medium px-2 py-1 rounded text-center"
          style={
            type === 1
              ? { color: "#FFFFFF", backgroundColor: "rgb(148 163 184)" }
              : type === 2
              ? { color: "#FFFFFF", backgroundColor: "#0C93CD" }
              : { color: "#464855" }
          }
        >
          {type === 1 ? "Ingot" : type === 2 ? "Coin" : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "kirat",
    header: () => <div className="text-start">Kirat</div>,
    cell: ({ row }) => {
      const kirat = row.getValue("kirat");
      return (
        <div
          className="font-medium px-2 py-1 rounded text-center"
          style={
            Number(kirat) === 1
              ? { color: "#524C42", backgroundColor: "#E2DFD0" }
              : { color: "#1B84FF", backgroundColor: "#E9F3FF" }
          }
        >
          {Number(kirat) === 1 ? "24k" : "21k"}
        </div>
      );
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      const rowData = row.original;
      const provider = row.getValue("provider");
      return (
        <Link
          href={`/providers/${provider?.id}`}
          className="font-medium px-2 py-1 rounded text-start block text-cyan-800 hover:text-cyan-500 hover:underline capitalize"
        >
          {provider?.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "weight",
    header: () => <div className="text-start">Weight</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <div className="font-medium px-2 py-1 rounded text-center flex items-center gap-2">
          <span>{rowData?.weight}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "dollar",
  //   header: () => <div className="text-center">Price($)</div>,
  //   cell: ({ row }) => {
  //     const rowData = row.original;
  //     return (
  //       <div className="font-medium px-2 py-1 rounded text-center flex items-center gap-2">
  //         <span>{rowData?.dollar}</span>
  //       </div>
  //     );
  //   },
  // },

  {
    accessorKey: "prices",
    header: () => <div className="text-start">Local Low</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      const weight = rowData?.weight;
      const kiratNum = String(rowData?.kirat);
      const kirat = kiratNum === "1" ? 24 : 21;
      const priceLocalLowKirat = Number(pusherData[kirat]?.local_low);
      return (
        <div className="font-medium px-2 py-1 rounded text-center flex items-center gap-2">
          <span>{Number(priceLocalLowKirat * weight)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "prices",
    header: () => <div className="text-start">Local High</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      const weight = rowData?.weight;
      const kiratNum = String(rowData?.kirat);
      const kirat = kiratNum === "1" ? 24 : 21;
      const priceLocalHighKirat = Number(pusherData[kirat]?.local_high);
      return (
        <div className="font-medium px-2 py-1 rounded text-center flex items-center gap-2">
          <span>{Number(priceLocalHighKirat * weight)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "prices",
    header: () => <div className="text-start">Manufacture</div>,
    cell: ({ row }) => {
      const rowData = row.original;
      const prices = row.getValue("prices");
      return (
        <div className="font-medium px-2 py-1 rounded text-center flex items-center gap-2">
          <span>{prices?.local_manufacture}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "high_global",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="High Global" />
  //   ),
  // },
  // {
  //   accessorKey: "low_global",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Low Global" />
  //   ),
  // },
  // {
  //   accessorKey: "high_local",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="High Local" />
  //   ),
  // },
  // {
  //   accessorKey: "low_local",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Low Local" />
  //   ),
  // },
  // {
  //   accessorKey: "is_in_trading",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="is_in_trading" />
  //   ),
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <ProductsActions rowData={rowData} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

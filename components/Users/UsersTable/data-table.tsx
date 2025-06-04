"use client";

import { TbFilterX } from "react-icons/tb";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowSelectionState,
  Table as ReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";
import SelectList from "@/components/utils/SelectList/SelectList";
import { Button } from "@/components/ui/button";

// example filtersList if not provided elsewhere
const filtersList = [
  { name: "Ascending", value: "&desc=0" },
  { name: "Descending", value: "&desc=1" },
];

interface SelectOption {
  value: string;
  placeholder: string;
}

//  Generic Props
interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  searchHandler: (key: string, value: string) => void;
  filterHandler: (option: any) => void;
  filterByDatesHandler: () => void;
  take: number;
  clearFiltersAndSearchHandler: () => void;
}

//  Generic Component
export function DataTable<TData>({
  columns,
  data,
  searchHandler,
  filterHandler,
  filterByDatesHandler,
  take,
  clearFiltersAndSearchHandler,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState<string>(
    "Select search method first"
  );

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const onChangeSearchKey = (key: SelectOption) => {
    setSearchKey(key?.value);
    setSearchPlaceHolder(key?.placeholder);
  };

  const onChangeSearchValue = (val: string) => {
    setSearchValue(val);
  };

  useEffect(() => {
    if (searchKey && searchValue) {
      searchHandler(searchKey, searchValue);
    }
  }, [searchKey, searchValue]);

  useEffect(() => {
    table.setPageSize(Number(take));
  }, [take]);

  return (
    <div>
      <h2 className="text-2xl text-amber-400">Products Report</h2>

      <Link className="createBtn" href="/products/create-product">
        <MdAddCircleOutline />
        <span>Create Product</span>
      </Link>

      <div className="flex items-center">
        <div className="w-full flex items-center gap-2 justify-between py-4 flex-col-reverse sm:flex-row">
          <div></div>

          <div className="flex gap-4 items-center justify-between sm:justify-end w-full sm:w-auto">
            <SelectList
              selectOptions={filtersList}
              defaultOption="Filter By"
              label=""
              id="filters"
              onChange={filterHandler}
              listWidth={"160px"}
            />
            <button onClick={clearFiltersAndSearchHandler}>
              <TbFilterX size={20} fill="#F8285A" color="#F8285A" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="outline-none dark:text-white dark:bg-gray-800"
                >
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="dark:border-gray-700">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="dark:border-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" dark:text-white">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="dark:border-gray-700">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center dark:text-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

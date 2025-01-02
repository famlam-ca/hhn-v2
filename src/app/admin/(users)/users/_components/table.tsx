"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import * as React from "react"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTableViewOptions } from "@/components/ui/table/column-toggle"
import { DataTablePagination } from "@/components/ui/table/pagination"
import { useAction } from "@/hooks/use-action"

import { bulkDeleteUsers } from "../actions"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { execute: deleteUsers, isLoading } = useAction(bulkDeleteUsers)

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      rowSelection,
    },
  })

  const handleBulkDelete = async (ids: string[]) => {
    await deleteUsers(
      { ids },
      {
        onSuccess: () => {
          toast.success("Users deleted successfully")
        },
        onError: (error) => {
          toast.error("Oops!", {
            description: error,
          })
        },
      },
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />
        {Object.keys(rowSelection).length > 0 && (
          <LoadingButton
            loading={isLoading}
            onClick={() =>
              handleBulkDelete(
                table
                  .getRowModel()
                  .rows.map((row) => (row.original as { id: string }).id),
              )
            }
            variant="destructive"
            className="ml-4"
          >
            <Trash2
              className={`mr-2 size-4 ${isLoading ? "hidden" : "block"}`}
            />
            <span className="mt-1">({Object.keys(rowSelection).length})</span>
          </LoadingButton>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} rowsPerPage={false} />
    </div>
  )
}

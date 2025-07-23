import { Table, TableHeader, TableHead, TableCell, TableRow, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input"
import { FilePenLine, LoaderCircle, MoreHorizontal, Trash2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom";
import { host } from "@/utils/constants";
import { productDetail } from "@/utils/types";
import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from "date-fns";

function Product() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const { token } = useAuth();

    const { isLoading, data, error } = useQuery<productDetail[], Error>({
        queryKey: ["products"],
        enabled: !!token,
        queryFn: () => 
            fetch(`${host}/products`, {
                headers: {
                    "authorization" : `Bearer ${token}`
                }
            }).then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok')
                }
                return res.json()
            })
    })
    const columns: ColumnDef<productDetail>[] = useMemo(() => 
        [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() || 
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select-all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox 
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select-row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("name")}</div>
                ),
            },
            {
                accessorKey: "price",
                header: "Price",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("price")}</div>
                )
            },
            {
                accessorKey: "image",
                header: 'Image',
                cell: ({ row }) => (
                    <div>
                        <img className="size-8" src={`${row.getValue("image")}`} alt="product image"/>
                    </div>
                )
            },
            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) => (
                    <div className="capitalize">{row.getValue("description")}</div>
                )
            },
            {
                accessorKey: "createdAt",
                header: "Created At",
                cell: ({ row }) => (
                    <div>{format(new Date(row.getValue("createdAt")), 'yyyy-MM-dd HH:mm:ss')}</div>
                )
            },
            {
                accessorKey: "updatedAt",
                header: "Updated At",
                cell: ({ row }) => (
                    <div>{row.getValue("updatedAt") ? format(new Date(row.getValue("updatedAt")), 'yyyy-MM-dd HH:mm:ss'): "-"}</div>
                )
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={`editProduct?productId=${row.original._id}`}className="flex gap-2 items-center"><FilePenLine className="w-5 h-5"></FilePenLine>Edit</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to={`deleteProduct?productId=${row.original._id}`} className="flex gap-2 items-center"><Trash2 className="w-5 h-5"/>Delete</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            }
        ]
        ,[])
    
    const table = useReactTable({
        data: data ?? [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
    }});

    if (isLoading) return <div className="flex items-center justify-center mt-10"><LoaderCircle className="animate-spin size-14" /></div>;

    if (error) return (
        <Alert variant="destructive" className="mt-5 p-3">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {error.message}
            </AlertDescription>
        </Alert>
    );

  return (
    <div className="m-4">
        <div className="flex items-center py-4 justify-between">
            <Input
            placeholder="Filter name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
          <div>
            <Button>
                <Link to="addProduct">Add Product</Link>
            </Button>
          </div>
        </div>
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
                                        header.getContext()
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
                                        cell.getContext()
                                    )
                                    }
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
        <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        </div>
    </div>
  )
}

export default Product
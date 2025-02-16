import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    createColumnHelper
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { DadosTabela } from '../types/dados';

interface TabelaProps {
    data: DadosTabela[];
}

export function Tabela({ data }: TabelaProps) {
    const [filtering, setFiltering] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    
    const columnHelper = createColumnHelper<DadosTabela>();
    const columns = [
        columnHelper.accessor('cpf', { 
            header: 'CPF',
            cell: info => <span className="font-mono">{info.getValue()}</span>
        }),
        columnHelper.accessor('valor', { 
            header: 'Valor',
            cell: info => <span className="font-mono">R$ {info.getValue()}</span>
        }),
        columnHelper.accessor('nome', { 
            header: 'Nome',
            cell: info => <span className="capitalize">{info.getValue() as string}</span>
        }),
        columnHelper.accessor('descricao', { header: 'Descrição' }),
        columnHelper.accessor('cod_convenio', { header: 'Código Convênio' }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            globalFilter: filtering,
            sorting,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <Input
                    placeholder="Buscar por CPF..."
                    value={filtering}
                    onChange={(e) => setFiltering(e.target.value)}
                    className="max-w-xs bg-white"
                />
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Primeira
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        Última
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Página {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </span>
                </div>
            </div>
            <div className="rounded-md border">
                <table className='w-full bg-white'>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b bg-muted/50">
                                {headerGroup.headers.map(header => (
                                    <th 
                                        key={header.id} 
                                        className="h-12 px-4 text-left align-middle font-medium text-sm whitespace-nowrap"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center gap-2 ${
                                                    header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                                                }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getCanSort() && (
                                                    <div className="w-4">
                                                        {header.column.getIsSorted() === "asc" ? (
                                                            <ChevronUp className="h-4 w-4" />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ArrowUpDown className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="p-4 text-sm whitespace-nowrap">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
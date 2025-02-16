'use client';
import { useState } from 'react';
import EnviarForm from './components/EnviarForm';
import logo from '../../public/images/logo.png';
import { Tabela } from './components/Tabela';
import { DadosTabela } from './types/dados';
import Image from 'next/image';

export default function Home() {
    const [tableData, setTableData] = useState<DadosTabela[]>([]);
    const handleDataReceived = (data: DadosTabela[]) => {
        setTableData(data);
    };

    return (
        <main className="container mx-auto flex flex-col gap-4 pb-8">
            <div className="border-b flex items-center gap-4 p-4">
                <Image src={logo.src} alt="Logo" width={50} height={50} />
                <h1 className="text-3xl font-bold">Aspofern Data Sync</h1>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='p-4 bg-zinc-100 rounded-lg shadow-sm'>
                    <EnviarForm aoReceberDados={handleDataReceived} />
                </div>
                <div className='p-4 bg-zinc-100 rounded-lg shadow-lg'>
                    {tableData.length > 0 ? (
                        <Tabela data={tableData} />
                    ) : (
                        <div className="text-center py-10 text-muted-foreground">
                            Nenhum dado para exibir
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
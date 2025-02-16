import React, { useState } from 'react';
import axios from 'axios';
import { Download } from "lucide-react";
import { DadosTabela } from '../types/dados';
import { Button, Input, Label } from "@/app/components/ui" 
import { useToast } from '../hooks/use-toast';

interface PropsEnviarForm {
	aoReceberDados: (dados: DadosTabela[]) => void;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
            file?: string;
        };
        status?: number;
    };
    message: string;
}

const camposArquivo = [
	{ id: 'tabelaRefencia', rotulo: 'Tabela Referência ASPOFERN' },
	{ id: 'tabelaAnsef', rotulo: 'Tabela ANSEF' },
	{ id: 'semMargemAnsef', rotulo: 'Tabela ANSEF sem margem' },
	{ id: 'sempreOdontoSytem', rotulo: 'Plano Sempre e OdontoSystem' },
	{ id: 'unidonto', rotulo: 'Plano Uniodonto' },
	{ id: 'consignacoesUnimed', rotulo: 'Consignações Unimed' },
	{ id: 'tabelaDebito', rotulo: 'Tabela Debito' },
	{ 
		id: 'contratosUnimed', 
		rotulo: 'Contratos Unimed',
		multiplo: true 
	},
];

const EnviarForm: React.FC<PropsEnviarForm> = ({ aoReceberDados }) => {
	const [enviando, setEnviando] = useState(false);
	const [filename, setFilename] = useState<string | null>(null);
	const { toast } = useToast();

	const aoEnviar = async (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		setEnviando(true);
		setFilename(null);

		const dadosFormulario = new FormData(evento.currentTarget);

		try {
			console.log("Iniciando envio dos arquivos...");
			const resposta = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/uploadfiles`, dadosFormulario, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			console.log("Resposta do servidor:", resposta.data);

			if (resposta.data.status === 200) {
				toast({
					title: "Sucesso!",
					description: "Arquivos enviados com sucesso. Processamento concluído.",
					variant: "default",
				});
				aoReceberDados(JSON.parse(resposta.data.data));
				setFilename(`Importacao_${String(new Date().getMonth() + 2).padStart(2, '0')}_${new Date().getFullYear()}.csv`);
			} else {
				const errorMessage = resposta.data.message || "Erro desconhecido";
				const errorFile = resposta.data.file || "Arquivo desconhecido";
				console.error(`Erro no arquivo ${errorFile}:`, errorMessage);
				toast({
					title: "Erro no Processamento!",
					description: `Erro no arquivo: ${errorFile}\n${errorMessage}`,
					variant: "destructive",
				});
			}
		} catch (erro: unknown) {
			console.error('Erro detalhado:', erro);
			const errorResponse = (erro as ApiError).response?.data;
			const errorMessage = errorResponse?.message || (erro as ApiError).message || "Erro ao enviar arquivos.";
			const errorFile = errorResponse?.file || "Desconhecido";
			
			toast({
				title: "Erro no Upload!",
				description: `Erro no arquivo: ${errorFile}\n${errorMessage}`,
				variant: "destructive",
			});
		} finally {
			setEnviando(false);
		}
	};

	const handleDownload = async () => {
		if (!filename) return;
		
		try {
			const resposta = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/download/${filename}`, {
				responseType: 'blob'
			});
			
			const url = window.URL.createObjectURL(new Blob([resposta.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', filename);
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error: unknown) {
			const errorResponse = (error as ApiError).response?.data;
			const errorMessage = errorResponse?.message || (error as ApiError).message || "Erro ao fazer download do arquivo.";
			toast({
				title: "Erro!",
				description: errorMessage,
				variant: "destructive",
			});
		}
	};

	return (
		<form onSubmit={aoEnviar} className='flex items-center gap-8'>
			<div className="grid md:grid-cols-4 grid-cols-2 gap-4">
				{camposArquivo.map((campo) => (
					<div key={campo.id} className="space-y-2">
						<Label className="font-light" htmlFor={campo.id}>{campo.rotulo}</Label>
						<Input 
							type="file" 
							className="bg-white hover:bg-gray-300 cursor-pointer"
							id={campo.id} 
							name={campo.id}
							multiple={campo.multiplo}
							required
						/>
					</div>
				))}
			</div>
			<div className="flex flex-col items-center gap-2">
				<Button 
					type="submit" 
					disabled={enviando}
					className="w-full"
				>
					{enviando ? 'Enviando...' : 'Enviar'}
				</Button>
				{filename && (
					<Button
						type="button"
						variant="outline"
						onClick={handleDownload}
						className="gap-2"
					>
						<Download size={16} />
						Download
					</Button>
				)}
			</div>
		</form>
	);
};

export default EnviarForm;
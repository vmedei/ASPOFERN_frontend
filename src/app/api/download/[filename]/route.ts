import { NextResponse } from 'next/server';
import axios from 'axios';

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

export async function GET(
    request: Request,
    { params }: { params: { filename: string } }
) {
    try {
        console.log("Tentando fazer download do arquivo:", params.filename);
        const response = await axios.get(`http://127.0.0.1:8000/download/${params.filename}`, {
            responseType: 'arraybuffer'
        });

        if (response.status === 200) {
            return new NextResponse(response.data, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="${params.filename}"`,
                },
            });
        } else {
            console.error("Erro na resposta da API:", response.data);
            return NextResponse.json(
                { error: response.data.message || 'Erro ao baixar arquivo' },
                { status: response.status }
            );
        }
    } catch (error: unknown) {
        console.error('Erro ao fazer download:', (error as ApiError).response?.data || (error as ApiError).message);
        return NextResponse.json(
            { error: 'Falha ao fazer download do arquivo' },
            { status: (error as ApiError).response?.status || 500 }
        );
    }
}
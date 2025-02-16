import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const formData = await request.formData();

    try {
        const response = await axios.post('http://127.0.0.1:8000/uploadfiles/', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Erro ao enviar arquivos para a API:', error);
        return NextResponse.json(
            { status: 500, message: 'Erro ao processar o upload' },
            { status: 500 }
        );
    }
}
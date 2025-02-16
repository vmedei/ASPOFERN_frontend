import { useState, useEffect } from 'react';

const useWebSocket = (url: string) => {
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => console.log('WebSocket conectado');
        ws.onmessage = (event) => {
            console.log('Mensagem do servidor:', event.data);
            setMessage(event.data);
        };
        ws.onclose = () => console.log('WebSocket desconectado');

        return () => {
            ws.close();
        };
    }, [url]);

    return message;
};

export default useWebSocket;
import { WebSocketServer } from 'ws';

let wss = null;

export const initWebSocket = (httpServer) => {
    wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws) => {
        console.log('Nouveau client connecté');

        ws.on('message', (message) => {
            console.log('Message reçu:', message.toString());
            // Exemple de broadcast à tous les clients
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(`Serveur répond: ${message}`);
                }
            });
        });

        ws.on('close', () => {
            console.log('Client déconnecté');
        });
    });
};

export const broadcastMessage = (message) => {
    if (wss) {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    }
};
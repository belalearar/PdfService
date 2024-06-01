import express from 'express';
import pdfRoute from './routes/pdf';

const app = express();

LaunchServer();

function LaunchServer() {
    const port = 81;
    app.listen(port, '0.0.0.0', () => {
        console.log(`REST: Listening on 0.0.0.0:${port}`);
    });
}

app.use(express.json());

// Use routes
app.use('/pdf', pdfRoute);

app.get('/health', (req, res) => {
    res.send('Healthy');
});
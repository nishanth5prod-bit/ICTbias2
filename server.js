import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory storage (replace with database in production)
let signals = {
    buy: {
        status: 'NEUTRAL',
        timestamp: new Date().toISOString()
    },
    sell: {
        status: 'NEUTRAL',
        timestamp: new Date().toISOString()
    }
};

// Admin password (change this!)
const ADMIN_PASSWORD = 'Nish23!@#';

// Public endpoint - Get current signals (no authentication needed)
app.get('/api/signals', (req, res) => {
    res.json(signals);
});

// Admin endpoint - Update signals (requires password)
app.post('/api/admin/update-signal', (req, res) => {
    const { password, type, status } = req.body;

    // Verify password
    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate input
    if (!['buy', 'sell'].includes(type)) {
        return res.status(400).json({ error: 'Invalid signal type' });
    }

    if (!['ACTIVE', 'NEUTRAL', 'INACTIVE'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    // Update signal
    signals[type] = {
        status: status,
        timestamp: new Date().toISOString()
    };

    res.json({ success: true, signals });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Public site: http://localhost:${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
});

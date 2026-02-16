# ICTbias.com - Trading Signals Platform

A real-time trading signals platform with separate public and admin interfaces.

## Features

- **Public Website** (`/`) - Displays live buy/sell signals with auto-refresh
- **Admin Panel** (`/admin.html`) - Password-protected backend control
- **Real-time Updates** - Signals refresh every 5 seconds on public site
- **No Admin Controls Visible** - Clean separation between public and admin interfaces

## Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Admin Password
Edit `server.js` line 30:
```javascript
const ADMIN_PASSWORD = 'your-secure-password-123';
```
Change this to a strong, unique password!

### 3. Run Locally
```bash
npm start
```

The server will start on port 3000:
- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin.html

## Deployment Options

### Option 1: Heroku (Recommended - Free Tier Available)

1. Create a free Heroku account at heroku.com
2. Install Heroku CLI
3. Deploy:
```bash
heroku login
heroku create ictbias
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

4. Your site will be live at: `https://ictbias.herokuapp.com`

### Option 2: Railway.app (Easy & Free)

1. Go to railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js and deploys
6. Get your public URL

### Option 3: Render.com (Free Tier)

1. Create account at render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Deploy and get your URL

### Option 4: DigitalOcean App Platform

1. Sign up at digitalocean.com
2. Create new App
3. Connect GitHub repo
4. Select Node.js
5. Deploy

## File Structure

```
ictbias-backend/
├── server.js              # Express backend server
├── package.json           # Dependencies
├── public/
│   ├── index.html        # Public-facing website
│   └── admin.html        # Admin control panel
└── README.md             # This file
```

## API Endpoints

### Public Endpoints
- `GET /api/signals` - Get current signals (no auth required)

### Admin Endpoints
- `POST /api/admin/update-signal` - Update signals (requires password)
  ```json
  {
    "password": "your-password",
    "type": "buy" | "sell",
    "status": "ACTIVE" | "NEUTRAL" | "INACTIVE"
  }
  ```

## Security Notes

1. **Change the default password** in `server.js` immediately
2. Keep your admin panel URL private (only share `/admin.html` with trusted users)
3. For production, consider adding:
   - HTTPS (most hosting platforms provide this automatically)
   - Rate limiting
   - Database storage (currently uses in-memory storage)
   - Session tokens instead of password in every request

## Adding a Database (Optional)

For persistent storage across server restarts, you can add MongoDB:

1. Install mongoose: `npm install mongoose`
2. Create a free MongoDB Atlas database
3. Update `server.js` to store signals in MongoDB instead of memory

## Custom Domain Setup

Once deployed, you can add your custom domain (ictbias.com):

1. Purchase domain from Namecheap, GoDaddy, or Cloudflare
2. In your hosting platform settings, add custom domain
3. Update DNS records to point to your hosting platform
4. Wait for DNS propagation (can take up to 48 hours)

## Usage

### For Admin:
1. Go to `yourdomain.com/admin.html`
2. Enter your password
3. Click buttons to change signals
4. Signals update instantly on the public site

### For Public Users:
1. Visit `yourdomain.com`
2. View live signals (no login needed)
3. Page auto-refreshes every 5 seconds

## Support

For issues or questions, refer to your hosting platform's documentation.

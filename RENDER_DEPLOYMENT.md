# Deploying Backend to Render

This guide walks you through deploying your Hunter Web Cafe backend API to Render.

## Prerequisites

1. **GitHub Repository**: Your code must be pushed to GitHub
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas) (free tier available)
3. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign in/create account
2. Click **"Build a Database"** → Select **"Free"** tier → Click **"Create"**
3. Choose a cloud provider and region (closest to you)
4. Create a cluster name and click **"Create Cluster"**
5. Set up database access:
   - Click **"Database Access"** in left sidebar
   - Click **"Add New Database User"**
   - Choose **"Password"** authentication
   - Create a username and strong password (save these!)
   - Set user privileges to **"Read and write to any database"**
   - Click **"Add User"**
6. Set up network access:
   - Click **"Network Access"** in left sidebar
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**
7. Get your connection string:
   - Click **"Database"** in left sidebar
   - Click **"Connect"** on your cluster
   - Click **"Connect your application"**
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your actual database user password
   - Add your database name after the `/` (e.g., `...mongodb.net/hunter-web-cafe?retryWrites=true...`)

## Step 2: Deploy to Render

### Option A: Using the Render Dashboard (Recommended)

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **"New +"** → Select **"Web Service"**
3. Connect your GitHub repository (authorize Render if needed)
4. Select your `hawk-homework` repository
5. Configure the service:
   - **Name**: `hawk-homework-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or `.` if required)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Add Environment Variables:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add the following variables:
     - `NODE_ENV` = `production`
     - `MONGODB_URI` = `your-mongodb-atlas-connection-string`
     - `PORT` = `5000` (Render will override this with their own port)
7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes for first deploy)

### Option B: Using render.yaml (Blueprint)

1. Make sure the `render.yaml` file exists in your repository root (already created)
2. Go to [render.com](https://render.com) dashboard
3. Click **"New +"** → Select **"Blueprint"**
4. Connect your GitHub repository
5. Select your `hawk-homework` repository
6. Render will detect the `render.yaml` file
7. Set the **MONGODB_URI** environment variable when prompted
8. Click **"Apply"** to deploy

## Step 3: Seed Your Database (Optional)

Once deployed, you can seed your database with menu items:

1. In Render dashboard, go to your web service
2. Click **"Shell"** tab
3. Run: `node server/scripts/seedMenu.js`
4. Or modify your seed script to run remotely via API

## Step 4: Test Your API

Once deployed, Render will provide a URL like: `https://hawk-homework-backend.onrender.com`

Test the endpoints:
- **GET** `https://hawk-homework-backend.onrender.com/` - Should return API status
- **GET** `https://hawk-homework-backend.onrender.com/api/menu` - Get all menu items
- **POST** `https://hawk-homework-backend.onrender.com/api/orders` - Create an order

## Step 5: Update Frontend API URL

Update your frontend to use the Render backend URL:

In `src/services/api.js`, change the `baseURL` to your Render URL:
```javascript
const API_BASE_URL = 'https://hawk-homework-backend.onrender.com/api';
```

## Important Notes

### Free Tier Limitations
- **Spin down after inactivity**: Free tier services sleep after 15 minutes of inactivity
- **Cold starts**: First request after sleeping takes 30-60 seconds
- **Monthly limit**: 750 hours/month (enough for one service running 24/7)

### Monitoring & Logs
- View logs in real-time: Render Dashboard → Your Service → **"Logs"** tab
- Check deployment status and events in the **"Events"** tab
- Monitor CPU/memory usage in **"Metrics"** tab

### Updating Your Deployment
- **Auto-deploy**: By default, Render auto-deploys when you push to main branch
- **Manual deploy**: Click **"Manual Deploy"** → **"Deploy latest commit"**
- **Environment variables**: Can be updated in **"Environment"** tab (triggers redeploy)

## Troubleshooting

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check MONGODB_URI is correct (no extra spaces, correct password)
- Ensure database user has proper permissions

### Service Won't Start
- Check logs in Render dashboard
- Verify `npm start` works locally
- Ensure all dependencies are in `package.json` (not just `devDependencies`)

### CORS Errors
Your server already has CORS enabled. If issues persist:
- Check browser console for specific CORS errors
- Verify frontend is making requests to correct URL
- May need to specify allowed origins in production

## Next Steps

1. **Custom Domain**: Add your own domain in Render settings
2. **Upgrade Plan**: For production apps, consider paid tier (no sleep, better performance)
3. **Environment Separation**: Create separate Render services for staging/production
4. **Database Backups**: Set up automated backups in MongoDB Atlas
5. **Monitoring**: Add error tracking (Sentry, LogRocket, etc.)

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js on Render Guide](https://render.com/docs/deploy-node-express-app)

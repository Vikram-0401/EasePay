Here's the updated README.md with two options for MongoDB setup in step 3:

```markdown
# PayEase: Simple Money Transfer Application

PayEase is a lightweight money transfer application that allows users to securely transfer funds between accounts.

![PayEase Dashboard](frontend/public/images/dashboard.png)

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Features

- User registration and authentication
- Dashboard to view balance
- Simple money transfers between users
- User search functionality


### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Vikram-0401/EasePay.git
cd EasePay
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Setup MongoDB** (Choose Option A or B)

#### Option A: Standard MongoDB Installation

```bash
# Install MongoDB if not already installed
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb

# Verify MongoDB is running
sudo systemctl status mongodb
```

#### Option B: Using Docker

```bash
# Make sure Docker and Docker Compose are installed
# Install Docker if needed:
# sudo apt install docker.io docker-compose

# Create a docker-compose.yml file
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  mongodb:
    image: mongo:latest
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
EOF

# Start MongoDB container
docker-compose up -d

# Check if container is running
docker ps
```

4. **Configure backend**

Create `backend/config.js`:

```javascript
module.exports = {
  JWT_SECRET: "your-secret-key"
}
```

5. **Start backend server**

```bash
node index.js
# The server will start on port 3000
```

6. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

7. **Start frontend development server**

```bash
npm run dev

```




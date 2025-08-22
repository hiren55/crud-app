@echo off
echo ========================================
echo    CRUD Application Startup Script
echo    with MongoDB Atlas Integration
echo ========================================
echo.

echo Installing dependencies...
echo.

echo [1/3] Installing root dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install root dependencies
    pause
    exit /b 1
)

echo [2/3] Installing backend dependencies (including MongoDB)...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo [3/3] Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.
echo ✅ All dependencies installed successfully!
echo.

echo ========================================
echo    Testing MongoDB Connection
echo ========================================
echo.
echo 🔌 Testing MongoDB Atlas connection...
cd backend
node test-connection.js
if %errorlevel% neq 0 (
    echo.
    echo ❌ MongoDB connection failed!
    echo Please check your MongoDB Atlas configuration.
    echo.
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ MongoDB connection successful!
echo.

echo ========================================
echo    Starting the Application
echo ========================================
echo.
echo 🌐 Backend will run on: http://localhost:5000
echo 🎨 Frontend will run on: http://localhost:3000
echo 🔗 Health check: http://localhost:5000/health
echo 🗄️ Database: MongoDB Atlas (Cloud)
echo.
echo Press any key to start both servers...
pause >nul

echo.
echo 🚀 Starting servers...
echo.

echo Starting Backend Server (with MongoDB connection)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting for backend to initialize and connect to MongoDB...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo    Application Started Successfully!
echo ========================================
echo.
echo 🌐 Backend: http://localhost:5000
echo 🎨 Frontend: http://localhost:3000
echo 🔗 Health check: http://localhost:5000/health
echo 🗄️ Database: MongoDB Atlas
echo.
echo 📝 Backend logs will appear in the Backend Server window
echo 📝 Frontend logs will appear in the Frontend Server window
echo 📝 Check for MongoDB connection success in backend logs
echo.
echo Press any key to exit this startup script...
pause >nul

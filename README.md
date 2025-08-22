# Full-Stack CRUD Application

A modern, responsive CRUD application built with React (frontend) and Node.js (backend) with MongoDB Atlas integration that allows users to manage records with Indian address structure, advanced features like pagination, search, sorting, and cascading dropdowns.

## ✨ Features

- **Full CRUD Operations**: Create, Read, Update, and Delete records
- **Indian Address Structure**: Complete address fields including State, District, City, and Zipcode
- **Record Date Management**: Track when records were created with Indian date format
- **Modern UI/UX**: Clean, responsive design with beautiful styling
- **Form Validation**: Client-side and server-side validation with real-time error feedback
- **Cascading Dropdowns**: State → District selection with dynamic updates
- **Phone Formatting**: Automatic phone number formatting (xxx)-xxx-xxxx
- **Search Functionality**: Search across all columns including new address fields
- **Sorting**: Sort by any column (ascending/descending)
- **Pagination**: Configurable page sizes (8, 16, 24, 32)
- **Real-time Updates**: Instant grid updates without page refresh
- **Responsive Design**: Works on all device sizes
- **Modular Backend**: Clean separation of concerns with models, routes, and utilities
- **Environment Configuration**: Configurable settings via environment variables
- **Health Monitoring**: Built-in health check endpoints
- **Comprehensive Error Handling**: Proper error responses and logging
- **MongoDB Atlas Integration**: Cloud database with automatic scaling
- **Data Persistence**: All data is stored securely in MongoDB Atlas
- **Advanced Search**: Full-text search with MongoDB aggregation

## 🏗️ Project Structure

```
crud-app/
├── backend/                     # Node.js Express server
│   ├── config/                  # Configuration files
│   │   ├── database.js          # MongoDB connection
│   │   └── config.env           # Environment variables
│   ├── data/                    # Data files
│   │   └── statesDistricts.json
│   ├── models/                  # Data models
│   │   ├── Record.js            # Record business logic
│   │   └── RecordSchema.js      # MongoDB schema with Indian fields
│   ├── routes/                  # API route handlers
│   │   ├── records.js
│   │   └── location.js
│   ├── utils/                   # Utility functions
│   │   └── validate.js          # Validation including Indian fields
│   ├── nodemon.json             # Nodemon configuration
│   ├── server.js                # Main server file
│   └── package.json             # Backend dependencies
├── frontend/                    # React Vite application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── RecordForm.jsx   # Form with Indian address fields
│   │   │   └── RecordGrid.jsx   # Grid displaying all fields
│   │   ├── App.jsx              # Main application
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
├── package.json                 # Root package.json
├── start.bat                    # Windows startup script
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier available)

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier: M0)

2. **Configure Database Access:**
   - Create a database user with read/write permissions
   - Note down username and password

3. **Configure Network Access:**
   - Add your IP address to the IP Access List
   - Or use `0.0.0.0/0` for development (allows all IPs)

4. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

5. **Update Environment Variables:**
   ```env
   MONGODB_URI=your_connection_string_here
   DB_NAME=crud_app
   ```

### Installation

1. **Clone and install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies (includes MongoDB)
   cd backend && npm install
   
   # Install frontend dependencies
   cd ../frontend && npm install
   
   # Return to root
   cd ..
   ```

2. **Start the development servers:**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start them separately:
   npm run dev:backend    # Backend on port 5000
   npm run dev:frontend   # Frontend on port 3000
   ```

3. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📱 Usage

### Adding Records
1. Click the "Add Record" button
2. Fill in all required fields:
   - **Name**: Full name (2-100 characters)
   - **Phone**: 10-digit number (auto-formatted)
   - **Email**: Must contain @ and . (6+ characters)
   - **Record Date**: Date when record was created
   - **Address**: Full address (10-500 characters)
   - **State**: Select from dropdown
   - **District**: Automatically populated based on state
   - **City**: City name (2-100 characters)
   - **Zipcode**: 6-digit Indian zipcode
3. Click "Save"

### Managing Records
- **Edit**: Click the ✏️ icon on any record
- **Delete**: Click the 🗑️ icon (with confirmation)
- **Search**: Use the search bar to find specific records
- **Sort**: Click column headers to sort
- **Navigate**: Use pagination controls at the bottom

### Validation Rules
- **Phone**: Exactly 10 digits, displayed as (xxx)-xxx-xxxx
- **Email**: Must contain @ and . (minimum 6 characters)
- **Name**: 2-100 characters
- **Address**: 10-500 characters
- **City**: 2-100 characters
- **Zipcode**: Exactly 6 digits (Indian format)
- **Record Date**: Valid date (defaults to today)
- **All fields**: Required
- **State/District**: Cascading selection

## 🛠️ API Endpoints

### Records
- `GET /api/records` - List records with pagination, search, and sorting
- `POST /api/records` - Create new record
- `PUT /api/records/:id` - Update existing record
- `DELETE /api/records/:id` - Delete record
- `GET /api/records/:id` - Get single record
- `GET /api/records/count/total` - Get total record count

### Location Data
- `GET /api/location/states` - Get all available states
- `GET /api/location/districts/:state` - Get districts for a specific state
- `GET /api/location/all` - Get all states and districts data

### System
- `GET /health` - Health check endpoint with database status

### Query Parameters
- `page`: Page number (default: 1)
- `limit`: Records per page (default: 8)
- `search`: Search term across all fields
- `sortBy`: Column to sort by (default: name)
- `sortOrder`: asc or desc (default: asc)

## 🎨 UI Components

### RecordForm
- Responsive grid layout with Indian address fields
- Real-time validation for all fields
- Phone number auto-formatting
- Cascading state/district dropdowns
- Date picker for record date
- Error handling and display

### RecordGrid
- Sortable columns with visual indicators
- Responsive table design showing all fields
- Action buttons for edit/delete
- Loading states and empty states
- Hover effects and transitions
- Indian date formatting (DD/MM/YYYY)

### Styling
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Modern shadows and borders
- Consistent spacing and typography
- Hover effects and transitions
- Color-coded badges for different field types

## 🔧 Configuration

### Environment Variables
Create a `backend/config.env` file:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=your_mongodb_atlas_connection_string
DB_NAME=crud_app
```

### MongoDB Atlas
- **Free Tier**: 512MB storage, shared RAM
- **Connection**: Secure connection with username/password
- **Scaling**: Automatic scaling based on usage
- **Backup**: Automated daily backups

### Backend Port
The backend runs on port 5000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=3001 npm run dev:backend
```

### Frontend Port
The frontend runs on port 3000 by default. You can change this in `frontend/vite.config.js`.

### API Base URL
The frontend connects to `http://localhost:5000/api` by default. You can change this in the components if needed.

## 🚀 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

### Start Production Backend
```bash
cd backend
npm start
```

### Production MongoDB
- Use MongoDB Atlas production cluster
- Configure proper security groups
- Set up monitoring and alerts
- Enable automated backups

## 🧪 Testing

The application includes comprehensive error handling and validation:

- **Form Validation**: Client-side validation with real-time feedback
- **Server Validation**: Server-side validation using Mongoose schemas
- **Database Validation**: MongoDB schema validation
- **API Error Handling**: Proper error responses and user feedback
- **Loading States**: Visual feedback during operations
- **Confirmation Dialogs**: Delete confirmations to prevent accidents
- **Field-specific Validation**: Phone, email, zipcode, and date validation

## 🔒 Security Features

- **Input Validation**: Server-side validation for all inputs
- **Data Sanitization**: Input sanitization and validation
- **MongoDB Security**: Secure connection with authentication
- **CORS**: Configurable CORS settings
- **Error Handling**: Secure error responses (no sensitive data in production)
- **Environment Variables**: Secure configuration management

## 🌟 Backend Architecture

### Database Layer
- **MongoDB Atlas**: Cloud database with automatic scaling
- **Mongoose**: MongoDB ODM with schema validation
- **Indexes**: Optimized queries for better performance
- **Connection Pooling**: Efficient database connections

### Models
- **Record.js**: Handles all record data operations with MongoDB
- **RecordSchema.js**: MongoDB schema with Indian address fields and validation
- Clean separation of business logic from data layer
- Automatic timestamps and data formatting

### Routes
- **records.js**: All CRUD operations for records
- **location.js**: State and district data endpoints
- Proper error handling and HTTP status codes
- Async/await pattern for database operations

### Utils
- **validate.js**: Centralized validation functions
- Phone, email, zipcode, and date validation
- Data sanitization utilities

### Configuration
- Environment-based configuration
- MongoDB connection management
- Nodemon for development
- Graceful shutdown handling

## 🌟 Future Enhancements

- User authentication and authorization
- File upload support with cloud storage
- Advanced filtering and aggregation
- Export functionality (CSV, PDF, Excel)
- Real-time updates with WebSockets
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
- API rate limiting
- Caching layer (Redis)
- Multi-tenant support
- Advanced address validation
- Postal code lookup integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify both servers are running
3. Check MongoDB Atlas connection in backend logs
4. Verify the API endpoints are accessible
5. Review the browser's network tab for failed requests
6. Check the health endpoint: http://localhost:5000/health
7. Ensure MongoDB Atlas cluster is running and accessible

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot reload
```

### Database Operations
```bash
# Connect to MongoDB Atlas
# Records are automatically created in the 'crud_app' database
# Check MongoDB Atlas dashboard for data visualization
```

### Adding New Features
1. Create models in `backend/models/`
2. Add routes in `backend/routes/`
3. Create utilities in `backend/utils/`
4. Update validation as needed
5. Test thoroughly with MongoDB

---

**Built with ❤️ using React, Node.js, Vite, and MongoDB Atlas**

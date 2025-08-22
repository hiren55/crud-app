/**
 * Test MongoDB Connection
 * Run this script to test if MongoDB Atlas connection works
 */

require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

async function testConnection() {
    try {
        console.log('🔌 Testing MongoDB connection...');
        console.log('📡 URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
        console.log('🗄️ Database:', process.env.DB_NAME);

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected Successfully!');
        console.log(`🌐 Host: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🔗 Connection State: ${conn.connection.readyState}`);

        // Test creating a simple document
        const TestSchema = new mongoose.Schema({ name: String, timestamp: Date });
        const TestModel = mongoose.model('Test', TestSchema);

        const testDoc = new TestModel({
            name: 'Connection Test',
            timestamp: new Date()
        });

        await testDoc.save();
        console.log('✅ Test document created successfully');

        // Clean up test document
        await TestModel.deleteOne({ name: 'Connection Test' });
        console.log('✅ Test document cleaned up');

        await mongoose.connection.close();
        console.log('🔌 Connection closed successfully');

        process.exit(0);
    } catch (error) {
        console.error('❌ MongoDB connection failed:');
        console.error('Error:', error.message);

        if (error.name === 'MongoNetworkError') {
            console.error('💡 This might be a network issue. Check:');
            console.error('   - Your internet connection');
            console.error('   - MongoDB Atlas cluster status');
            console.error('   - IP whitelist in MongoDB Atlas');
        } else if (error.name === 'MongoServerSelectionError') {
            console.error('💡 This might be an authentication issue. Check:');
            console.error('   - Username and password in connection string');
            console.error('   - Database user permissions');
        }

        process.exit(1);
    }
}

testConnection();

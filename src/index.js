const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');
const searchRoutes = require('./routes/searchRoutes');
const productRoutes = require('./routes/productRoutes');
const starredRoutes = require('./routes/starredRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const swaggerDocument = yaml.load(fs.readFileSync('./src/resources/swagger.yaml', 'utf8'));

app.use(express.json());

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/auth', authRoutes);
app.use('/business', businessRoutes);
app.use('/search', searchRoutes);
app.use('/products', productRoutes);
app.use('/starred', starredRoutes);
app.use('/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

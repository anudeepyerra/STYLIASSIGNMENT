const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./index'); 

// Use a test database
beforeAll(async () => {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.ka5jt2d.mongodb.net/INVENTORY?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the test database before each test
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

// Close the MongoDB connection after all tests are finished
afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/categories', () => {
  it('should return all categories items', async () => {
    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
  });
});

describe('POST /api/categories', () => {
  it('should create a new categories item', async () => {
    const newItem = {
      id: 1,
      brand_name: 'Example Brand',
      size: 'M',
      color: 'Black',
      price: 29.99,
    };

    const response = await request(app).post('/api/categories').send(newItem);

    expect(response.status).toBe(201);
    expect(response.body.id).toBe(newItem.id);
  });
});

describe('GET /api/categories/:id', () => {
  it('should return a specific categories item by ID', async () => {
    const existingItem = await categories.findOne(id);

    const response = await request(app).get(`/api/categories/${existingItem.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(existingItem.id);
  });

  it('should return 404 if the categories item is not found', async () => {
    const nonExistentId = '200';

    const response = await request(app).get(`/api/categories/${nonExistentId}`);

    expect(response.status).toBe(404);
  });
});

describe('PUT /api/categories/:id', () => {
  it('should update a specific categories item by ID', async () => {
    const existingItem = await categories.findOne(id);
    const updatedItem = {
      brand_name: 'Wrangler',
    };

    const response = await request(app).put(`/api/categories/${existingItem.id}`).send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(existingItem.id);
  });

  it('should return 404 if the categories item to update is not found', async () => {
    const nonExistentId = 'non-existent-id';
    const updatedItem = {
      brand_name: 'Lewis',
    };

    const response = await request(app).put(`/api/categories/${nonExistentId}`).send(updatedItem);

    expect(response.status).toBe(404);
  });
});

describe('DELETE /api/categories/:id', () => {
  it('should delete a specific categories item by ID', async () => {
    const existingItem = await categories.findOne(id);

    const response = await request(app).delete(`/api/categories/${existingItem.id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 if the categories item to delete is not found', async () => {
    const nonExistentId = '250';

    const response = await request(app).delete(`/api/categories/${nonExistentId}`);

    expect(response.status).toBe(404);
  });
});
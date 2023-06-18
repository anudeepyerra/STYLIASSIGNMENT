const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server'); // Assuming the server file is named 'server.js'

// Use a test database
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/test-database', {
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

describe('Category API', () => {
  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'New Category' })
      .expect(201);

    expect(response.body.category.name).toBe('New Category');
  });

  it('should update an existing category', async () => {
    const category = new Category({ name: 'Old Category' });
    await category.save();

    const response = await request(app)
      .put(`/categories/${category._id}`)
      .send({ name: 'Updated Category' })
      .expect(200);

    expect(response.body.message).toBe('Category updated successfully');
  });

  it('should delete an existing category', async () => {
    const category = new Category({ name: 'Category to Delete' });
    await category.save();

    const response = await request(app)
      .delete(`/categories/${category._id}`)
      .expect(200);

    expect(response.body.message).toBe('Category deleted successfully');
  });

  it('should get categories in hierarchical tree view', async () => {
    const parentCategory = new Category({ name: 'Parent Category' });
    await parentCategory.save();

    const childCategory = new Category({ name: 'Child Category', parent: parentCategory._id });
    await childCategory.save();

    const response = await request(app)
      .get('/categories')
      .expect(200);

    expect(response.body.categories).toHaveLength(1);
    expect(response.body.categories[0].name).toBe('Parent Category');
    expect(response.body.categories[0].children).toHaveLength(1);
    expect(response.body.categories[0].children[0].name).toBe('Child Category');
  });
});

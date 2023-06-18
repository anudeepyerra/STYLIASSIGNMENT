const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.ka5jt2d.mongodb.net/INVENTORY?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB');
    app.listen(3000, () => {
        console.log('Server started on 3000')
    });
}).catch((error) => {
    console.log(error)
})

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});
const Category = mongoose.model('Category', categorySchema);

// Initialize Express app
const app = express();
app.use(express.json());

// GET endpoint to retrieve the categories in hierarchical tree view
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find().populate('parent');
    const formattedCategories = formatCategories(categories);
    res.json({ categories: formattedCategories });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint to create a new category
app.post('/categories', async (req, res) => {
  const { name, parentId } = req.body;

  try {
    const parentCategory = await Category.findById(parentId);
    if (parentId && !parentCategory) {
      return res.status(404).json({ error: 'Parent category not found' });
    }

    const newCategory = new Category({
      name,
      parent: parentId || null,
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT endpoint to update a category based on its ID
app.put('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  const { name, parentId } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const parentCategory = await Category.findById(parentId);
    if (parentId && !parentCategory) {
      return res.status(404).json({ error: 'Parent category not found' });
    }

    // Update the category fields
    category.name = name;
    category.parent = parentId || null;

    await category.save();
    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint to delete a category based on its ID
app.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Delete the category and its subcategories recursively
    await Category.deleteMany({ $or: [{ _id: categoryId }, { parent: categoryId }] });

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Recursive function to format categories into hierarchical tree structure
function formatCategories(categories, parent = null) {
  const formatted = [];
  for (const category of categories) {
    if (category.parent && category.parent.equals(parent)) {
      const formattedCategory = {
        id: category._id,
        name: category.name,
        children: formatCategories(categories, category._id),
      };
      formatted.push(formattedCategory);
    }
  }
  return formatted;
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

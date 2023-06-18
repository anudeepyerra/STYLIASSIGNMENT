const mongoose = require('mongoose');
const { Schema } = mongoose;

// General properties schema
const propertiesSchema = new Schema({
  id: { type: Number, required: true },
  brand_name: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
});

// Schema for Causal Dresses
const causalDressSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Party Dresses
const partyDressSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Printed T-shirts
const printedTshirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Casual T-shirts
const casualTshirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Plain T-shirts
const plainTshirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Branded Footwear
const brandedFootwearSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Non-Branded Footwear
const nonBrandedFootwearSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Party Shirts
const partyShirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Casual Shirts
const casualShirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Plain Shirts
const plainShirtSchema = new Schema({
  properties: propertiesSchema,
});

// Schema for Women's Clothing
const womenClothingSchema = new Schema({
  dresses: {
    causal: [causalDressSchema],
    party: [partyDressSchema],
  },
  tShirts: {
    printed: [printedTshirtSchema],
    casual: [casualTshirtSchema],
    plain: [plainTshirtSchema],
  },
});

// Schema for Men's Clothing
const menClothingSchema = new Schema({
  footwear: {
    branded: [brandedFootwearSchema],
    nonBranded: [nonBrandedFootwearSchema],
  },
  tShirts: {
    printed: [printedTshirtSchema],
    casual: [casualTshirtSchema],
    plain: [plainTshirtSchema],
  },
  shirts: {
    party: [partyShirtSchema],
    casual: [casualShirtSchema],
    plain: [plainShirtSchema],
  },
});

// Schema for the entire collection
const categoriesSchema = new Schema({
  women: womenClothingSchema,
  men: menClothingSchema,
},
{
  timestamps: true
});

// Create the Clothing model
const Categories = mongoose.model('Categories', categoriesSchema);

module.exports = Categories;

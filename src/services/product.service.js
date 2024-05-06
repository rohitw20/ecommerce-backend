const Category = require("../models/category.model");
const Product = require("../models/product.model");

const findProductById = async (productId) => {
  try {
    const product = await Product.findById(productId)
      .populate("category")
      .exec();

    if (!product) {
      throw new Error(`Product not found with id : ${productId}`);
    }
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async (reqData) => {
  try {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevelCategory,
        level: 1,
      });
      await topLevel.save();
    }

    let secondLevel = await Category.findOne({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevelCategory,
        level: 2,
        parentCategory: topLevel._id,
      });

      await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevelCategory,
      parentCategory: topLevel._id,
    });

    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevelCategory,
        parentCategory: topLevel._id,
        level: 3,
      });

      await thirdLevel.save();
    }

    const product = new Product({
      title: reqData.title,
      description: reqData.description,
      price: reqData.price,
      discountedPrice: reqData.discountedPrice,
      discountPresent: reqData.discountPresent,
      quantity: reqData.quantity,
      brand: reqData.brand,
      color: reqData.color,
      sizes: reqData.size,
      imageUrl: reqData.imageUrl,
      category: thirdLevel._id,
    });

    return await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    const product = await findProductById(productId);
    await Product.findByIdAndDelete(productId);
    return "product deleted successfully!";
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (productId, reqData) => {
  try {
    await Product.findByIdAndUpdate(productId, reqData);
    return "product updated successfully!";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProducts = async (reqQuery) => {
  try {
    let {
      category,
      color,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize,
    } = reqQuery;

    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);
    minDiscount = parseInt(minDiscount);
    pageNumber = parseInt(pageNumber);
    pageSize = parseInt(pageSize);
    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    if (category) {
      const existCategory = await Category.findOne({ name: category });

      if (existCategory) {
        query = query.where("category").equals(existCategory._id);
      } else {
        return { content: [], currentPage: 1, totalPages: 0 };
      }
    }

    if (color) {
      const colorSet = new Set(
        color.split(",").map((color) => color.trim().toLowerCase())
      );

      const colorRegex =
        colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

      query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
      const sizesSet = new Set(sizes);
      query = query.where("sizes.name").in([...sizesSet]);
    }

    if (minPrice && maxPrice && minPrice != 0 && maxPrice != 0) {
      query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
      query = query.where("discountPresent").gt(minDiscount);
    }

    if (stock && stock !== "null") {
      if (stock === "in_stock") {
        query = query.where("quantity").gt(0);
      } else if (stock === "out_of_stock") {
        query = query.where("quantity").gt(1);
      }
    }

    if (sort) {
      const sortDirection = sort === "price_high" ? -1 : 1;
      query = query.sort({ discountedPrice: sortDirection });
    }

    const totalProducts = await Product.countDocuments(query);

    const skip =
      (pageNumber - 1) * pageSize < 0 ? 1 : (pageNumber - 1) * pageSize;

    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
  } catch (error) {
    throw new Error(error.message);
  }
};

const createMultipleProduct = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProduct,
};

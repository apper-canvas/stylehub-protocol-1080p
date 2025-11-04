import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

class ProductService {
  constructor() {
    this.tableName = 'product_c';
  }

  // Get ApperClient instance
  getClient() {
    const client = getApperClient();
    if (!client) {
      throw new Error('ApperClient not available');
    }
    return client;
  }

  // Parse multiline text fields (arrays stored as comma-separated strings)
  parseArrayField(value) {
    if (!value || typeof value !== 'string') return [];
    return value.split(',').map(item => item.trim()).filter(Boolean);
  }

  // Format array field for storage (arrays to comma-separated strings)  
  formatArrayField(array) {
    if (!Array.isArray(array)) return '';
    return array.join(',');
  }

  // Transform database record to UI format
  transformToUIFormat(record) {
    if (!record) return null;
    
    return {
      Id: record.Id,
      title: record.title_c || '',
      category: record.category_c || '',
      subcategory: record.subcategory_c || '',
      brand: record.brand_c || '',
      price: record.price_c || 0,
      originalPrice: record.original_price_c || 0,
      discount: record.discount_c || 0,
      images: this.parseArrayField(record.images_c),
      sizes: this.parseArrayField(record.sizes_c),
      colors: this.parseArrayField(record.colors_c),
      description: record.description_c || '',
      rating: record.rating_c || 0,
      reviewCount: record.review_count_c || 0,
      inStock: record.in_stock_c !== false,
      tags: this.parseArrayField(record.tags_c)
    };
  }

  async getAll() {
    try {
      const client = this.getClient();
      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      toast.error("Failed to load products");
      return [];
    }
  }

  async getById(id) {
    try {
      const client = this.getClient();
      const response = await client.getRecordById(this.tableName, id, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data ? this.transformToUIFormat(response.data) : null;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      toast.error("Failed to load product");
      return null;
    }
  }

  async getByCategory(category) {
    try {
      const client = this.getClient();
      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [category]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      toast.error("Failed to load category products");
      return [];
    }
  }

  async search(query) {
    try {
      const client = this.getClient();
      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {"fieldName": "title_c", "operator": "Contains", "values": [query]},
                {"fieldName": "brand_c", "operator": "Contains", "values": [query]},
                {"fieldName": "category_c", "operator": "Contains", "values": [query]},
                {"fieldName": "subcategory_c", "operator": "Contains", "values": [query]},
                {"fieldName": "description_c", "operator": "Contains", "values": [query]}
              ],
              "operator": "OR"
            }
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];
    } catch (error) {
      console.error("Error searching products:", error?.response?.data?.message || error);
      toast.error("Failed to search products");
      return [];
    }
  }

  async getFeatured() {
    try {
      const client = this.getClient();
      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "rating_c",
          "Operator": "GreaterThanOrEqualTo",
          "Values": [4.5]
        }],
        orderBy: [{"fieldName": "rating_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 8, "offset": 0}
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];
    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      toast.error("Failed to load featured products");
      return [];
    }
  }

  async getSaleItems() {
    try {
      const client = this.getClient();
      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: [{
          "FieldName": "discount_c",
          "Operator": "GreaterThan",
          "Values": [0]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];
    } catch (error) {
      console.error("Error fetching sale items:", error?.response?.data?.message || error);
      toast.error("Failed to load sale items");
      return [];
    }
  }

  async filterProducts(filters) {
    try {
      const client = this.getClient();
      const where = [];

      if (filters.category) {
        where.push({
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [filters.category]
        });
      }

      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (min !== undefined && min !== null) {
          where.push({
            "FieldName": "price_c",
            "Operator": "GreaterThanOrEqualTo",
            "Values": [min]
          });
        }
        if (max !== undefined && max !== null) {
          where.push({
            "FieldName": "price_c",
            "Operator": "LessThanOrEqualTo",
            "Values": [max]
          });
        }
      }

      const response = await client.fetchRecords(this.tableName, {
        fields: [
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "brand_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "original_price_c"}},
          {"field": {"Name": "discount_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "rating_c"}},
          {"field": {"Name": "review_count_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "tags_c"}}
        ],
        where: where
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      let filtered = response.data ? response.data.map(record => this.transformToUIFormat(record)) : [];

      // Client-side filtering for complex filters (sizes, colors, brands)
      if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter(p => 
          p.sizes && p.sizes.some(size => filters.sizes.includes(size))
        );
      }

      if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter(p => 
          p.colors && p.colors.some(color => filters.colors.includes(color))
        );
      }

      if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter(p => 
          filters.brands.includes(p.brand)
        );
      }

      return filtered;
    } catch (error) {
      console.error("Error filtering products:", error?.response?.data?.message || error);
      toast.error("Failed to filter products");
      return [];
    }
  }

  async getFilterOptions() {
    try {
      const products = await this.getAll();
      
      const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
      const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
      const sizes = [...new Set(products.flatMap(p => p.sizes || []))];
      const colors = [...new Set(products.flatMap(p => p.colors || []))];

      return {
        categories,
        brands,
        sizes,
        colors
      };
    } catch (error) {
      console.error("Error getting filter options:", error?.response?.data?.message || error);
      toast.error("Failed to load filter options");
      return {
        categories: [],
        brands: [],
        sizes: [],
        colors: []
      };
    }
  }
}

export const productService = new ProductService();
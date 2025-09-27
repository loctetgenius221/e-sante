import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { mockProducts } from "@/data/mockData";

export const useProductsStore = defineStore("products", () => {
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const searchQuery = ref("");
  const selectedCategory = ref("");
  const selectedManufacturer = ref("");

  // Computed properties
  const featuredProducts = computed(() => {
    const featured = products.value.filter((product) => product.featured);
    // Si aucun produit n'est featured, retourner les 3 premiers produits
    return featured.length > 0 ? featured : products.value.slice(0, 3);
  });

  const filteredProducts = computed(() => {
    let filtered = products.value;

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.manufacturer.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory.value) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory.value
      );
    }

    // Filter by manufacturer
    if (selectedManufacturer.value) {
      filtered = filtered.filter(
        (product) => product.manufacturer === selectedManufacturer.value
      );
    }

    return filtered;
  });

  const categories = computed(() => {
    const cats = [
      ...new Set(products.value.map((product) => product.category)),
    ];
    return cats.sort();
  });

  const manufacturers = computed(() => {
    const mfrs = [
      ...new Set(products.value.map((product) => product.manufacturer)),
    ];
    return mfrs.sort();
  });

  const lowStockProducts = computed(() =>
    products.value.filter((product) => product.stock <= product.minStock)
  );

  const expiringProducts = computed(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    return products.value.filter(
      (product) => new Date(product.expiryDate) <= thirtyDaysFromNow
    );
  });

  // Actions
  const fetchProducts = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      products.value = mockProducts;
      return { success: true };
    } catch (err) {
      error.value = "Failed to fetch products.";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const getProductById = (id) => {
    return products.value.find((product) => product.id === id);
  };

  const getProductsByCategory = (category) => {
    return products.value.filter((product) => product.category === category);
  };

  const getProductsByManufacturer = (manufacturer) => {
    return products.value.filter(
      (product) => product.manufacturer === manufacturer
    );
  };

  const addProduct = async (productData) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newProduct = {
        id: Date.now(),
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      products.value.push(newProduct);
      return { success: true, data: newProduct };
    } catch (err) {
      error.value = "Failed to add product.";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const updateProduct = async (id, updatedData) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = products.value.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.value[index] = {
          ...products.value[index],
          ...updatedData,
          updatedAt: new Date().toISOString(),
        };
        return { success: true, data: products.value[index] };
      }
      return { success: false, error: "Product not found." };
    } catch (err) {
      error.value = "Failed to update product.";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    isLoading.value = true;
    error.value = null;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const initialLength = products.value.length;
      products.value = products.value.filter((product) => product.id !== id);

      if (products.value.length < initialLength) {
        return { success: true };
      }
      return { success: false, error: "Product not found." };
    } catch (err) {
      error.value = "Failed to delete product.";
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };

  const updateStock = async (id, newStock) => {
    return await updateProduct(id, { stock: newStock });
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const setSelectedCategory = (category) => {
    selectedCategory.value = category;
  };

  const setSelectedManufacturer = (manufacturer) => {
    selectedManufacturer.value = manufacturer;
  };

  const clearFilters = () => {
    searchQuery.value = "";
    selectedCategory.value = "";
    selectedManufacturer.value = "";
  };

  return {
    // State
    products,
    isLoading,
    error,
    searchQuery,
    selectedCategory,
    selectedManufacturer,

    // Computed
    featuredProducts,
    filteredProducts,
    categories,
    manufacturers,
    lowStockProducts,
    expiringProducts,

    // Actions
    fetchProducts,
    getProductById,
    getProductsByCategory,
    getProductsByManufacturer,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    setSearchQuery,
    setSelectedCategory,
    setSelectedManufacturer,
    clearFilters,
  };
});

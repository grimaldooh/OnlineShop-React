import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch products from the API
export const fetchProducts = createAsyncThunk(
  'shop/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    items: [],
    filteredItems: [],
    currentCategory: null,
    searchItem: '',
    cartProducts: [],
    allOrders: [],
    isProductDetailOpen: false,
    isCheckOutOpen: false,
    productToShow: {},
    currentOrder: {},
    status: 'idle',
  },
  reducers: {
    
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    filterItems: (state) => {
      const searchItem = state.searchItem.toLowerCase();
      state.filteredItems = state.items.filter(item =>
        item.title.toLowerCase().includes(searchItem)
      );
    },
    openDetailProduct: (state) => {
      state.isProductDetailOpen = true;
    },
    closeDetailProduct: (state) => {
      state.isProductDetailOpen = false;
      state.productToShow = {};
    },
    openCheckOut: (state) => {
      state.isCheckOutOpen = true;
      state.isProductDetailOpen = false;
    },
    closeCheckOut: (state) => {
      state.isCheckOutOpen = false;
    },
    setProductToShow: (state, action) => {
      state.productToShow = action.payload;
    },
    addProductToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    removeProductFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    setSearchItem: (state, action) => {
      state.searchItem = action.payload;
    },
    completeCheckout: (state, action) => {
      state.allOrders.push(action.payload);
      state.cartProducts = [];
      state.currentOrder = action.payload;
    },
    filterItems: (state) => {
      const searchItem = state.searchItem.toLowerCase();
      if (searchItem) {
        const result = state.items.filter(item => 
          item.title.toLowerCase().includes(searchItem) || 
          item.category.toLowerCase().includes(searchItem)
        );

        // Remove duplicates
        state.filteredItems = Array.from(new Set(result.map(item => item.id)))
          .map(id => result.find(item => item.id === id));
      } else {
        state.filteredItems = [];
      }
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  setSearchItem,
  setCurrentCategory,
  setFilteredItems,
  filterItems,
  openDetailProduct,
  closeDetailProduct,
  openCheckOut,
  closeCheckOut,
  setProductToShow,
  addProductToCart,
  removeProductFromCart,
  clearCart,
  setAllOrders,
  setCurrentOrder,
  completeCheckout,
} = shopSlice.actions;

export default shopSlice.reducer;

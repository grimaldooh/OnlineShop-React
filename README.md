# 🛒 OnlineShop - Modern E-commerce Platform

A full-featured e-commerce solution built with ASP.NET Core MVC, featuring comprehensive product management, secure payment processing, and advanced shopping cart functionality.

## ✨ Features

- **🛍️ Product Catalog** - Advanced product management with categories and variants
- **🛒 Shopping Cart** - Persistent cart with session management
- **💳 Payment Processing** - Secure payment integration with multiple gateways
- **👤 User Management** - Customer accounts and order history
- **📦 Order Management** - Complete order lifecycle tracking
- **🏪 Admin Dashboard** - Comprehensive backend management
- **📊 Sales Analytics** - Revenue tracking and business insights
- **🔍 Advanced Search** - Product search with filters and sorting

## 🛠️ Technologies

### Backend
- **ASP.NET Core MVC** - Modern web application framework
- **C#** - Primary programming language
- **Entity Framework Core** - ORM for database operations
- **SQL Server** - Relational database management
- **Identity Framework** - Authentication and authorization
- **AutoMapper** - Object mapping
- **FluentValidation** - Input validation

### Frontend
- **Razor Pages** - Server-side rendering
- **Bootstrap 5** - Responsive CSS framework
- **JavaScript/jQuery** - Client-side interactivity
- **AJAX** - Asynchronous data loading
- **Font Awesome** - Icon library

### Architecture
- **MVC Pattern** - Model-View-Controller architecture
- **Repository Pattern** - Data access abstraction
- **Unit of Work** - Transaction management
- **Dependency Injection** - IoC container
- **Clean Architecture** - Separation of concerns

## 🚀 Getting Started

### Prerequisites
- .NET 6.0 or later
- SQL Server 2019+
- Visual Studio 2022 or VS Code
- Node.js (for frontend tooling)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/grimaldooh/OnlineShop.git
cd OnlineShop
```

2. **Database Configuration**
```json
// appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=OnlineShopDB;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

3. **Database Migration**
```bash
# In Package Manager Console
Add-Migration InitialCreate
Update-Database
```

4. **Run the application**
```bash
dotnet run
# Navigate to https://localhost:5001
```

## 🏗️ Project Structure

```
OnlineShop/
├── Controllers/
│   ├── HomeController.cs         # Main page controller
│   ├── ProductController.cs      # Product catalog
│   ├── CartController.cs         # Shopping cart
│   ├── OrderController.cs        # Order management
│   └── AdminController.cs        # Admin panel
├── Models/
│   ├── Product.cs                # Product entity
│   ├── Category.cs               # Product categories
│   ├── CartItem.cs               # Shopping cart items
│   ├── Order.cs                  # Order entity
│   └── ViewModels/               # View models
├── Views/
│   ├── Home/                     # Home page views
│   ├── Product/                  # Product views
│   ├── Cart/                     # Shopping cart views
│   ├── Order/                    # Order views
│   └── Shared/                   # Shared layouts
├── Data/
│   ├── ApplicationDbContext.cs   # EF Context
│   └── Migrations/               # Database migrations
├── Services/
│   ├── ProductService.cs         # Product business logic
│   ├── CartService.cs            # Cart operations
│   ├── OrderService.cs           # Order processing
│   └── PaymentService.cs         # Payment processing
└── wwwroot/
    ├── css/                      # Stylesheets
    ├── js/                       # JavaScript files
    └── images/                   # Product images
```

## 🎯 Core Features

### Product Management
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string ImageUrl { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; }
    public int StockQuantity { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedDate { get; set; }
}
```

### Shopping Cart System
```csharp
public class CartService
{
    public async Task AddToCartAsync(int productId, int quantity)
    {
        var product = await _productService.GetByIdAsync(productId);
        var cartItem = new CartItem
        {
            ProductId = productId,
            Product = product,
            Quantity = quantity,
            Price = product.Price
        };
        
        await _cartRepository.AddAsync(cartItem);
    }
    
    public async Task<decimal> GetCartTotalAsync(string userId)
    {
        var cartItems = await _cartRepository.GetByUserIdAsync(userId);
        return cartItems.Sum(item => item.Price * item.Quantity);
    }
}
```

### Order Processing
- **Order Creation** - Convert cart to order
- **Payment Integration** - Secure payment processing
- **Order Tracking** - Status updates and notifications
- **Invoice Generation** - PDF invoice creation
- **Shipping Integration** - Tracking and logistics

## 💳 Payment Integration

### Supported Payment Methods
- **Credit/Debit Cards** - Visa, MasterCard, American Express
- **PayPal** - Popular online payment system
- **Bank Transfer** - Direct bank payments
- **Digital Wallets** - Apple Pay, Google Pay

### Security Features
- **PCI DSS Compliance** - Payment card industry standards
- **SSL Encryption** - Secure data transmission
- **Tokenization** - Secure payment token storage
- **Fraud Detection** - Transaction monitoring

## 🔍 Search & Navigation

### Product Search
```csharp
public async Task<List<Product>> SearchProductsAsync(
    string searchTerm, 
    int? categoryId, 
    decimal? minPrice, 
    decimal? maxPrice)
{
    var query = _context.Products.AsQueryable();
    
    if (!string.IsNullOrEmpty(searchTerm))
        query = query.Where(p => p.Name.Contains(searchTerm) || 
                                p.Description.Contains(searchTerm));
    
    if (categoryId.HasValue)
        query = query.Where(p => p.CategoryId == categoryId);
    
    if (minPrice.HasValue)
        query = query.Where(p => p.Price >= minPrice);
    
    if (maxPrice.HasValue)
        query = query.Where(p => p.Price <= maxPrice);
    
    return await query.ToListAsync();
}
```

### Navigation Features
- **Category Browse** - Hierarchical product categories
- **Filter System** - Price, brand, rating filters
- **Sort Options** - Price, popularity, newest, rating
- **Pagination** - Efficient large catalog browsing
- **Breadcrumbs** - Easy navigation tracking

## 👤 User Management

### Customer Features
- **Account Registration** - Secure user registration
- **Profile Management** - Personal information updates
- **Order History** - Complete purchase tracking
- **Wishlist** - Save products for later
- **Address Book** - Multiple shipping addresses

### Authentication & Security
```csharp
[Authorize]
public class OrderController : Controller
{
    public async Task<IActionResult> MyOrders()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var orders = await _orderService.GetUserOrdersAsync(userId);
        return View(orders);
    }
}
```

## 🏪 Admin Dashboard

### Administrative Features
- **Product Management** - CRUD operations for products
- **Category Management** - Organize product categories
- **Order Management** - Process and track orders
- **User Management** - Customer account administration
- **Inventory Tracking** - Stock level monitoring
- **Sales Reports** - Revenue and performance analytics

### Dashboard Analytics
```csharp
public class AdminDashboardViewModel
{
    public int TotalProducts { get; set; }
    public int TotalOrders { get; set; }
    public int TotalCustomers { get; set; }
    public decimal TotalRevenue { get; set; }
    public List<OrderSummary> RecentOrders { get; set; }
    public List<ProductSales> TopSellingProducts { get; set; }
}
```

## 📊 Business Intelligence

### Sales Analytics
- **Revenue Tracking** - Daily, weekly, monthly reports
- **Product Performance** - Best and worst selling items
- **Customer Insights** - Purchase behavior analysis
- **Inventory Reports** - Stock levels and turnover
- **Profit Margins** - Profitability analysis

### Reporting Features
- **Dashboard Widgets** - Key performance indicators
- **Export Functionality** - Excel and PDF reports
- **Date Range Filtering** - Custom period analysis
- **Visual Charts** - Graphical data representation
- **Automated Reports** - Scheduled report generation

## 📱 Responsive Design

### Mobile Optimization
- **Mobile-First Design** - Optimized for small screens
- **Touch-Friendly Interface** - Easy mobile navigation
- **Fast Loading** - Optimized for mobile networks
- **Progressive Web App** - App-like mobile experience
- **Offline Capability** - Basic functionality offline

### Cross-Browser Compatibility
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Graceful Degradation** - Fallbacks for older browsers
- **CSS Grid/Flexbox** - Modern layout techniques
- **Responsive Images** - Optimized for different screen sizes

## 🔐 Security Implementation

### Data Protection
- **Input Validation** - Prevent injection attacks
- **CSRF Protection** - Cross-site request forgery prevention
- **XSS Prevention** - Cross-site scripting protection
- **SQL Injection Prevention** - Parameterized queries
- **Data Encryption** - Sensitive data protection

### User Security
- **Password Hashing** - Secure password storage
- **Account Lockout** - Brute force protection
- **Two-Factor Authentication** - Optional 2FA support
- **Session Management** - Secure session handling
- **Privacy Compliance** - GDPR and data protection

## 🧪 Testing

### Unit Testing
```csharp
[TestFixture]
public class ProductServiceTests
{
    [Test]
    public async Task GetProductById_ValidId_ReturnsProduct()
    {
        // Arrange
        var productId = 1;
        
        // Act
        var result = await _productService.GetByIdAsync(productId);
        
        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(productId, result.Id);
    }
}
```

### Integration Testing
- **Controller Testing** - HTTP request/response testing
- **Database Testing** - Data access layer testing
- **Payment Testing** - Payment flow validation
- **Security Testing** - Authentication and authorization

## 🚀 Performance Optimization

- **Caching Strategy** - Output and data caching
- **Database Optimization** - Query optimization and indexing
- **Image Optimization** - Compressed and responsive images
- **Minification** - CSS and JavaScript optimization
- **CDN Integration** - Fast static content delivery

## 🌍 Scalability Features

- **Horizontal Scaling** - Multi-instance deployment
- **Database Sharding** - Distributed data storage
- **Load Balancing** - Traffic distribution
- **Microservices Ready** - Modular architecture
- **Cloud Deployment** - Azure/AWS compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Follow coding standards and best practices
4. Write comprehensive tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Angel Grimaldo** - [GitHub](https://github.com/grimaldooh)

## 🛒 E-commerce Impact

OnlineShop provides a complete e-commerce solution featuring:
- Modern web technologies and best practices
- Secure and scalable architecture
- Comprehensive business management tools
- Excellent user experience across all devices

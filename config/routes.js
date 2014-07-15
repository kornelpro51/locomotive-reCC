
// LOCOMOTIVE JS ROUTING CONFIGURATION


module.exports = function routes() {

 // Dynamic Routes
  this.match('admin/:model/:id', 'dynamic/sequalize#init', { via: ['DELETE', 'PUT', 'GET'] });
  this.match('admin/:model', 'dynamic/sequalize#init', { via: ['POST', 'DELETE', 'PUT', 'GET'] });

  // Static Routes

  // Catalog (Merhchant) Routes
  this.match('frontend/merchant', 'static/merchant#getMerchant', { via: ['GET'] });
  this.match('frontend/merchant/getActiveSell', 'static/merchant#getActiveSell', { via: ['GET'] })
  this.match('frontend/merchant/:id', 'static/merchant#getActiveBuy', { via: ['GET'] });

  // Account Routes
  this.match('frontend/login', 'static/account#login', { via: ['POST'] });
  this.match('frontend/logout', 'static/account#logout'), { via: 'GET' };
  this.match('frontend/checkuser', 'static/account#getUser'), { via: 'GET' };
  this.match('frontend/account', 'static/account#create', { via: ['POST'] });

  // Address Routes
  this.match('frontend/addresses', 'static/address#index', { via: ['GET'] });
  this.match('frontend/addresses/:id', 'static/address#show', { via: ['GET'] });
  // this.match('frontend/addresses/default', 'static/address#default', { via: ['GET'] });
  this.match('frontend/addresses/default/:id', 'static/address#setDefault', { via: ['POST'] });
  this.match('frontend/addresses/', 'static/address#create', { via: ['POST'] });


  // Buy Cart Routes
  this.match('frontend/addToCart/:id', 'static/buycart#addToCart', { via: 'GET' });
  this.match('frontend/showCart', 'static/buycart#showCart', { via: 'GET' });
  this.match('frontend/deleteFromCart/:id', 'static/buycart#deleteFromCart', { via: 'GET' });

  // Buy Order Routes
  this.match('frontend/buy/createOrder', 'static/buyorder#createOrder', { via: 'POST' });
  this.match('frontend/buy/getOrder/:id', 'static/buyorder#getOrder', { via: 'GET' });
  this.match('frontend/buy/getAllOrders', 'static/buyorder#getAllOrders', { via: 'GET' });

  // Statuses
  this.match('frontend/orders/applyStatusMap/:type', 'static/status#applyStatusMap', { via: 'POST' });
  this.match('frontend/orders/getStatusMap/:type', 'static/status#getStatusMap', { via: 'GET' });
  this.match('frontend/orders/getValue', 'static/status#getValue', { via: 'POST' });
  this.match('frontend/orders/getOrderTypesMap', 'static/status#getOrderTypesMap', { via: 'GET' });
  this.match('frontend/statuses', 'static/status#getAll', { via: 'GET' });

  // Sell Cart Routes
  this.match('frontend/sell/addToCart', 'static/sellcart#addToCart', { via: 'POST' });
  this.match('frontend/sell/updateCart', 'static/sellcart#updateCart', { via: 'POST' });
  this.match('frontend/sell/showCart', 'static/sellcart#getCart', { via: 'GET' });;
  this.match('frontend/sell/deleteFromCart/:itemId', 'static/sellcart#deleteFromCart', { via: 'DELETE' });

  // Sell Order Routes
  this.match('frontend/sell/createOrder', 'static/sellorder#createOrder', { via: 'POST' });
  this.match('frontend/sell/getOrder/:id', 'static/sellorder#getOrder', { via: 'GET' });
  this.match('frontend/sell/getAllOrders', 'static/sellorder#getAllOrders', { via: 'GET' });

// Test Routes
  this.match('tests/generateData', 'test/Faker#generate');
  this.match('tests/verify', 'test/Verify#index');

  this.match('tests/bookshelf', 'test/Bookshelf#createOrder', { via: 'POST' });




}

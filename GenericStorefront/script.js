(function() {
  var app = angular.module("store", ["store-products"]);

  app.controller("StoreController", ["$http", function($http) {
    this.products = gems;
    /*var store = this;
    store.products = [];

    $http.get("/products.json").success(function(data)  {
      store.products = data;
    });*/
  }]);
  app.controller("PanelController", function() {
    this.tab = 0;

    this.selectTab =  function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    }
  });
  app.controller("ReviewController", function() {
    this.review = {};

    this.addReview = function(product) {
      product.reviews.push(this.review);
      this.review = {};
    }
  });
  var gems = [
    {
      name: "Monica Diamond",
      price: 2000.00,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor laoreet sagittis. Quisque augue metus, sodales ut elit ut, efficitur accumsan nunc. Nullam at posuere leo. Phasellus varius euismod accumsan.",
      canPurchase: true,
      soldOut: false,
      image: "white-gem.jpg",
      shine: 70,
      faces: 5,
      rarity: 2,
      color: "White",
      reviews: [
        {
          stars: 3,
          body: "It's okay.",
          author: "sammy@yahoo.com"
        },
      ],
    },
    {
      name: "Monica Ruby",
      price: 223.10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor laoreet sagittis. Quisque augue metus, sodales ut elit ut, efficitur accumsan nunc. Nullam at posuere leo. Phasellus varius euismod accumsan.",
      canPurchase: true,
      soldOut: false,
      image: "red-gem.jpg",
      shine: 70,
      faces: 5,
      rarity: 2,
      color: "Red",
      reviews: [
        {
          stars: 1,
          body: "I hate it!",
          author: "rob@otmail.com"
        },
      ],
    },
    {
      name: "Monica Sapphire",
      price: 999.10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tempor laoreet sagittis. Quisque augue metus, sodales ut elit ut, efficitur accumsan nunc. Nullam at posuere leo. Phasellus varius euismod accumsan.",
      canPurchase: true,
      soldOut: false,
      image: "blue-gem.jpg",
      shine: 70,
      faces: 5,
      rarity: 2,
      color: "Blue",
      reviews: [
        {
          stars: 5,
          body: "I love it!",
          author: "bob@gmail.com"
        },
      ],
    }
  ];
})();

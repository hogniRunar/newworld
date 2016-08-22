new Vue({

  // We want to target the div with an id of 'events'
  el: '#prices',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    json: {},
    jsonurl: 'https://api.myjson.com/bins/1wknb',
    prices: ['low', 'med', 'high'],
    materials: {},
    stocks: {},
    currentTotal: 0,
    history: []
  },

  // Anything within the ready function will run when the application loads
  ready: function() {
    this.getJSONFile();
  },

  // Methods we want to use in our application are registered here
  methods: {
    getJSONFile: function(){
      this.$http.get(this.jsonurl).then(function(response) {
        this.json = JSON.parse(response.body);
        this.randomizePrices();
      });
    },

    randomizePrices: function(){
      this.currentTotal = 0;
      var rawMaterials = this.json['Hráefni'];
      var stocks = this.json['Hlutabréf'];
      var returnMaterialObject = {};
      var returnStockObject = {};

      for(var materialField in rawMaterials){
        var randomNumber = Math.floor(Math.random() * 3);
        var priceArray = [];
        var priceCategory = this.prices[randomNumber];
        var priceNumber = rawMaterials[materialField][priceCategory];
        priceArray.push(priceNumber);
        priceArray.push(priceCategory);
        returnMaterialObject[materialField] = priceArray;
      }

      for(var stockField in stocks){
        var randomNumber = Math.floor(Math.random() * 3);
        var priceArray = [];
        var priceCategory = this.prices[randomNumber];
        priceArray.push(priceCategory)
        for(var innerField in stocks[stockField]){
          var priceNumber = stocks[stockField][innerField][priceCategory];
          priceArray.push(priceNumber);
        }
        returnStockObject[stockField] = priceArray;
      }
      this.$set('materials', returnMaterialObject);
      this.$set('stocks', returnStockObject);
    },

    addPrice: function(price, key){
      this.currentTotal += price;
      var historyArray = [];
      historyArray.push(key);
      historyArray.push(price);
      this.history.push(historyArray);
    },

    undoAction: function(){
      if(this.history.length === 0) {
        return;
      }
      var subraction = this.history[this.history.length - 1][1];
      this.currentTotal -= subraction;
      this.history.pop();
    },

    isNumber: function(number) {
      if(number === parseInt(number, 10)){
        return true
      }else{
        return false;
      }
    }

  }
});

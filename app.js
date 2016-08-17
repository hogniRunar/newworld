new Vue({

  // We want to target the div with an id of 'events'
  el: '#prices',

  // Here we can register any values or collections that hold data
  // for the application
  data: {
    json: {},
    jsonurl: 'https://api.myjson.com/bins/4prxn',
    prices: ['low', 'med', 'high'],
    materials: {},
    stocks: {}
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
      var rawMaterials = this.json['Hráefni'];
      var stocks = this.json['Hlutabréf'];
      var tempMaterialObject = {};
      var tempStockObject = {};

      for(var materialField in rawMaterials){
        var randomNumber = Math.floor(Math.random() * 3);
        tempMaterialObject[materialField] = rawMaterials[materialField][this.prices[randomNumber]];

      }

      for(var stockField in stocks){
        var randomNumber = Math.floor(Math.random() * 3);
        for(var innerField in stocks[stockField]){
            console.log(stocks[stockField][innerField][this.prices[randomNumber]]);
        }
        tempStockObject[stockField] = stocks[stockField][this.prices[randomNumber]];

      }
      console.log(tempStockObject);
      this.$set('materials', tempMaterialObject);
      this.$set('stocks', tempStockObject);
    }

  }
});

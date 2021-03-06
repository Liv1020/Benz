/**
 * Created by 李鹏飞 on 2016/1/15.
 */
angular.module('starter.services', [])

.service('carService', function ($q, $http) {

  this.lists = function(){
    var defer = $q.defer();

    $http.get('/data/cars.json').success(function(results) {
      defer.resolve(results);
    }).error(function(error) {
      defer.reject('获取数据失败：'+ error);
    });

    return defer.promise;
  };

  this.car = function(id){
    var defer = $q.defer();

    $http.get('/data/cars.json').success(function(results) {
      defer.resolve(results[id]);
    }).error(function(error) {
      defer.reject('获取数据失败：'+ error);
    });

    return defer.promise;
  };
})

.service('cartService', function ($q, $http) {
  this.cart = {
    "car": null,
    "schemes": {
      1: {text: "延保两年", price: 648800, checked: true}
    },
    "schemesCount": 648800,
    "gifts": {
      1: {text: "3M 贴膜", price: 380000, checked: true},
    },
    "giftsCount": 380000,
    "insurance": null,
    "financial": {
      "name": "平安车险",
      "items": {
        "1": {
          "text": "第三者责任险",
          "badge": "50万",
          "price": "125200"
        },
        "2": {
          "text": "车辆损失险",
          "price": "462400"
        },
        "3": {
          "text": "全车盗抢险",
          "price": "182700"
        },
        "4": {
          "text": "玻璃单独破损险",
          "price": "95700",
          "badge": "进口"
        },
        "5": {
          "text": "自然损失险",
          "price": "57400"
        },
        "6": {
          "text": "不计免赔特约险",
          "price": "125100"
        },
        "7": {
          "text": "无过责任险",
          "price": "32600"
        },
        "8": {
          "text": "车上人员责任险",
          "price": "20000"
        },
        "9": {
          "text": "车身划痕险",
          "price": "58500",
          "badge": "2千"
        }
      }
    },
    "financialCount": 1159600,
    "count": 0,
    "allCount": 0,
    "preferential": "",
    "shangye": 1028800,
    "jiaoqiang": 80000,
    "gouzhi": 3271800,
    "service": 42000,
    "chechuan": 95000,
    "shangpai": 42000
  };

  /**
   * 设置车辆
   * @param car
   */
  this.setCar = function(car){
    this.cart.car = car;
  };

  /**
   * 添加经销商方案
   * @param id
   * @param val
   */
  this.addScheme = function(id, val){
    this.cart.schemesCount = parseInt(this.cart.schemesCount) + parseInt(val.price);
    this.cart.schemes[id] = val;
  };

  /**
   * 添加精品选配
   * @param id
   * @param val
   */
  this.addGift = function(id, val){
    this.cart.giftsCount = parseInt(this.cart.giftsCount) + parseInt(val.price);
    this.cart.gifts[id] = val;
  };

  /**
   * 商业保险
   * @param val
   */
  this.setInsurance = function(val){
    this.cart.insurance = val;
    this.reCalculate();
  };

  /**
   * 重新计算
   */
  this.reCalculate = function () {
    this.cart.count = 0;
    this.cart.allCount = 0;

    if(this.cart.car){
      this.cart.allCount += parseInt(this.cart.car.price);
    }

    if(this.cart.schemesCount){
      this.cart.count += parseInt(this.cart.schemesCount);
      this.cart.allCount += parseInt(this.cart.schemesCount);
    }

    if(this.cart.giftsCount){
      this.cart.count += parseInt(this.cart.giftsCount);
      this.cart.allCount += parseInt(this.cart.giftsCount);
    }

    if(this.cart.insurance){
      this.cart.count += parseInt(this.cart.insurance.first);
    }

    if(this.cart.preferential){
      this.cart.count -= parseInt(this.cart.preferential) * 100;
      this.cart.allCount -= parseInt(this.cart.preferential) * 100;
    }

    this.cart.count += parseInt(this.cart.shangye);
    this.cart.count += parseInt(this.cart.jiaoqiang);
    this.cart.count += parseInt(this.cart.gouzhi);
    this.cart.count += parseInt(this.cart.service);
    this.cart.count += parseInt(this.cart.chechuan);
    this.cart.count += parseInt(this.cart.shangpai);

    this.cart.allCount += parseInt(this.cart.shangye);
    this.cart.allCount += parseInt(this.cart.jiaoqiang);
    this.cart.allCount += parseInt(this.cart.gouzhi);
    this.cart.allCount += parseInt(this.cart.service);
    this.cart.allCount += parseInt(this.cart.chechuan);
    this.cart.allCount += parseInt(this.cart.shangpai);
  };

  /**
   * 获取保险
   * @returns {Promise}
   */
  this.getFinancial = function () {
    var defer = $q.defer();

    $http.get('/data/financials.json').success(function(results) {
      defer.resolve(results);
    }).error(function(error) {
      defer.reject('获取数据失败：'+ error);
    });

    return defer.promise;
  }
});

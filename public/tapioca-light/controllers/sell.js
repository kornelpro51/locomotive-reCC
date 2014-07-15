tapioca.controller('sellCtrl',
    [ '$scope', '$http', '$routeParams', '$rootScope', '$modal', '$flash', '$location', '$log', '$timeout', 'ngProgressLite', 'growl', 'Sell', 'Address',
    function ($scope, $http, $routeParams, $rootScope, $modal, $flash, $location, $log, $timeout, ngProgressLite, growl, Sell, Address) {

        $scope.haveOffer = false;

        $scope.cart = [];
        $scope.order = null;
        $scope.merchants = ['sss', 'sade'];
        $scope.totalOffer = 0;
        $scope.addressList = [];
        $scope.selectedAddress = null;
        $scope.order = null;

        // Step 1 - Radio options - Default values
        $scope.order = { orderType: $routeParams.orderType || '0', payoutType: $routeParams.payoutType || '0' };'$modal',


        Sell.getActive().then(function (response) {

            if (response.success == true) {
                $scope.merchants =  _.pluck(response.data, 'name')
            } else {
                $flash.notify('alert alert-danger', response.message, '');
            }

        })

        Sell.getCart().then(function (response) {

            if (response.success && response.data && (response.data.length > 0)) {
                $scope.cart = response.data
                $scope.totalOffer = _.reduce(_.pluck(response.data, 'offer'), function(tot, val) { return tot + val; }, 0)
                $scope.haveOffer  = true;
            }

        })

        $scope.changeAddress = function (type) { // type Change or Add New Address
            var modalInstance = $modal.open({
                templateUrl: 'partials/addressModal.html',
                controller: AddressModalInstanceCtrl,
                resolve: {
                    type: function() {
                        return type;
                    }
                }
            });

            modalInstance.result.then(function (results) {
                $log.info(results);
                $scope.selectedAddress = results;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.initCheckout = function() {

            Address.getAll().then(function(addresses) {
                $scope.addressList     =  addresses;
                $scope.defaultAddress  =  _.findWhere(addresses, { 'def': 1 });
                if (addresses.length == 1 && $scope.defaultAddress == null) {
                  $scope.selectedAddress  =  addresses[0];
                }
                if ($scope.defaultAddress) {
                  $scope.selectedAddress  =  $scope.defaultAddress;
                }
            });

            $('.tab-pane').each(function() {
                $(this).removeClass("active");
            });
            $('#'+$rootScope.tab_to_active).addClass("active");
        }

        $scope.getOffer = function (card) {
            ngProgressLite.start();
            if (card.value === undefined) {
                growl.addErrorMessage('You have to enter a value', {ttl: 10000});
            } else {
                Sell.addToCart(card).then(function (response) {
                    if (response.success) {
                        $flash.notify('col-lg-10 col-lg-offset-1 alert alert-success', 'Congratulations, We\'d like to make you the following offer!', '');
                        $scope.totalOffer = _.reduce(_.pluck(response.data, 'offer'), function(tot, val){ return tot + val; }, 0)
                        $scope.cart = response.data
                        $scope.haveOffer = true;
                        $scope.card.merchant = '';
                        $scope.card.value = '';
                        ngProgressLite.done();
                    } else {
                        $flash.notify('col-lg-10 col-lg-offset-1 alert alert-danger', 'Error: Could not find this merchant', '');
                    }
                });
            }
        }

        $scope.deleteFromCart = function (itemId) {

            Sell.deleteFromCart(itemId).then(function (response) {

                if (response.success) {
                    $flash.notify('col-lg-10 col-lg-offset-1 alert alert-success', 'Card has been deleted!', '');
                    $scope.totalOffer = _.reduce(_.pluck(response.data, 'offer'), function(tot, val){ return tot + val; }, 0)
                    $scope.cart = response.data
                    if ($scope.cart.length == 0) {
                        $scope.haveOffer = false;
                    }
                } else {
                    $flash.notify('col-lg-10 col-lg-offset-1 alert alert-danger', 'Error: Could not delete Card.', '');
                }

            })

        }

        $scope.stepOne = function () {
            $location.search($routeParams);
            $location.path('/sell');
        }

        $scope.stepTwo = function (order) {
            $scope.order = order;
            $location.search(order);
            $location.path('/sell/cards');
        }

        $scope.checkout = function () {

            // Dirty solution - tied to status mapping in sequelizeStatusMap.js
            $scope.mapping_tabs = { '0': 'CreditCard', '1': 'Amazon' , '2': 'Paypal' , '3': 'ACH' };

            // Tab to active depending on data-target in sell_checkout.html
            $rootScope.tab_to_active = $scope.mapping_tabs[$routeParams.payoutType];

            // This line allows to active tab as to selected options in step 1
            $scope.order = { orderType: $routeParams.orderType, payoutType: $routeParams.payoutType };

            // Save cart updated in Step 2
            Sell.updateCart($scope.cart).then(function (response) {
                if (response.success) {
                    $scope.cart = response.data;
                    $location.path('/sell/checkout');
                } else {
                    $flash.notify('col-lg-10 col-lg-offset-1 alert alert-danger', 'Error: Could not update cart', '');
                }
            });

        }

        $scope.placeOrder = function () {
            $scope.order['address'] = {id : $scope.selectedAddress.id}
            if ($scope.cart.length == 0) {
                $flash.notify('col-lg-10 col-lg-offset-1 alert alert-danger', 'Cart is empty. Go back to first step to get an offer.', '');
            } else {
                // Save Order
                $http.post('/frontend/sell/createOrder', $scope.order).then(function(res) {
                    if (res.data.success) {
                        $location.path('/sell/checkout/invoice/' + res.data.data.id)
                    }
                }, function (err) {
                    $flash.notify('col-lg-10 col-lg-offset-1 alert alert-danger', 'There was an error saving Order. Please try again.', '');
                });
            }
        }

    }
]);
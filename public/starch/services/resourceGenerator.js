nuAdmin.factory('resourceGenerator', function($resource, $rootScope, $q) {

    return {

        init: function(name, includes) {

            return {
                name: name,
                page: 1,
                limit: 20,
                items: null,
                count: null, // Number of rows
                pages: null,
                selectedItem: null,
                where: {},
                order: {},
                include: includes,
                resource: $resource('/admin/' + name + '/:id', {}, {
                    update: {
                        method: 'PUT'
                    },
                    bulkUpdate: {
                        method: 'PUT'
                    }
                }),
                search: {},

                //
                find: function() {
                    var this_ = this;
                    var delay = $q.defer();
                    this_.resource.get({
                        include: JSON.stringify(this_.include),
                        limit: this_.limit,
                        page: this_.page,
                        where: JSON.stringify(this_.where),
                        order: JSON.stringify(this_.order)
                    }, function(results) {
                            this_.count = results.count;
                            this_.items = results.rows;
                            // console.log(this_.items)
                            this_.pages = Math.ceil(results.count / this_.limit);
                            delay.resolve(results);
                    });
                    return delay.promise;
                },

                // Create A New Entity
                create: function(item) {
                    return this.resource.save({
                        id: item.id
                    }, item, function(response) {
                        $rootScope.$broadcast('alertEvent', response);

                    });
                },

                update: function(item) {
                    this.resource.update({
                        id: item.id,
                    }, item, function(response) {
                        $rootScope.$broadcast('update', response);
                    });
                },

                bulkUpdate: function(item) {
                    this.resource.update({
                        id: item.id,
                    }, item, function(response) {
                        $rootScope.$broadcast('update', response);
                    });
                },

                // Utility Funtions
                setPage: function(difference) {
                    this.page = this.page + difference;
                    if (this.page < 1) {
                        this.page = 1
                    };
                },

                setWhere: function(column, operator, variable, vartype) {

                    this.where[column + operator] = {
                        'column': column,
                        'operator': operator,
                        'variable': variable,
                        'vartype': vartype
                    }

                    // If Column is Empty Delete Column
                    if (_.isEmpty(this.where[column + operator].variable)) {
                        delete this.where[column + operator]
                    }

                    this.page = 1;


                },

                setOrder: function(column, operator) {

                    if (operator === undefined) {
                        delete this.order[column];
                    } else {
                        this.order[column] = operator
                    }

                    this.page = 1;
                    this.getItems();


                },

                getSelected: function() {

                    var selected =  _.filter (this.items, function(item) {return item.isSelected == true})
                    return _.pluck(selected, 'id')

                },

                clearFilters: function(column, operator, variable, vartype) {

                    this.where = {}
                    this.order = {}
                    this.page = 1;
                },

                // Backwards Compatability

                updateItem: function(item) {
                    return this.update(item);
                },

                createItem: function(item, callback) {

                    return this.create(item, callback)
                },

                getItems: function() {
                    return this.find()
                },

                setSelectedItem: function(item) {
                    return this.setSelected(item)
                },

                setSelectedItembyID: function(itemID) {
                    return this.setSelected(null, itemID)
                }


            };
        }

    }

});
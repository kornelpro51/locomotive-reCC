var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    SequalizeController = new Controller(),
    _ = require('underscore'),
    util = require('util'),
    modelRegistry = require('../../models'),
    generateResponse = require('../../helpers/responseGenerator'),
    ss = require('../../helpers/sequelizeStatusMap.js'),
    Model = null;


SequalizeController.init = function() {

    if (!this.req.isAuthenticated() || this.req.user.role < 100) { return this.res.json(generateResponse(false, 'Not Logged In', null)) }
    Model = modelRegistry[capitaliseFirstLetter(this.params('model'))]


    if (this.params('id')) {
        switch (this.req.route.method) {
            case 'get':
                return this.show();
                break;
            case 'put':
                return this.update();
                break;
            case 'delete':
                return this.destroy();
                break;
        }

    } else if (this.params('id') == null && this.req.route.method == 'get') {
        return this.index();
    } else if (this.req.route.method == 'put' && this.params('bulk')) {
        return this.bulkUpdate();
    } else if (this.req.route.method == 'post' && this.params('bulk')) {
        return this.bulkCreate();        
    } else if (this.req.route.method == 'post') {
        return this.create();
    }  else {
        return this.res.json(generateResponse(false, 'Action Not Found', null))
    }


}

SequalizeController.index = function() {

    var this_ = this;
    var count = null;
    var params = this.req.query;
    //console.log("/n" + "/n" + util.inspect(params, { showHidden: true, depth: null }));

    var queryParams = {
        include: parseIncludes(this.params('include')),
        offset: parseOffset(this.params('page'), this.params('limit')),
        where: parseWhere(this.params('where')),
        order: parseOrder(this.params('order')), 
        //attributes : JSON.parse(this.params('attributes')),
        limit: this.params('limit')
    }

  //  console.log(queryParams)

    Model.count()
        .then(function(cnt) {
            count = cnt
            return Model.findAll(queryParams)
        })
        .then(function(results) { 
            this_.res.json({rows : results, count: count});
        }, function (error) {
            this_.res.json(error)
        })



}


SequalizeController.show = function() {

    var this_ = this;
    var params = this.req.body;
    console.log(this.req.body);

    if (isNaN(this.params('id'))) {
        this_.res.json({})
    } else {

        console.log(parseIncludes(this.params('include')));
        Model.find({
            where: {
                id: this.params('id')
            },
            include: parseIncludes(this.params('include'))
        })
            .success(function(result) {
                //if (!result) {result = {}}
                this_.res.json(result)
            })
            .error(function(error) {
                console.log(error);

                console.log('aa');
                this_.res.json(error)
            })

    }
}


SequalizeController.create = function() {

    var this_ = this;
    var params = this.req.body;


    Model.create(params)
        .success(function(result) {

            result.success = true;
            this_.res.json(result)
        })

    .error(function(error) {

        var result = {}
        result.success = false;
        result.error = error;
        this_.res.json(result)
    })

}

SequalizeController.bulkCreate = function() {

    var this_ = this;
    var params = this.req.body;


    Model.bulkCreate(params.values)
        .success(function() {
            var result = {}
            result.success = true;
            this_.res.json(result)
        })

    .error(function(error) {

        var result = {}
        result.success = false;
        result.error = error;
        this_.res.json(result)
    })

}

SequalizeController.update = function(id) {
    var this_ = this;
    var params = this.req.body; 

    Model.find(this.params('id'))
        .success(function(result) {
            try {
                result.updateAttributes(params)
                    .success(function() {

                        // TODO: INSERT MONGOOSE MODEL HERL: FOR EACH MODEL.ID SAVE PARAMS, TIMESTAMP and USERID

                        this_.res.json({
                            'success': true,
                            data: result,
                            'message': 'Entity ' + this_.params('id') + ' was updated.'
                        });
                    })
                    .error(function(error) {
                        console.log(error);
                        this_.res.json({
                            'success': false,
                            'message': error
                        })
                    })
            } catch (e) {
                console.log(e);
            }
        })
        .error(function(error) {
            console.log(error);
            this_.res.json({
                'success': false,
                'message': error
            })
        })
}

SequalizeController.bulkUpdate = function() {
    var this_ = this;
    var params = this.req.body; 
 
    // Ensure Proper ACL
    if (!this.req.isAuthenticated() || this.req.user.role < ss.User.ACL.Manager) return this.res.json(generateResponse(false, 'Forbidden for this user', null))

    // Validate false nust be string, not object
    Model.update(params.values, params.where, {'validate': 'false'})
        .success(function(result) {
            this_.res.json({
                'success': true,
                'message': 'Entities was updated.'
            });
        })
        .error(function(error) {
            this_.res.json({
                'success': false,
                'message': error
            })
        })

}


SequalizeController.destroy = function() {

    var this_ = this;
    var params = this.req.body;

    Model.find(this.params('id'))


    .success(function(result) {

        result.destroy()
            .success(function() {
                // now i'm gone :)
                this_.res.json({
                    'success': true
                })
            })
            .error(function(error) {
                console.log(error);
                this_.res.json({
                    'success': false,
                    'message': error
                })
            })
    })

    .error(function(error) {
        console.log(error);
        this_.res.json({
            'success': false,
            'message': error
        })
    })


}


// Utility Functions

function parseWhere(whereReq) {

    var where = []
    if (!_.isEmpty(whereReq)) {
        whereReq = JSON.parse(whereReq)
    };

    _.each(whereReq, function(w) {

        if (w.vartype == 'string') {
            w.variable = "'" + w.variable + "'"
        } // Encapsulate String in Quotes for SQL
        if (w.vartype == 'date') {
            w.variable = "'" + w.variable + "'"
        } // Encapsulate String in Quotes for SQL
        if (w.vartype == 'int') {
            w.variable = w.variable
        } // Validate int 

        // TODO : Improve Sanaitization/Validation. Also validate/sanitize oprerator and cloumn

        where.push(w.column + w.operator + w.variable);
        console.log(where.join(","));

    });

    return where.join(" AND ")



}


function parseOrder(orderReq) {

    var order = []
    if (!_.isEmpty(orderReq)) {
        orderReq = JSON.parse(orderReq)
    };

    for (var key in orderReq) {
        // Make Sure Order Operator is Valid
        if (orderReq[key] === 'ASC' || orderReq[key] === 'DESC') {

            // Escape Column and Push to List
            order.push("`" + key + "`" + ' ' + orderReq[key])
        }
    }

    console.log(order.join(" "))
    return order.join(" , ")

}



function parseOffset(page, limit) {

    console.log(page);
    var off = limit * (page - 1);
    return off;

}


function parseIncludes(includes) {

    var returnArray = [];

    if (_.isEmpty(includes)) {
        return returnArray
    } else {
        includes = JSON.parse(includes);
        _.each(includes, function(value) {
            // Dynmaincally loads assoiciated modelss
            returnArray.push(modelRegistry[capitaliseFirstLetter(value)])
        });
    }

    return returnArray;

}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = SequalizeController;
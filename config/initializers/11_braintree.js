var braintree = require('braintree');

module.exports = function() {

    switch (this.env) {
        case 'development':
            this.gateway = braintree.connect({
                environment: braintree.Environment.Sandbox,
                merchantId: "92dtqthqxrbd9247",
                publicKey: "38x9sc822vvgxc6k",
                privateKey: "f2b195acd6b6faa4ffb32d99eab29258"
            });
            break;
        case 'production':
            break;
    }

}
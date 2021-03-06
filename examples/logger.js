/**
 * Example: Stack.Logger
 *
 * Output:
 *   Bootstraping component 'logger' w/ runtime configuration:
 *   Object {plugins: Array[2], filters: Object, enabled: true}
 *   and runtime opts: Object {} base.js:25
 *   [2013-6-14 23:47:17] [example (file:///Users/lpetrov/workspace/stack/examples/logger.js:46:16)] Hi there. logger.js:82
 *   [2013-6-14 23:47:17] [example (file:///Users/lpetrov/workspace/stack/examples/logger.js:48:20)] This is THE logger. logger.js:82
 *   [2013-6-14 23:47:17] [example2 (file:///Users/lpetrov/workspace/stack/examples/logger.js:53:16)] It's main goal is to help you debug your applications in development mode. logger.js:82
 *   [2013-6-14 23:47:17] [file:///Users/lpetrov/workspace/stack/examples/logger.js:59:16] (try to log something from anonymous func.)
 */
(function(Stack) {
    var config = {
        /**
         * Define domain environments
         *
         * 'order' - the order of inheritance
         * 'env_name' - must contain a list of domains that will be used for this environment
         */
        'environments': {
            'order': ['dev', 'staging', 'production'],
            'dev': [ // hosts for dev env.
                'stack.dev',
                '' // <- file://
            ],
            'production': [ // hosts for production
                'stack.prod.com'
            ]
        },

        /**
         * Development Mode
         */
        'dev': {
            'logger': {
                'filters': {
                    'TBDFilter': function(error_level, args) {
                        if(args.join(" ").indexOf("TBD") > -1) {
                            return false;
                        }
                    }
                }
            }
        },

        /**
         * Production Mode
         */
        'production': {
        }
    }
    Stack.Config.bootstrap(config);
    window.logger = new Stack.Logger(/* default options */);


    var example = function() {
        logger.log("Hi there.");
        (function() {
            logger.log("This is THE logger.");
        })();
    }
    function example2() {
        example();
        logger.log("It's main goal is to help you debug your applications in development mode.");
    }

    example2();

    (function() {
        logger.log("(try to log something from anonymous func.)");
    })();


})(Stack, undefined);
/*
 *      Konami Code v1.3 - implements the feature of the Konami Code into jQuery
 *      written by Dominik Kukacka
 *      http://codecookie.net/blog/konamicode
 *
 *      Copyright (c) 2010 Dominik Kukacka (http://codecookie.net/)
 *      Dual licensed under the MIT (http://bit.ly/TTtsU)
 *      and GPL (GPL-LICENSE.txt) licenses.
 *
 *      Built for jQuery library
 *      http://jquery.com
 *
 */

var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, A = 65, B = 66;

(function($){
    $.fn.konamicode = function(options) {
        var defaults = {
            speed: 3500,
            correctCombination: [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A],
            onCorrectCombination : function(){}
        };
        var options = $.extend(defaults, options);

        //the keys which the user have been pressed
        var insertedCombination = [];

        //our timer
        var timer = null;
        var timer_started = false;

        return this.bind('keyup', function(event) {

            //if one of the "command" keys is pressed
            if (event.ctrlKey || event.shiftKey || event.altKey) return;

            // if the key which was pressed is correct
            if (event.keyCode == options.correctCombination[insertedCombination.length]) {

                //if timer is not started start it
                if( !timer_started ) {

                    timer = setTimeout(function(){
                       reset();
                    }, options.speed);

                    timer_started = true;
                }

                //last is correct --> reset annd call callback
                if (insertedCombination.length == options.correctCombination.length - 1) {

                    reset();
                    options.onCorrectCombination.call(this);
                } else { // not the last in kombo --> insert
                    insertedCombination[insertedCombination.length] = event.keyCode;
                }
            } else {
                reset(); // wrong key dude
            }
        });


        function reset() {
            timer_started = false;
            clearTimeout(timer);
            insertedCombination = [];
        }

    };
})(jQuery);

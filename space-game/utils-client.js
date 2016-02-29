(function (){
    if (typeof mjb44=== 'undefined') {
        mjb44 = {};
    };

    var theLibrary;
    mjb44.createClientUtilsLibrary = function () {
        if (typeof theLibrary==='undefined') {

            var invokeInLoop = function invokeInLoop (f, delayMs, howManyTimes, controller) {
                var step = 1;
                if (typeof delayMs === 'undefined')
                    delayMs = 20;
                if (typeof howManyTimes === 'undefined') {
                    howManyTimes = 2;
                    step = 0;
                }
                if (typeof controller === 'undefined') {
                    controller = {
                        mayProceed: function mayProceed() {
                            return true;
                        }
                    };
                };
                if (delayMs < 0)
                    throw new Error('illegal delayMs value: ['+delayMs+']');
                if (howManyTimes<0)
                    throw new Error('illegal howManyTimes value: ['+howManyTimes+']');
                function loop(howManyTimes) {
                    if ((howManyTimes>1) && (controller.mayProceed())) {
                        window.setTimeout(function () {loop(howManyTimes-step);}, delayMs);
                    }
                    if (howManyTimes>0)
                        f();
                }
                loop(howManyTimes);
            };

            var evaluateXPath = function evaluateXPath (document, expression) {
                var nodes = document.evaluate(expression, document, null, XPathResult.ANY_TYPE, null);
                var results = [];
                var node = nodes.iterateNext();
                while(node) {
                    results.push(node);
                    node = nodes.iterateNext();
                }
                return results;
            };

            var printTextMultiLine = function fillTextMultiLine (ctx, text, x, y, fillOrStroke) {
                if (typeof fillOrStroke === 'undefined')
                    fillOrStroke = {fill: true, stroke: false};
                const lineHeight = ctx.measureText("M").width * 1.2;
                const lines = text.split("\n");
                for (var i = 0; i < lines.length; ++i) {
                    if (fillOrStroke.fill)
                        ctx.fillText(lines[i], x, y);
                    if (fillOrStroke.stroke)
                        ctx.strokeText(lines[i], x, y);
                    y += lineHeight;
                }
            };

            theLibrary = 
                {
                    invokeInLoop      : invokeInLoop,
                    evaluateXPath     : evaluateXPath,
                    printTextMultiLine: printTextMultiLine
                };
        };
        return theLibrary;
    };
})();


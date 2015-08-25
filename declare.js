(function(factory, global){
    if(typeof define === 'function' && define.amd){
        define(factory);
    }
    else if(typeof module === 'object' && typeof exports === 'object'){
        module.exports = factory();
    }
    else{
        global.declare = factory();
    }
})(function (){

    var xtor = function () {
    };

    function forceNew(ctor) {
        xtor.prototype = ctor.prototype;
        var t = new xtor;
        xtor.prototype = null;
        return t;
    }

    function mixin(/*Object*/dest, /*Object*/ mixins) {
        for (var p in mixins) {
            if(mixins.hasOwnProperty(p)) {
                dest[p] = mixins[p];
            }
        }
    }

    function include(members) {
        var proto = this.prototype, member;
        for (var name in members) {
            if (members.hasOwnProperty(name)) {
                member = members[name];
                if (typeof member == "function") {
                    member.$name = name;
                    member.$owner = this;
                }
                proto[name] = member;
            }
        }
    }

    function extend(members){
        return declare(this, members);
    }

    function inherited(params) {
        var method = this.inherited.caller, superMethod;
        method && method.$owner && method.$owner.superClass && (superMethod = method.$owner.superClass[method.$name]);
        if (superMethod) {
            return superMethod.apply(this, params);
        }
    }

    function makeCtor() {
        function ctor() {
            this.init && this.init.apply(this, arguments);
        }

        return ctor;
    }

    var declare = function (superclass, overrides) {
        var ctor = makeCtor();

        if (superclass) {
            ctor.prototype = forceNew(superclass);
            ctor.superClass = superclass.prototype;
        }
        ctor.fn = ctor.prototype;
        ctor.include = include;
        ctor.include(overrides);
        ctor.extend = extend;

        ctor.fn.inherited = inherited;
        ctor.fn.constructor = ctor;

        return ctor;
    };

    declare.mixin = mixin;

    return declare;
}, this);

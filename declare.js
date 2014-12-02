define(function () {
    var xtor = function () {
    };

    function forceNew(ctor) {
        xtor.prototype = ctor.prototype;
        var t = new xtor;
        xtor.prototype = null;
        return t;
    }

    function mixin(dest/*Object*/, mixins/*Object*/) {
        for (var p in mixins) {
            if(mixins.hasOwnProperty(p)) {
                dest[p] = mixins[p];
            }
        }
    }

    function addMembers(members/*Object*/) {
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

    var declare = function (className, superclass, overrides) {
        if (typeof className != "string") {
            overrides = superclass;
            superclass = className;
            className = "";
        }

        var ctor = makeCtor();

        if (superclass) {
            ctor.prototype = forceNew(superclass);
            ctor.superClass = superclass.prototype;
        }
        ctor.fn = ctor.prototype;
        ctor.addMembers = addMembers;
        ctor.addMembers(overrides);

        ctor.$className = className;
        ctor.fn.$className = className;
        ctor.fn.inherited = inherited;
        ctor.fn.constructor = ctor;

        //TODO:将className的变量指向ctor
        return ctor;
    };
    declare.mixin = mixin;

    return declare;
});

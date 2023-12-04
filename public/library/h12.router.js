@Component
class Router {
    constructor(property = {}) {

        this.Route = {};
        this.List = {};
        this.Component = null;
        this.Default = "";
        this.Key = "";
        this.Bucket = {};
        
        Object.assign(this, property);

    }
    Add(url = "", component = null) {

        this.List[url] = component;

    }
    Find(hash = "") {

        const _route = this.Route[hash.toLowerCase()];

        return (typeof(_route) !== "undefined") ? _route : null;

    }
    async Set() {
        
        const _url = window.location.hash;
        const _matchurl = _url.match(/\#\w+/g);

        if(_url.length == 0) {
            window.location.hash = this.Default;
        };

        if(_matchurl !== null) {

            const _route = this.Find(_matchurl[0]);
            if(_route == null) {
                this.Component.Set(this.Key, "404 Error");
                this.OnError();
            }
            else {
                
                for(const item in this.Bucket) {
                    this.Bucket[item].root.classList.add("hidden");
                    if(item !== _url && typeof(this.Bucket[item].OnRouterLeave) !== "undefined") {
                        this.Bucket[item].OnRouterLeave()
                    }
                };

                if(typeof(this.Bucket[_url]) !== "undefined") {

                    this.Bucket[_url].root.classList.remove("hidden");

                    if(typeof(this.Bucket[_url].OnRouterEnter) !== "undefined") {
                        this.Bucket[_url].OnRouterEnter()
                    };

                }
                else {
                    const _component = new _route;
                    _component.parent = this.Component;
                    _component.id = _url;
                    this.Component.child[_url] = _component;
                    this.Component.Set(`${this.Key}++`, await _component.pre());
                    this.Bucket[_url] = _component;

                    if(typeof(_component.OnRouterEnter) !== "undefined") {
                        _component.OnRouterEnter();
                    };

                };

            };

        };
        
        
    }
    Observe() {
        this.Component.Set(this.Key, "");
        window.onhashchange = () => {
            this.Set();
        };
    }
    OnMatch(url) {}
    OnError() {}
};

Router.Hash = function(hash = "") {
    const _url = window.location.hash;
    window.history.pushState({ prevUrl: window.location.href }, null, _url);
    window.location.hash = hash;
};

export default Router;
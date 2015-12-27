/* global Immutable */
/* global Rx */
function StoreFactory(name) {
    
    //Will always return the last item received to a subscriber
    var subject = new Rx.ReplaySubject(1);

    subject.updateData = function (data) {        
        subject.onNext(data);
    }

    subject.name = name;    
    
    return subject;
}


var Stores = (function() {    
    var _stores = {};

    return (function () {
        var dataStores = _stores;        
        return {
            addStore: function(name) {
                if (dataStores[name]) {
                    console.warn('This store has already been created')
                }
                dataStores[name] = StoreFactory(name);
                return dataStores[name];
            },
            getStore: function (name) {
                if (!dataStores[name]) {
                    throw new Error('Store does not exist')
                    return null;
                } 
                return dataStores[name];
            },
            getOrAddStore: function (name) {
                if (!dataStores[name]) {
                    dataStores[name] = StoreFactory(name);
                }
                return dataStores[name];
            },
            disposeAllObservers: function () {
                for (var storeName in dataStores) {
                    if (dataStores.hasOwnProperty(storeName)) {
                        var _store = dataStores[storeName];
                        _store.dispose();
                    }
                }                
            }
        }
    })();


}())


function MockAsyncApi(data) {
    var data = data;  
}

MockAsyncApi.prototype.httpGet = function (optData) {
    var data = optData || this.data;
         return new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {            
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(data);
                }, Math.random() * 2000 + 1000);
        });
}



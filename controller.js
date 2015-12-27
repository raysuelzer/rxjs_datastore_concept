
var ctrl = (function controller() {
    var numbersApi = new MockAsyncApi([1,2,3,4]),
        lettersApi = new MockAsyncApi(['a','b', 'c', 'd']),
        lettersStore = Stores.getOrAddStore('letters'),
        numbersStore = Stores.getOrAddStore('numbers')
    
     
     lettersStore.subscribe(function (data) {
         console.log('letters', data.toJS());
     });
    
      lettersStore.subscribe(function (data) {          
         document.getElementById('letters').innerText = JSON.stringify(data);
     });
     
    numbersStore.subscribe(function (data) {        
         console.log('letters', data.toJS());
     });
    
    var updateLetters = function (letters) {        
       return lettersApi.httpGet(letters).then(function (result) {
           console.log(lettersStore);
            lettersStore.updateData(result);   
        })
    }
       
    var updateNumbers = function (numbers) {        
       return numbersApi.httpGet(numbers).then(function (result) {
            numbersStore.updateData(result);
        })
    }
    
    updateNumbers([1,2,3]).then(() => updateLetters('b','d','c'))
    
    
    return {
        updateLetters: updateLetters,
        updateNumbers: updateNumbers
    }
    
}());
const storage = window.localStorage

const store = {
    get:function(key){
        return storage.getItem(key)
    },
    set:function(key,value){
        storage.setItem(key,value)
    },
    clear:function(key){
        storage.removeItem(key)
    },
    clearAll:function(){
        storage.clear()
    }
}

export default store
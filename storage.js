function saveChanges() { //salvestab linnukesed
       // Get a value saved in a form.
       var theValue = textarea.value;
       // Check that there's some code there.
       if (!theValue) {
         message('Error: No value specified');
         return;
       }
       // Save it using the Chrome extension storage API.
       chrome.storage.sync.set({'value': theValue}, function() {
         // Notify that we saved.
         message('Settings saved');
       });
     }


//chrome.storage.local.set({"name":"Romil"});
//.get("name",function(result){
    //result
//});


//fired at browser button click event
chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
  var activeURL = tabs[0].url;
  //set the active url at browser button click event
  document.getElementById("activeURL").value = activeURL;

   //add event for submit event
  $("#submitEvent").click(function(){
    return false; //required to maintain the state
  });

  //add event for cancel event
  $("#cancelEvent").click(function(){
      window.close();  
  });
});





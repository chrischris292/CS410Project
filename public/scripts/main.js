//http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    postData = {"body":vars["player"].replace("%20"," ")}
    postData = JSON.stringify(postData)
    console.log(postData)
    $.ajax({
  type: "POST",
  url: "/player",
  data: postData,
  contentType: "application/json",
  success: function(result){
  	console.log(result)
  },
  error: function(err){
    console.log(err.responseText)
  }
});
   
/*$.ajax("/2012", {
      type: 'GET',
      success: function(data) {
		console.log("Loaded player data")
    	console.log(data)
      },
      error: function(error) {
		console.log("ERROR")
         console.log(error)
      }
   });
*/
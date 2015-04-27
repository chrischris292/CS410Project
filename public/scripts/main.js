
   $.ajax("/2012", {
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

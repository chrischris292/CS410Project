imageDict = {};
//http://stackoverflow.com/questions/4656843/jquery-get-querystring-from-url
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
        console.log(vars["year"])
    imageLoad = "./images/"+vars["year"]+"PlayerImages.txt"
$.ajax(imageLoad, {
	type: 'GET',

	success: function(data) {
		console.log(data)
		$.ajax("/"+vars["year"], {
		type: 'GET',
		success: function(playerData) {
			playerData = JSON.parse(playerData)
			console.log(playerData)
			data = data.split("\n")
			//for (i in data){
			//	console.log(data[i])
			for(i=0;i<data.length;i=i+2){
				playerIndex = i/2;
				console.log(playerData[playerIndex])
				playerTemp = playerData[playerIndex]
				description = playerTemp.player.display_name +  "<br/>Round: " + playerTemp.round + "<br/>Pick: " + playerTemp.pick + "<br/>Career Points: " + playerTemp.points;
				imageDict[description] = data[i+1]


			}
			for(player in imageDict){
				name = player.split("<br/>")[0].replace(" ","_")
				name = "/data.html?player="+name;
				$(".row").append(' <div class="col s1 m3"> <div class="card large"> <div class="card-image"> <img src="'+imageDict[player]+'"> </div> <div class = "card-content"><p>'+player+'</p></div><div class="card-action"> <a href="#">This is a link</a> <a href="'+name+'">This is a link</a> </div> </div> </div> ');
			
			}
		},
		error: function(error) {
			console.log("ERROR")
			console.log(error)
			}
		});

	},
	error: function(error) {
		console.log("ERROR")
		console.log(error)
		}
	});

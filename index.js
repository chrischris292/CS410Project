// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var request = require('request');
var cheerio = require('cheerio');
var google = require('google')
var sentiment = require('sentiment');
var playerSentiment = [];

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
app.get('/2012', function(req, res){
   webScrapePlayers2012(res);
});



function main(){
}

function webScrapePlayers2012(res){
	player = []
	url = "http://www.nba.com/history/2012-draft-history/index.html"
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var playerRow;
            var playerName;
            var json = { title : "", release : "", rating : ""};
			$('.cnnIERowAltBG').each(function() {
			    player.push($(this).text().split("   ")[2]);
			   	playerSentiment[$(this).text().split("   ")[2]] = [];
			});
            res.status(200).send(player)

			//because of async must call function after this:
			//googleQueryWrapper(player)
		}
    })
}
//no idea why this doesnt work
function webScrapePlayers2014(res){
	url = "http://www.nba.com/draft/2014/draftboard.html"
    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture
            var title, release, rating;
            var playerRow;
            var playerName;
            var json = { title : "", release : "", rating : ""};
			$('.pickDesc').each(function() {
				console.log("hi")
			    console.log($(this));
			});
		}
        else
            console.log("ERROR")
            console.log(error)
    })
}

function googleQueryWrapper(player){
	for(i in player){
		setTimeout(function() { googleQuery(player[i]) }, 1000); //slow down the requests so google doesnt block
	}
}
function googleQuery(playerName){
	google.resultsPerPage = 10
	var nextCounter = 0

	google(playerName + 'draft scouting report', function (err, next, links){
  if (err) console.error(err)

  for (var i = 0; i < links.length; ++i) {
    console.log(links[i].title) // link.href is an alias for link.link
    console.log(links[i].description + "\n")
    article = links[i].title + " " + links[i].description;
    var result = sentiment(article);
    //console.log(result.score)
    playerSentiment[playerName].push(sentiment(article))

  }

  if (nextCounter < 4) {
    nextCounter += 1
    if (next) next()
  }
})

}
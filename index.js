// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 3000;

var request = require('request');
var cheerio = require('cheerio');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
main();

function main(){
	webScrapePlayers();
}







function webScrapePlayers(){
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
			    console.log($(this).text().split("   ")[2]);
			});
		}
    })
}
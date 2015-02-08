$(document).ready(function() {
    $("#userRosterShowBtn").click(function(){
      var userId = $("#userRoserUserId").val();
      getUserRosterAndUpdateUi(userId);
    });
});

function getUserRosterAndUpdateUi(userId) {

              $.ajax({
                url: "data/user/roster/" + userId,
              })
              .done(function( jsonString ) {
                
                // Debug print
                // console.log(jsonString);

                // Parse the string into a json object
                var json = JSON.parse(jsonString);
                for (var i = 0; i < json.length; i++) {
                    
                    // Debug print to web console
                    // console.log(json[i].position + " " + json[i].playername);

                    // Used index of because the json is returned as " QB" (extra leading space for some reason)
                    if(json[i].position.indexOf("QB") >= 0) {
                      $("#rosterQB").text(json[i].playername);
                      goDoStuff(json[i].playername.trim(),"#rosterQBChart");


                    } else if(json[i].position.indexOf("RB") >= 0) {
                      $("#rosterRB").text(json[i].playername,"#rosterRBChart");
                      goDoStuff(json[i].playername.trim(),"#rosterRBChart");
                      
                    }  
                    else if(json[i].position.indexOf("WR") >= 0){
                      $("#rosterWR").text(json[i].playername,"rosterWRChart");
                      goDoStuff(json[i].playername.trim(),"#rosterWRChart");
                    }
                }

              });
            };

function goDoStuff(playername, chartspace) {

  var margin = {top: 5, right: 5, bottom: 40, left: 28},
                  width = 250 - margin.left - margin.right,
                  height = 150 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%m/%d/%y").parse;

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.close); });

  $(chartspace).html("");

  var svg = d3.select(chartspace).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // var data = [{"date" : "1-Dec-12", "close" : 200} , {"date" : "2-Aug-12", "close" : 401},{"date" : "3-May-12", "close" : 601} , {"date" : "31-Jan-12", "close" : 700}];

  d3.json("data/player/points/" + playername, function(error, data) {

    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.close = +d.close;
    });

  data.sort(function(a,b) { return a.date - b.date } );


    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.close; })]);

    svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .selectAll("text")
        .attr("y",0)
        .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Fantasy Points");
  });

}

/*
function goDoThings(leagueID){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "%");

  var svg = d3.select("leagueChart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv("data.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });

  });

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }
}*/
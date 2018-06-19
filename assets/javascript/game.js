
$(document).ready(function() {
    var rndNo = 0, wins = 0, losses = 0, loNo = 0, hiNo = 0, sum = 0;
    var crystal = [];
    // var changed = false;

    // Crystal constructor
    function Crystal(pos, name, points) {
        this.pos = pos;
        this.name = name;
        this.points = points;
    }        
    // Load array of crystal objects
    function createCrystals() {
        // crystal = [];
        crystal.push(new Crystal(0,"diamond",genNumber(1,12)));
        crystal.push(new Crystal(1,"ruby",genNumber(1,12)));
        crystal.push(new Crystal(2,"emerald",genNumber(1,12)));
        crystal.push(new Crystal(3,"topaz",genNumber(1,12)));
    }

    // Gems constructor
    // function Gems(pos, name, points) {
    //     this.pos = pos;
    //     this.name = name;
    //     this.points = points;
    // }        
    // // Load array of crystal objects
    // function createCrystals() {
    //     // crystal = [];
    //     crystal.push(new Gems(0,"diamond",genNumber(1,12)));
    //     crystal.push(new Gems(1,"ruby",genNumber(1,12)));
    //     crystal.push(new Gems(2,"emerald",genNumber(1,12)));
    //     crystal.push(new Gems(3,"topaz",genNumber(1,12)));
    // }

    function resetCrystalPoints() {
        for (var i = 0; i < 4; i++) {
            crystal[i].points = 0;          
            // console.log("Resetting to 0: " + crystal[i].points);
            crystal[i].points = genNumber(1,12);
            // console.log("Re-genned points: " + genNumber(1,12));
        }
    }

    function genNumber(loNo,hiNo) {
        rndNo = Math.floor(Math.random() * (hiNo - loNo) + loNo + 1);
        return rndNo;
    }
    
    function makePointsUnique() {
        var changed = false;
        console.clear
        //check to see if points for each crystal are unique in the series
        if (crystal[1].points == crystal[0].points || crystal[1].points == crystal[2].points || crystal[1].points == crystal[3].points) {
            crystal[1].points = genNumber(1,12);
            changed = true;
            if (changed == true) {
                changed == false;
                makePointsUnique();
            }
        }
        if (crystal[2].points == crystal[0].points || crystal[2].points == crystal[1].points || crystal[2].points == crystal[3].points) {
            crystal[2].points = genNumber(1,12);
            changed = true;
            if (changed == true) {
                changed == false;
                makePointsUnique();
            }
        }
        if (crystal[3].points == crystal[0].points || crystal[3].points == crystal[1].points || crystal[3].points == crystal[2].points) {
            crystal[3].points = genNumber(1,12);
            changed = true;
            if (changed == true) {
                changed == false;
                makePointsUnique();
            }
        }   
        // console.log values when no dups found
        if (changed !== true) {
            for (var i = 0; i < 4; i++) {
                console.log(crystal[i].pos + " " + crystal[i].name + " " + crystal[i].points);
            }
        }
    }

    function tallyUp(sum) {
        if (sum !== $("#match-me").text() && sum < $("#match-me").text()) {
            console.log("sum = " + sum + ": continue play.");
        }
        else if (sum == $("#match-me").text()) {
            console.log("You have won!");
            wins += 1;
            $("#wins").text("Wins: " + wins);
            $("#losses").text("Losses: " + losses);
            console.log("Starting new game.");
            startGame();
        }
        else if (sum > $("#match-me").text()) {
            console.log("You have lost!");
            $("#wins").text("wins: " + wins);
            losses += 1;
            $("#losses").text("Losses: " + losses);
            console.log("Starting new game.");
            startGame();
        }
        // else {
        //     console.log("Sum = " + sum);
        //     console.log("Continue play!");  
        //     /* BUG!! tallyUp seems to fire once per keystroke on 1st call to 
        //        startGame, twice on the 2d call, three-times on 3d, etc. 
        //        That is, the new value assigned to the crystals is correct but 
        //        that value is multiplied in tallyUp by the number of times startGame has been
        //        called. WHY???? I could build a test to trap and repair this behavior
        //        but it SHOULD NOT BE HAPPENING IN THE FIRST PLACE!!!!
        //     */   
        // }
        
    }

    // function to initialize tally at start of new game
    function resetTally() {
        $("#wins").text("Wins: 0");
        $("#losses").text("Losses: 0");
    }

    // This is how game flows
    function startGame() {
        sum = 0;
        $("#score").text(0);

        // Load number to be matched
        rndNo = genNumber(19,120);
        $("#match-me").text(rndNo);

        // Reset points associated with each crystal object
        resetCrystalPoints();

        

        // Ensure that no crystal's points are same as those of any other crystal
        makePointsUnique();
        
        
        // Let's play ....
        $("#diamond").on("click", function() {
            sum += crystal[0].points;
            $("#score").text(sum);
            tallyUp(sum);
        });

        $("#ruby").on("click", function() {
            sum += crystal[1].points;
            $("#score").text(sum);
            tallyUp(sum);
        });

        $("#emerald").on("click", function() {
            sum += crystal[2].points;
            $("#score").text(sum);
            tallyUp(sum);
        });

        $("#topaz").on("click", function() {
            sum += crystal[3].points;
            $("#score").text(sum);
            tallyUp(sum);
        });
    }
    
    // ***** GAME STARTS HERE! *****
    resetTally();
    createCrystals();
    startGame();
});
/* Magic Mirror
 * Module: MMM-EOL
 *
 * By Mykle1
 *
 */
Module.register("MMM-EOL", {

    // Module config defaults.           // Make all changes in your config.js file
    defaults: {
        lifeForm: "",                    // See Life Form list below
		dLength: 400,                    // Length of descriptive text
        useHeader: true,                 // false if you don't want a header      
        header: "",                      // Change in config file. useHeader must be true
        maxWidth: "300px",
        animationSpeed: 2000,            // fade speed
        initialLoadDelay: 3250,
        retryDelay: 2500,
        rotateInterval: 5 * 60 * 1000,   // 5 minutes
        updateInterval: 60 * 60 * 1000,  // 

        lifeFormArray: {
            "Tigers": "328674",
            "Hummingbirds": "8021",
            "Lions": "328672",
            "Jaguar": "328606",
            "Leopard": "328673",
            "Cheetah": "328680",
            "Fox": "19076",
            "Deaths-head Moth": "50688",
            "Great White Shark": "213726",
            "Seals": "7666",
            "Mosquitos": "473",
            "Venus Flytrap": "71355",
            "Cardinals": "19590",
            "Humpback Whale": "328575",
            "Praying Mantis": "487055",
            "Dragonfly": "42274802",
            "Tarantulas": "170",
            "Bats": "7631",
            "Bears": "7631",
            "Cicadas": "2645413",
            "Striped Bass": "211032",
            "Alligators": "796029",
            "Crocodiles": "1739",
            "Snakes": "2815988",
            "Cats": "7674",
            "Birds": "695",
            "Eagles": "8016",
            "Bald Eagle": "1049121",
            "Cactus": "4228",
            "Anemones and Corals": "1746",
            "Crabs, Lobsters, and Shrimps": "1183",
            "Sequoia": "42665",
            "Sea Horse": "218966",
	    "Hominidae": "1653",
	    "Primates": "1645",
            "Otters": "328044",
        }
    },


    getStyles: function() {
        return ["MMM-EOL.css"];
    },


    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        //  Set locale.
        this.url = "http://eol.org/api/pages/1.0.json?batch=false&id=" + this.config.lifeFormArray[this.config.lifeForm] + "&images_per_page=75&subjects=all&details=true&references=false&taxonomy=false&vetted=1&language=en";
        this.EOL = [];
        this.activeItem = 0;
        this.rotateInterval = null;
        this.scheduleUpdate();

    },

    getDom: function() {

        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

        if (!this.loaded) {
            wrapper.innerHTML = "Life as we know it . . .";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }


			//	Rotating my data
			var EOL = this.EOL;
			var EOLKeys = Object.keys(this.EOL);
        if (EOLKeys.length > 0) {
            if (this.activeItem >= EOLKeys.length) {
                this.activeItem = 0;
            }
            var EOL = this.EOL[EOLKeys[this.activeItem]];

        //	console.log(EOL); // for checking

            var top = document.createElement("div");
            top.classList.add("list-row");

            
            // scientificName
            var scientificName = document.createElement("div");
            scientificName.classList.add("small", "bright", "scientificName");
            //	console.log(EOL);
            scientificName.innerHTML = this.SCI;
            wrapper.appendChild(scientificName);
            

            // title
            var title = document.createElement("div");
            title.classList.add("xsmall", "bright", "title");
           if (EOL.title == undefined || EOL.title == "") {
                title.innerHTML = "Life is beautiful!";
                wrapper.appendChild(title);
            } else
                title.innerHTML = this.sTrim(EOL.title, 40, ' ', ' ...');
				wrapper.appendChild(title);


            // picture
            var img = document.createElement("img");
            img.classList.add("photo");
        if (EOL.eolMediaURL == "404 Not Found" || EOL.eolMediaURL == undefined || EOL.eolMediaURL == "") {
                img.src = "modules/MMM-EOL/images/darwin.jpg";
                wrapper.appendChild(img);
            } else
                img.src = EOL.eolMediaURL;
				wrapper.appendChild(img);
				
        }	// End of rotation

		
			// description NOT IN ROTATION
			var description = document.createElement("div");
			description.classList.add("xsmall", "bright", "description");
			description.innerHTML = this.sTrim(this.DES, this.config.dLength, ' ', ' ...');
			wrapper.appendChild(description);

        return wrapper;
    },
	
	
/////  Add this function to the modules you want to control with voice //////

    notificationReceived: function(notification, payload) {
        if (notification === 'HIDE_DARWIN') {
            this.hide(1000);
        //    this.updateDom(300);
        }  else if (notification === 'SHOW_DARWIN') {
            this.show(1000);
        //   this.updateDom(300);
        }
            
    },


    processEOL: function(data) {
        this.today = data.Today;
        this.SCI = data.scientificName;
        this.EOL = data.dataObjects;
        this.DES = data.dataObjects[0].description;
        this.loaded = true;
    },

    sTrim: function(str, length, delim, appendix) {
        if (str.length <= length) return str;
        var trimmedStr = str.substr(0, length + delim.length);
        var lastDelimIndex = trimmedStr.lastIndexOf(delim);
        if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);
        if (trimmedStr) trimmedStr += appendix;
        return trimmedStr;
    },

    scheduleCarousel: function() {
        console.log("Carousel of EOL fucktion!");
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getEOL();
        }, this.config.updateInterval);
        this.getEOL(this.config.initialLoadDelay);
    },

    getEOL: function() {
        this.sendSocketNotification('GET_EOL', this.url);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "EOL_RESULT") {
            this.processEOL(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});

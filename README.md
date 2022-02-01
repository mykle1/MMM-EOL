## MMM-EOL

## The Encyclopedia of Life

## Here's what you get

* First, you are greeted by Charles Darwin on the cover of the encyclopedia.

* Then, a rotation of images and information about the life form you choose.

* Virtually every form of life on Earth to choose from. (Plants, Fish, Mammals, Reptiles, Birds etc..)

* I will add life forms as requested. There's just too many to include all of them.

* "Cats" will include ALL cats, or you can choose a specific species. (Lions, Tigers, etc..)

* You determine how much or how little information is displayed in config file. (dLength: option)

* Config option to scroll text to conserve Mirror Real estate

## Examples

![](images/darwin.jpg)

![](images/2.JPG) ![](images/3.JPG) ![](images/4.JPG) 

## Installation

* `git clone https://github.com/mykle1/MMM-EOL` into the `~/MagicMirror/modules` directory.

* No API key needed. No dependencies. No kidding!

* Annotated .css file included for sizing and coloring.

## Config.js entry and options

    {
        module: 'MMM-EOL',                  // Best in left, right or center regions
        position: 'top_left',
        config: {
           lifeForm: "Seals",                // See Life Form list below. Only the name of the lifeForm.
	   scrollDes: "yes",                // yes = scroll description, no = static description
           dLength: 400,                    // Amount of descriptive text. Higher for more, lower for less
           useHeader: false,                // false if you don't want a header      
           header: "",                      // Change in config file. useHeader must be true
           maxWidth: "300px",
           animationSpeed: 0,               // no fade (increase for transition)
           rotateInterval: 1 * 60 * 1000,   // 1 minute
        }
    },

## Life form list
* If you want something included I will add it ASAP. Just let me know.

## Only add the name to the config entry.
```
"Tigers": "328674",
"Hummingbirds": "8021",
"Lions": "328672"
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
"Bears": "7664",
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
```
* This is just a small sample of the data available

## Remember, I'll add anything you wish to the module
	
## That's right, SpaceCowboysDude rescued me again on this one

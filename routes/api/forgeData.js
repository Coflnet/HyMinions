exports.sourceBazaar = 1;
exports.sourceAuction = 2;
exports.sourceWarning = 3;
exports.sourceOthers = 4;

exports.auctionTax = 1;
exports.auctionTaxThreshold = 1000000;

exports.hotmXpList = [0,3000,12000,37000,97000,197000,347000];
                //lvl 1 2    3 ...

exports.gemstoneCollectionName = "GEMSTONE_COLLECTION";
//SAMPLE
// { //3
//     name : "name surrounded by double quotes",
//     npcPrice: find it if you can, if not put 0 here,
//     source: write this.sourceBazaar if from bazaar, else do not add the source,
//     materials: [
//         {
//             options: [ //for bazaar, probably may have more than one option
//                 "Enchanted Block of Coal",
//                 "Enchanted Coal",
//                 "Coal",
//             ],
//             quantity: [
//                 2,
//                 320,
//                 51200,
//             ],
//             source: [ //denote they are from bazaar
//                 this.sourceBazaar,
//                 this.sourceBazaar,
//                 this.sourceBazaar,
//             ],
//         },{
//         options: [ //for auction, probably only have one option, enclose that option with [] (let it be a list with 1 element)
//             "Golden Plate",
//         ],
//         quantity: [
//             1,
//         ],
//         //no need add source here
// },
//     ],
//     duration : 10,
//     hotmRequirement: 2, //hotm level
//     gemstoneRequirement: 9 //remove this line of no need
//collectionsRequirement: [{
    // name: "Gemstone",
    // tier: 10,
    // rawCollectionId: "GEMSTONE_COLLECTION",
// }],
// },

exports.forges = [{"name":"Amber Material","npcPrice":0,"materials":[{"options":["Fine Amber Gemstone"],"quantity":[12],"source":[1]},{"options":["Golden Plate"],"quantity":[1]}],"duration":7,"hotmRequirement":6},{"name":"Amber-polished Drill Engine","npcPrice":0,"materials":[{"options":["Flawless Amber Gemstone"],"quantity":[1],"source":[1]},{"options":["Robotron Reflector"],"quantity":[50]},{"options":["Ruby-polished Drill Engine"],"quantity":[1]},{"options":["Sapphire-polished Drill Engine"],"quantity":[1]}],"duration":50,"hotmRequirement":7},{"name":"Ammonite","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Coins"],"quantity":[300000],"codedPrices":[1],"source":[4]},{"options":["Helix"],"quantity":[1]}],"duration":288,"hotmRequirement":3},{"name":"Beacon II","npcPrice":0,"materials":[{"options":["Beacon I"],"quantity":[1]},{"options":["Refined Mithril"],"quantity":[5],"source":[1]}],"duration":20,"hotmRequirement":2},{"name":"Beacon III","npcPrice":0,"materials":[{"options":["Beacon II"],"quantity":[1]},{"options":["Refined Mithril"],"quantity":[10],"source":[1]}],"duration":30,"hotmRequirement":3},{"name":"Beacon IV","npcPrice":0,"materials":[{"options":["Beacon III"],"quantity":[1]},{"options":["Plasma"],"quantity":[1]},{"options":["Refined Mithril"],"quantity":[99],"source":[1]}],"duration":40,"hotmRequirement":4},{"name":"Beacon V","npcPrice":0,"materials":[{"options":["Beacon IV"],"quantity":[1]},{"options":["Plasma"],"quantity":[5]},{"options":["Refined Mithril"],"quantity":[40],"source":[1]}],"duration":50,"hotmRequirement":5},{"name":"Bejeweled Handle","npcPrice":100,"materials":[{"options":["Glacite Jewel"],"quantity":[3]}],"duration":0.5,"hotmRequirement":2},{"name":"Blue Cheese Goblin Omelette","npcPrice":0,"materials":[{"options":["Blue Goblin Egg"],"quantity":[99],"source":[1]},{"options":["Perfect Sapphire Gemstone"],"quantity":[1],"source":[1]}],"duration":20,"hotmRequirement":6},{"name":"Boots Of Divan","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Divan Fragment"],"quantity":[4]},{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Mixture"],"quantity":[10]}],"duration":23,"hotmRequirement":6},{"name":"Chestplate Of Divan","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Divan Fragment"],"quantity":[8]},{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Mixture"],"quantity":[10]}],"duration":23,"hotmRequirement":6},{"name":"Diamonite","npcPrice":0,"materials":[{"options":["Refined Diamond"],"quantity":[3],"source":[1]}],"duration":6,"hotmRequirement":2},{"name":"Divan's Drill","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Coins"],"quantity":[50000000],"codedPrices":[1],"source":[4]},{"options":["Divan's Alloy"],"quantity":[1]},{"options":["Titanium Drill DR-X655"],"quantity":[1],"approximateMatch":[true]}],"duration":60,"hotmRequirement":7},{"name":"Drill Engine","npcPrice":0,"materials":[{"options":["Enchanted Iron Block","Enchanted Iron","Iron Ingot"],"quantity":[1,160,25600],"source":[1,1,1]},{"options":["Enchanted Redstone Block","Enchanted Redstone","Redstone"],"quantity":[3,480,76800],"source":[1,1,1]},{"options":["Golden Plate"],"quantity":[1]},{"options":["Refined Diamond"],"quantity":[1],"source":[1]},{"options":["Treasurite"],"quantity":[10],"source":[1]}],"duration":30,"hotmRequirement":3},{"name":"Fine Amber Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Amber Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Amethyst Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Amethyst Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Jade Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Jade Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Jasper Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Jasper Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Ruby Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Ruby Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Sapphire Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Sapphire Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Fine Topaz Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawed Topaz Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":5},{"name":"Flawless Amber Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Amber Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Amethyst Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Amethyst Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Jade Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Jade Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Jasper Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Jasper Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Ruby Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Ruby Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Sapphire Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Sapphire Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Flawless Topaz Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Fine Topaz Gemstone"],"quantity":[80],"source":[1]}],"durationText":"Crafting","hotmRequirement":0,"gemstoneRequirement":9},{"name":"Fuel Tank","npcPrice":51000,"materials":[{"options":["Enchanted Block of Coal","Enchanted Coal","Coal"],"quantity":[2,320,51200],"source":[1,1,1]}],"duration":10,"hotmRequirement":2},{"name":"Gemstone Chamber","npcPrice":0,"materials":[{"options":["Coins"],"quantity":[25000],"codedPrices":[1],"source":[4]},{"options":["Gemstone Mixture"],"quantity":[1]},{"options":["Worm Membrane"],"quantity":[100],"source":[1]}],"duration":4,"hotmRequirement":5},{"name":"Gemstone Drill LT-522","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Gemstone Mixture"],"quantity":[3]},{"options":["Ruby Drill TX-15"],"quantity":[1],"approximateMatch":[true]}],"durationText":"30 secs","hotmRequirement":4},{"name":"Gemstone Fuel Tank","npcPrice":0,"materials":[{"options":["Control Switch"],"quantity":[30]},{"options":["Gemstone Mixture"],"quantity":[10]},{"options":["Titanium-Infused Fuel Tank"],"quantity":[1]}],"duration":30,"hotmRequirement":5},{"name":"Gemstone Mixture","npcPrice":0,"materials":[{"options":["Fine Amber Gemstone"],"quantity":[4],"source":[1]},{"options":["Fine Amethyst Gemstone"],"quantity":[4],"source":[1]},{"options":["Fine Jade Gemstone"],"quantity":[4],"source":[1]},{"options":["Fine Sapphire Gemstone"],"quantity":[4],"source":[1]},{"options":["Sludge Juice"],"quantity":[320],"source":[1]}],"duration":4,"hotmRequirement":4},{"name":"Goblin Omelette","npcPrice":0,"materials":[{"options":["Goblin Egg"],"quantity":[99],"source":[1]}],"duration":18,"hotmRequirement":4},{"name":"Golden Plate","npcPrice":0,"materials":[{"options":["Enchanted Gold Block","Enchanted Gold","Gold Ingot"],"quantity":[2,320,51200],"source":[1,1,1]},{"options":["Glacite Jewel"],"quantity":[5]},{"options":["Refined Diamond"],"quantity":[1],"source":[1]}],"duration":6,"hotmRequirement":3},{"name":"Helmet Of Divan","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Divan Fragment"],"quantity":[5]},{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Mixture"],"quantity":[10]}],"duration":23,"hotmRequirement":6},{"name":"Hot Stuff","npcPrice":0,"materials":[{"options":["Hard Stone"],"quantity":[128],"source":[1]},{"options":["Rough Amber Gemstone"],"quantity":[64],"source":[1]}],"duration":24,"hotmRequirement":4,"collectionsRequirement":[{"name":"Hard Stone","tier":4,"rawCollectionId":"HARD_STONE"}]},{"name":"Jasper Drill X","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Flawless Jasper Gemstone"],"quantity":[1],"source":[1]},{"options":["Topaz Drill KGR-12"],"quantity":[1],"approximateMatch":[true]},{"options":["Treasurite"],"quantity":[1000],"source":[1]}],"durationText":"30 secs","hotmRequirement":6},{"name":"Leggings Of Divan","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Divan Fragment"],"quantity":[7]},{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Mixture"],"quantity":[10]}],"duration":23,"hotmRequirement":6},{"name":"Mithril Drill SX-R226","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Drill Engine"],"quantity":[1]},{"options":["Fuel Tank"],"quantity":[1]},{"options":["Refined Mithril"],"quantity":[3],"source":[1]}],"duration":4,"hotmRequirement":3},{"name":"Mithril Drill SX-R326","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Golden Plate"],"quantity":[10]},{"options":["Mithril Drill SX-R226"],"quantity":[1],"approximateMatch":[true]},{"options":["Mithril Plate"],"quantity":[2]}],"durationText":"30 secs","hotmRequirement":4},{"name":"Mithril Pickaxe","npcPrice":0,"materials":[{"options":["Bejeweled Handle"],"quantity":[1]},{"options":["Enchanted Gold","Gold Ingot"],"quantity":[10,1600],"source":[1,1]},{"options":["Enchanted Mithril","Mithril"],"quantity":[30,4800],"source":[1,1]}],"duration":0.75,"hotmRequirement":2},{"name":"Mithril Plate","npcPrice":0,"materials":[{"options":["Enchanted Iron Block","Enchanted Iron","Iron Ingot"],"quantity":[1,160,25600],"source":[1,1,1]},{"options":["Golden Plate"],"quantity":[1]},{"options":["Refined Mithril"],"quantity":[5],"source":[1]},{"options":["Refined Titanium"],"quantity":[1],"source":[1]}],"duration":18,"hotmRequirement":3},{"name":"Mithril-Infused Fuel Tank","npcPrice":0,"materials":[{"options":["Fuel Tank"],"quantity":[5]},{"options":["Mithril Plate"],"quantity":[3]}],"duration":10,"hotmRequirement":3},{"name":"Mithril-Plated Drill Engine","npcPrice":0,"materials":[{"options":["Drill Engine"],"quantity":[2]},{"options":["Mithril Plate"],"quantity":[3]}],"duration":15,"hotmRequirement":3},{"name":"Perfect Amber Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Amber Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]},{"options":["Flawless Amber Gemstone"],"quantity":[5],"source":[1]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Amethyst Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Amethyst Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]},{"options":["Flawless Amethyst Gemstone"],"quantity":[5],"source":[1]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Jade Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawless Jade Gemstone"],"quantity":[5],"source":[1]},{"options":["Jade Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Jasper Gemstone","source":1,"npcPrice":0,"materials":[{"options":["Flawless Jasper Gemstone"],"quantity":[5],"source":[1]},{"options":["Jasper Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Ruby Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawless Ruby Gemstone"],"quantity":[5],"source":[1]},{"options":["Ruby Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Sapphire Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawless Sapphire Gemstone"],"quantity":[5],"source":[1]},{"options":["Sapphire Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfect Topaz Gemstone","npcPrice":0,"source":1,"materials":[{"options":["Flawless Topaz Gemstone"],"quantity":[5],"source":[1]},{"options":["Topaz Crystal"],"quantity":[1],"source":[3],"codedPrices":[0]}],"duration":20,"hotmRequirement":5,"gemstoneRequirement":10},{"name":"Perfectly-Cut Fuel Tank","npcPrice":0,"materials":[{"options":["Gemstone Fuel Tank"],"quantity":[1]},{"options":["Gemstone Mixture"],"quantity":[25]},{"options":["Synthetic Heart"],"quantity":[70]}],"duration":50,"hotmRequirement":7},{"name":"Pesto Goblin Omelette","npcPrice":0,"materials":[{"options":["Fine Jade Gemstone"],"quantity":[1],"source":[1]},{"options":["Green Goblin Egg"],"quantity":[99],"source":[1]}],"duration":20,"hotmRequirement":4},{"name":"Petrified Starfall","npcPrice":0,"materials":[{"options":["Starfall"],"quantity":[512],"source":[1]}],"duration":14,"hotmRequirement":3},{"name":"Power Crystal","npcPrice":0,"source":1,"materials":[{"options":["Starfall"],"quantity":[256],"source":[1]}],"duration":2,"hotmRequirement":2},{"name":"Pure Mithril","npcPrice":0,"materials":[{"options":["Refined Mithril"],"quantity":[2],"source":[1]}],"duration":12,"hotmRequirement":3},{"name":"Refined Diamond","npcPrice":4096,"source":1,"materials":[{"options":["Enchanted Diamond Block","Enchanted Diamond","Diamond"],"quantity":[2,320,51200],"source":[1,1,1]}],"duration":8,"hotmRequirement":2},{"name":"Refined Mithril","npcPrice":256000,"source":1,"materials":[{"options":["Enchanted Mithril","Mithril"],"quantity":[160,25600],"source":[1,1]}],"duration":6,"hotmRequirement":2},{"name":"Refined Mithril Pickaxe","npcPrice":0,"materials":[{"options":["Bejeweled Handle"],"quantity":[2]},{"options":["Enchanted Gold","Gold Ingot"],"quantity":[30,4800],"source":[1,1]},{"options":["Refined Diamond"],"quantity":[1],"source":[1]},{"options":["Refined Mithril"],"quantity":[3],"source":[1]}],"duration":22,"hotmRequirement":3},{"name":"Refined Titanium","npcPrice":51200,"source":1,"materials":[{"options":["Enchanted Titanium","Titanium"],"quantity":[16,2560],"source":[1,1]}],"duration":12,"hotmRequirement":2},{"name":"Rock Gemstone","npcPrice":0,"materials":[{"options":["Enchanted Cobblestone","Cobblestone"],"quantity":[128,20480],"source":[1,1]},{"options":["Treasurite"],"quantity":[64],"source":[1]}],"duration":22,"hotmRequirement":3},{"name":"Ruby Drill TX-15","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Drill Engine"],"quantity":[1]},{"options":["Fine Ruby Gemstone"],"quantity":[6],"source":[1]},{"options":["Fuel Tank"],"quantity":[1]}],"duration":1,"hotmRequirement":3},{"name":"Ruby-polished Drill Engine","npcPrice":0,"materials":[{"options":["Fine Ruby Gemstone"],"quantity":[10],"source":[1]},{"options":["Mithril-Plated Drill Engine"],"quantity":[1]},{"options":["Superlite Motor"],"quantity":[10]}],"duration":20,"hotmRequirement":5},{"name":"Sapphire-polished Drill Engine","npcPrice":0,"materials":[{"options":["Electron Transmitter"],"quantity":[25]},{"options":["FTX 3070"],"quantity":[25]},{"options":["Fine Sapphire Gemstone"],"quantity":[20],"source":[1]},{"options":["Titanium-Plated Drill Engine"],"quantity":[1]}],"duration":20,"hotmRequirement":6},{"name":"Spicy Goblin Omelette","npcPrice":0,"materials":[{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Red Goblin Egg"],"quantity":[99],"source":[1]}],"duration":20,"hotmRequirement":5},{"name":"Sunny Side Goblin Omelette","npcPrice":0,"materials":[{"options":["Fine Topaz Gemstone"],"quantity":[1],"source":[1]},{"options":["Yellow Goblin Egg"],"quantity":[99],"source":[1]}],"duration":20,"hotmRequirement":6},{"name":"Titanium Artifact","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Refined Titanium"],"quantity":[12],"source":[1]},{"options":["Titanium Ring"],"quantity":[1],"approximateMatch":[true]}],"duration":36,"hotmRequirement":4},{"name":"Titanium Drill DR-X355","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Drill Engine"],"quantity":[1]},{"options":["Fuel Tank"],"quantity":[1]},{"options":["Golden Plate"],"quantity":[6]},{"options":["Refined Mithril"],"quantity":[10],"source":[1]},{"options":["Refined Titanium"],"quantity":[10],"source":[1]}],"duration":64,"hotmRequirement":5},{"name":"Titanium Drill DR-X455","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Mithril Plate"],"quantity":[6]},{"options":["Refined Diamond"],"quantity":[10],"source":[1]},{"options":["Refined Titanium"],"quantity":[16],"source":[1]},{"options":["Titanium Drill DR-X355"],"quantity":[1],"approximateMatch":[true]}],"durationText":"30 secs","hotmRequirement":5},{"name":"Titanium Drill DR-X555","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Enchanted Iron Block","Enchanted Iron","Iron Ingot"],"quantity":[2,320,51200],"source":[1,1,1]},{"options":["Mithril Plate"],"quantity":[15]},{"options":["Plasma"],"quantity":[20]},{"options":["Refined Diamond"],"quantity":[20],"source":[1]},{"options":["Refined Titanium"],"quantity":[32],"source":[1]},{"options":["Titanium Drill DR-X455"],"quantity":[1],"approximateMatch":[true]}],"durationText":"30 secs","hotmRequirement":5},{"name":"Titanium Drill DR-X655","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Corleonite"],"quantity":[30]},{"options":["Flawless Ruby Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Mixture"],"quantity":[16]},{"options":["Mithril Plate"],"quantity":[5]},{"options":["Refined Diamond"],"quantity":[5],"source":[1]},{"options":["Refined Titanium"],"quantity":[12],"source":[1]},{"options":["Titanium Drill DR-X555"],"quantity":[1],"approximateMatch":[true]}],"durationText":"30 secs","hotmRequirement":6},{"name":"Titanium Relic","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Refined Titanium"],"quantity":[20],"source":[1]},{"options":["Titanium Artifact"],"quantity":[1],"approximateMatch":[true]}],"duration":72,"hotmRequirement":5},{"name":"Titanium Ring","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Refined Titanium"],"quantity":[6],"source":[1]},{"options":["Titanium Talisman"],"quantity":[1],"approximateMatch":[true]}],"duration":20,"hotmRequirement":3},{"name":"Titanium Talisman","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Refined Titanium"],"quantity":[2],"source":[1]}],"duration":14,"hotmRequirement":2},{"name":"Titanium-Infused Fuel Tank","npcPrice":0,"materials":[{"options":["Fuel Tank"],"quantity":[10]},{"options":["Refined Diamond"],"quantity":[10],"source":[1]},{"options":["Refined Mithril"],"quantity":[10],"source":[1]},{"options":["Refined Titanium"],"quantity":[10],"source":[1]}],"duration":25,"hotmRequirement":5},{"name":"Titanium-Plated Drill Engine","npcPrice":0,"materials":[{"options":["Drill Engine"],"quantity":[10]},{"options":["Mithril Plate"],"quantity":[4]},{"options":["Plasma"],"quantity":[5]},{"options":["Refined Titanium"],"quantity":[5],"source":[1]}],"duration":30,"hotmRequirement":4},{"name":"Topaz Drill KGR-12","approximateMatch":true,"npcPrice":0,"materials":[{"options":["Flawless Topaz Gemstone"],"quantity":[1],"source":[1]},{"options":["Gemstone Drill LT-522"],"quantity":[1],"approximateMatch":[true]},{"options":["Gemstone Mixture"],"quantity":[3]},{"options":["Magma Core"],"quantity":[5]}],"durationText":"30 secs","hotmRequirement":5},{"name":"Travel Scroll to the Crystal Hollows","npcPrice":0,"materials":[{"options":["Coins"],"quantity":[50000],"codedPrices":[1],"source":[4]},{"options":["Enchanted Ender Pearl","Ender Pearl"],"quantity":[16,320],"source":[1,1]},{"options":["Fine Ruby Gemstone"],"quantity":[80],"source":[1]},{"options":["Flawed Ruby Gemstone"],"quantity":[48],"source":[1]}],"duration":10,"hotmRequirement":3},{"name":"Travel Scroll to the Dwarven Forge","npcPrice":0,"materials":[{"options":["Coins"],"quantity":[25000],"codedPrices":[1],"source":[4]},{"options":["Enchanted Ender Pearl","Ender Pearl"],"quantity":[80,1600],"source":[1,1]},{"options":["Mithril"],"quantity":[48],"source":[1]},{"options":["Titanium"],"quantity":[80],"source":[1]}],"duration":5,"hotmRequirement":2}]
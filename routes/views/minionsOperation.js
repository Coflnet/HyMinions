var minionsData = require("./minionsData.js");
var fetch = require('cross-fetch');
var itemNames = require("./itemNames.json");
let currentTime = new Date();
let minecraftName, lastUpdatedProfile,lastUpdatedBazaar, profileNames, hadError=false;
    
exports.calculateMinionsProfit = async function(minions, settings){
    diamondSpreadingItem = minionsData.diamondSpreadingItem;
    console.log(settings.name,minecraftName);
    console.log(Date.now()-lastUpdatedBazaar);
    if((settings.useProfile)&&(settings.name!=minecraftName||hadError||Date.now()-lastUpdatedProfile>5*60*1000)){ //don't call api again if identical name, but call again if prev result has error, 5 min timeout
        await findProfile(settings.name);
        //await Promise.all([findBazaar(), findProfile(settings.name)]);
        minecraftName = settings.name;
        lastUpdatedProfile = Date.now();
    }
    if(lastUpdatedBazaar==null||Date.now()-lastUpdatedBazaar>60*1000){ //1 min time out
        await findBazaar();
        lastUpdatedBazaar = Date.now();
    }
    settings.lastUpdatedProfile = lastUpdatedProfile ? dateTimeToString(lastUpdatedProfile): null;
    settings.lastUpdatedBazaar = lastUpdatedBazaar ? dateTimeToString(lastUpdatedBazaar) : null;

    if(settings.hasError){
        hadError = true;
        return;
    }

    if(settings.useProfile){
        settings.profileNames=profileNames;
        settings.profile=Math.min(settings.profile,settings.profileNames.length-1);

    }

    console.log("finished findBazaar");

    minions.forEach((minion)=>{
        calculateMinionProfit(settings,minion);
    });
    minions.sort((a,b) =>{
        return b.totalProfit-a.totalProfit;
    });
    // minions.forEach((minion)=>{
    //     console.log(minion.totalProfit);
    // })

    function calculateMinionProfit(settings,minion){
        if(settings.useProfile){
            minion.tier=minion.profilesTier[settings.profile];
        }else{
            minion.tier = Math.min(settings.tier,minion.tierDelay.length);//some has tier 12 some don't
        }
        
        if(!minion.diamondSpreadingCriteria){
            //if diamond spreading criteria does not exist
            minion.hasDiamondSpreading = 1;
        }else if(minion.canCompactor==false&&settings.calculationType==1&&settings.superCompactor==1&&settings.diamondSpreading>=1){
            //if compactors are selected but the minion does not have compactor, can use diamond spreading
            minion.hasDiamondSpreading = 1;
        }else if(minion.diamondSpreadingCriteria<=settings.diamondSpreading){
            minion.hasDiamondSpreading = 1;
        }else{
            minion.hasDiamondSpreading = 0;
        };
        minion.outputProducts = new Array();
        minion.itemsHarvested = 0;

        if(minion.tier==0){
            minion.totalProfit = 0;
            minion.totalProfitText = 0;
            minion.profitPerHour = 0;
            return;
        }

        if(settings.calculationType==0){
            //old calculation type
            if(settings.productForm==-2){ //max profit(enchnanted forms)
                minion.products.forEach((product)=>{
                    let maxVariantIndex = 1, variantIndex = 1, maxProfit = 0;
                    while(variantIndex<product.variants.length){

                        if(product.variantsIsEnchanted==undefined||product.variantsIsEnchanted[variantIndex]==1){
                            let profit = compareVariantProfit(settings,minion,product,variantIndex);
                            if(profit>maxProfit){
                                maxProfit = profit;
                                maxVariantIndex = variantIndex;
                            }
                        }
                        variantIndex++;
                    }
                    calculateVariantProfitManual(settings,minion,product,maxVariantIndex);
                });
                if(minion.hasDiamondSpreading){
                    let maxVariantIndex = 1, variantIndex = 1, maxProfit = 0;
                    while(variantIndex<diamondSpreadingItem.variants.length){
                        let profit = compareVariantProfit(settings,minion,diamondSpreadingItem,variantIndex);
                        if(profit>maxProfit){
                            maxProfit = profit;
                            maxVariantIndex = variantIndex;
                        }
                        variantIndex++;                
                    }
                    diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                    calculateVariantProfitManual(settings,minion,diamondSpreadingItem,maxVariantIndex);
                };
            }else if(settings.productForm==-1){ //max profit
                minion.products.forEach((product)=>{
                    let maxVariantIndex = 0, variantIndex = 0, maxProfit = 0;
                    while(variantIndex<product.variants.length){
                        let profit = compareVariantProfit(settings,minion,product,variantIndex);
                        if(profit>maxProfit){
                            maxProfit = profit;
                            maxVariantIndex = variantIndex;
                        }
                        variantIndex++;                
                    }
                    calculateVariantProfitManual(settings,minion,product,maxVariantIndex );
                });
                if(minion.hasDiamondSpreading){
                    let maxVariantIndex = 0, variantIndex = 0, maxProfit = 0;
                    while(variantIndex<diamondSpreadingItem.variants.length){
                        let profit = compareVariantProfit(settings,minion,diamondSpreadingItem,variantIndex);
                        if(profit>maxProfit){
                            maxProfit = profit;
                            maxVariantIndex = variantIndex;
                        }
                        variantIndex++;                
                    }
                    diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                    calculateVariantProfitManual(settings,minion,diamondSpreadingItem,maxVariantIndex);
                };
                //console.log(minion.outputProducts);
            }else{
                //just find that form
                minion.products.forEach((product)=>{
                    
                    let variantIndex = settings.productForm;

                    //while the index refers to enchanted form && (it does not exists || (it is not the only enchanted form && it is not an enchanted form)) e.g. snow block falls in this category
                    while(variantIndex>=0&&((!product.variants[variantIndex])||
                    (variantIndex!=0&&!(product.variantsIsEnchanted ? product.variantsIsEnchanted[variantIndex] : 1)))){
                        variantIndex--;
                    }
                    calculateVariantProfitManual(settings,minion,product,variantIndex);

                });
                if(minion.hasDiamondSpreading){
                    diamondSpreadingItem.perTime = minion.itemsHarvested*0.1;
                    calculateVariantProfitManual(settings,minion,diamondSpreadingItem,settings.productForm);
                };
                //console.log(minion.outputProducts);
                
            }
        }else{
            //new calculation type
            minion.products.forEach((product)=>{
                
                //itemsPerHour = 3600/time between actions/2 (offline)* res generated per time* (1+fuel/100) / amount of res needed to generate the enchanted form
                let totalItems = Math.floor(settings.offlineTime*3600/minion.tierDelay[minion.tier-1]/2*product.perTime*(1+settings.fuel/100));
                
                minion.itemsHarvested += totalItems;
                let variantIndex;
                if(settings.superCompactor>=2){
                    variantIndex = product.variants.length-1;
                    if(product.variantsIsEnchanted){ //eliminate snow block option
                        while(product.variantsIsEnchanted[variantIndex]==0&&variantIndex>=0){
                            variantIndex--;
                        }
                    }
                }else if(settings.superCompactor==1&&product.canCompactor){
                    variantIndex = product.compactor.minimumEnchanted ? product.compactor.minimumEnchanted : 0, maxProfit = 0;
                    for(index=variantIndex;index<product.variants.length;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }else{ //superCompactor = 0 / cannot be compacted by compactor
                    variantIndex = 0, maxProfit = 0;
                    for(index=variantIndex;index<product.variants.length;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }
                //variant index >=0 && the variant index is an enchanted form && still have items
                while(variantIndex>=0&&totalItems>0){
                    
                    let totalItemsVariant = (totalItems-(totalItems%product.variantsEquiv[variantIndex]))/product.variantsEquiv[variantIndex]; //(total-remainder)/divisor to get intergral ans
                    totalItems = totalItems%product.variantsEquiv[variantIndex];
                    if(totalItemsVariant!=0){
                        calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant);
                    }
                    variantIndex--;
                }
            
            });

            if(minion.hasDiamondSpreading){
                let totalItems = Math.floor(minion.itemsHarvested*0.1);
                let product = diamondSpreadingItem;
                let variantIndex;
                if(settings.superCompactor>=2){
                    variantIndex = product.variants.length-1;
                }else if(settings.superCompactor==1&&product.canCompactor){
                    variantIndex = product.compactor.minimumEnchanted ? product.compactor.minimumEnchanted : 0, maxProfit = 0;
                    for(index=variantIndex;index<product.variants.length;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }else{ //superCompactor = 0 / cannot be compacted by compactor
                    variantIndex = 0, maxProfit = 0;
                    for(index=variantIndex;index<product.variants.length;index++){
                        let profit = compareVariantProfit(settings,minion,product,index); 
                        if(profit>maxProfit){
                            variantIndex = index;
                            maxProfit = profit;
                        }
                    }
                }
                //variant index >=0 && the variant index is an enchanted form && still have items
                while(variantIndex>=0&&totalItems>0){
                    if(product.variantsIsEnchanted==undefined||product.variantsIsEnchanted[variantIndex]==1){
                        let totalItemsVariant = (totalItems-(totalItems%product.variantsEquiv[variantIndex]))/product.variantsEquiv[variantIndex]; //(total-remainder)/divisor to get intergral ans
                        totalItems = totalItems%product.variantsEquiv[variantIndex];
                        if(totalItemsVariant!=0){
                            calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant);
                        }
                    }
                    variantIndex--;
                }

            };

        }
    
        minion.totalProfit = 0; 
        minion.outputProducts.forEach((product)=>{
            minion.totalProfit +=product.profitPerItem;
            //for old cal type, totalProfit means profit per hour
            //for new cal type, totalProfit means total profit
        });
        
        minion.totalProfitText = moneyRepresentation(minion.totalProfit);
        minion.profitPerHour = moneyRepresentation(minion.totalProfit/settings.offlineTime);
    }
    
    function calculateVariantProfit(settings,minion,product,variantIndex,totalItemsVariant){
        let result = new Object();
        let itemsPerHour, unitPrice;
    
        result.name = product.variants[variantIndex];
        result.numberOfItems = totalItemsVariant;
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod]*(1-settings.tax/100);
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
                result.unitPrice = moneyRepresentation(bazaarPrice);
            }else{
                unitPrice = npcPrice;
                result.unitPrice = moneyRepresentation(npcPrice)+" (NPC)";
            } 
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            result.unitPrice = moneyRepresentation(unitPrice)+" (NPC)";
        }
        result.profitPerItem = totalItemsVariant*unitPrice;
        //for diamond spreading
        //minion.itemsHarvested += product.bazaarPrice[variantIndex][0]!=0 ? product.perTime : 0; // to solve the problem of "No gravel with flint shovel" being counted
        
        //for output
        minion.outputProducts.push(result);
       
    }

    function calculateVariantProfitManual(settings,minion,product,variantIndex){
        let result = new Object();
        let itemsPerHour, unitPrice;
    
        result.name = product.variants[variantIndex];
        itemsPerHour = 3600/minion.tierDelay[minion.tier-1]/2*product.perTime*(1+settings.fuel/100)/product.variantsEquiv[variantIndex] //get item per hour
        //itemsPerHour = 3600/time between actions/2 (offline)* res generated per time* (1+fuel/100) / amount of res needed to generate the enchanted form
        //visibility problems
        if(variantIndex>=2){
            result.numberOfItems = Math.round(itemsPerHour*10000)/10000;
        }else{
            result.numberOfItems = Math.round(itemsPerHour*100)/100; 
        }
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod]*(1-settings.tax/100);
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
                result.unitPrice = moneyRepresentation(bazaarPrice);
            }else{
                unitPrice = npcPrice;
                result.unitPrice = moneyRepresentation(npcPrice)+" (NPC)";
            } 
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            result.unitPrice = moneyRepresentation(unitPrice)+" (NPC)";
        }
        result.profitPerItem = itemsPerHour*unitPrice;
        //for diamond spreading
        minion.itemsHarvested += product.bazaarPrice[variantIndex][0]!=0 ? product.perTime : 0; // to solve the problem of "No gravel with flint shovel" being counted
        
        //for output
        minion.outputProducts.push(result);
       
    }

    function compareVariantProfit(settings, minion, product, variantIndex){ //a simplier version of calculateVariantProfit, without constants and things that stores in minion variable
        let itemsPerTime, unitPrice;
    
        //rough estimations
        itemsPerTime = product.perTime/product.variantsEquiv[variantIndex] //get item per hour
        
        if(settings.sellingTo==1){ //bazaar and npc
            let bazaarPrice = product.bazaarPrice[variantIndex][settings.sellingMethod];
            let npcPrice;
            if(product.variantsNpcPrices){
                npcPrice = product.variantsNpcPrices[variantIndex];
            }else{
                npcPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
            if(bazaarPrice>npcPrice){
                unitPrice = bazaarPrice;
            }else{
                unitPrice = npcPrice;
            } 
        }else{//npc only
            if(product.variantsNpcPrices){
                unitPrice = product.variantsNpcPrices[variantIndex];
            }else{
                unitPrice = product.npcPrice*product.variantsEquiv[variantIndex];
            }
        }
        return itemsPerTime*unitPrice;
    }
    async function findBazaar(){
        return new Promise((resolve)=>{
            setTimeout(() => {
                fetch("https://api.hypixel.net/skyblock/bazaar?key="+process.env.HYPIXEL_KEY)
                .then(result => result.json())
                .then(({ products }) => {
                    var pricesAjax = new Array(2);
                    pricesAjax[0] = new Object();
                    pricesAjax[1] = new Object();
                    Object.keys(itemNames).forEach((id) =>{
                        //0 -> sell price (sell offer) (buy instantly)
                        //if it has sell offer, use sell offer, else use default price
                        pricesAjax[0][itemNames[id]]= (products[id]["buy_summary"][0] ? products[id]["buy_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["buyPrice"]);
                        //1 -> buy price (sell instantly) (buy order)
                        //if it has buy order, use buy order, else use default price
                        pricesAjax[1][itemNames[id]]= (products[id]["sell_summary"][0] ? products[id]["sell_summary"][0]["pricePerUnit"] : products[id]["quick_status"]["sellPrice"]);
                    })
                    
                    pricesAjax[0]["Diamond (Spreading)"] = pricesAjax[0]["Diamond"];
                    pricesAjax[1]["Diamond (Spreading)"] = pricesAjax[1]["Diamond"];
                    pricesAjax[0]["Enchanted Diamond (Spreading)"] = pricesAjax[0]["Enchanted Diamond"];
                    pricesAjax[1]["Enchanted Diamond (Spreading)"] = pricesAjax[1]["Enchanted Diamond"];
                    pricesAjax[0]["Enchanted Diamond Block (Spreading)"] = pricesAjax[0]["Enchanted Diamond Block"];
                    pricesAjax[1]["Enchanted Diamond Block (Spreading)"] = pricesAjax[1]["Enchanted Diamond Block"];

                    diamondSpreadingItem.bazaarPrice=new Array(diamondSpreadingItem.variants.length);
                    diamondSpreadingItem.variants.forEach((variant,index)=>{
                        diamondSpreadingItem.bazaarPrice[index] = new Array(2);
                        if(pricesAjax[0][variant]){
                            diamondSpreadingItem.bazaarPrice[index][0] = pricesAjax[0][variant];
                            diamondSpreadingItem.bazaarPrice[index][1] = pricesAjax[1][variant];
                        }else{
                            //use NPC price as substitute
                            if(diamondSpreadingItem.variantsNpcPrices){
                                diamondSpreadingItem.bazaarPrice[index][0] = diamondSpreadingItem.variantsNpcPrices[index];
                            }else{
                                diamondSpreadingItem.bazaarPrice[index][0] = diamondSpreadingItem.npcPrice*diamondSpreadingItem.variantsEquiv[index];
                            }
                            diamondSpreadingItem.bazaarPrice[index][1] = diamondSpreadingItem.bazaarPrice[index][0];
                        }
                    });

                    minions.forEach((minion)=>{
                        minion.products.forEach((product)=>{
                            product.bazaarPrice=new Array(product.variants.length);
                            product.variants.forEach((variant,index)=>{
                                product.bazaarPrice[index] = new Array(2);
                                if(pricesAjax[0][variant]){
                                    product.bazaarPrice[index][0] = pricesAjax[0][variant];
                                    product.bazaarPrice[index][1] = pricesAjax[1][variant];
                                }else{
                                    //use NPC price as substitute
                                    if(product.variantsNpcPrices){
                                        product.bazaarPrice[index][0] = product.variantsNpcPrices[index];
                                    }else{
                                        product.bazaarPrice[index][0] = product.npcPrice*product.variantsEquiv[index];
                                    }
                                    product.bazaarPrice[index][1] = product.bazaarPrice[index][0];
                                }
                            });
                        });
                    });
                    bazaarFound = true;
                    resolve("success");
                })
                .catch(()=>{
                    settings.hasError=true;
                    settings.errorMsg = "Error occured when getting bazaar prices.";
                    resolve("success");
                });
            }, 0);
        });
    }

    async function findProfile(name){
        return new Promise((resolve)=>{
            setTimeout(() => {
                fetch("https://api.mojang.com/users/profiles/minecraft/"+name)
                .then(result => result.json())
                .then(({id}) => {
                    //console.log(id);
                    fetch("https://api.hypixel.net/skyblock/profiles?key="+process.env.HYPIXEL_KEY+"&uuid="+id)
                    .then(result => result.json())
                    .then(({profiles}) => {
                        let profilesAjax = new Array();
                        profiles.forEach((profile, index)=>{
                            profilesAjax[index] = new Object();
                            profilesAjax[index]["rawMinions"] = new Array();
                            Object.keys(profile["members"]).forEach((member, index2)=>{
                                if(profile["members"][member]["crafted_generators"]){
                                    profilesAjax[index]["rawMinions"].push(...profile["members"][member]["crafted_generators"]);
                                }
                            })
                            profilesAjax[index]["cuteName"] = profile["cute_name"];
                        });
                        profilesAjax.sort((a,b)=>{
                            return b["rawMinions"].length-a["rawMinions"].length;
                        });
                        minions.forEach((minion,index6)=>{
                            minion.profilesTier = new Array(profilesAjax.length);
                        });
                        profileNames = new Array(profilesAjax.length);
                        profilesAjax.forEach((profile,index)=>{ 
                            //store cute name for data input
                            //console.log(profile);
                            profileNames[index]=profile.cuteName;
                            minions.forEach((minion,index3)=>{
                                minion.profilesTier[index] = 0;
                            });
                            //for each crafted minion entry
                            profile.rawMinions.forEach((rawMinion,index2)=>{
                                //e.g. to get "TARANTULA" from "TARANTULA_4"
                                let underscoreLocation = rawMinion.lastIndexOf("_");
                                let searchString = rawMinion.substring(0,underscoreLocation);
                
                                //search it with each minion name
                                minions.forEach((minion,index4)=>{
                                    let minionString;
                                    if(minion.rawId){
                                        minionString = minion.rawId;
                                    }else{
                                        let minionLocation = minion.name.lastIndexOf(" ");
                                        minionString = minion.name.substring(0,minionLocation).toUpperCase();
                                    }
                                    if(minionString==searchString){
                                        minion.profilesTier[index] = Math.max(minion.profilesTier[index], rawMinion.substring(underscoreLocation+1));
                                    }
                                });
                            });
                        });
                        //console.log(minions);
                        //console.log(profilesAjax);
                        console.log("finished findProfile");
                        resolve("success");
                    })
                    .catch((err)=>{
                        console.log("catch from skyblock",err);
                        settings.hasError=true;
                        settings.errorMsg = "Error occured when finding the profile. The player has not played Skyblock before.";
                        resolve("success");
                    });
                })
                .catch((err)=>{
                    console.log("catch from mojang",err);
                    settings.hasError=true;
                    settings.errorMsg = "Error occured when finding the profile. The player does not exist.";
                    resolve("success");
                });
            }, 0);
        });
    }

    //copied from events.js
    function dateTimeToString(dateTime){
        let d = new Date(dateTime);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+numberToString(d.getHours(),2)+":"+numberToString(d.getMinutes(),2)+":"+numberToString(d.getSeconds(),2)
    }
    //create leading zeros
    function numberToString(number, digits){
        var numberRemaining = number;
        var returnString = "";
        for(let i=(digits-1);i>=0;i--){
            returnString+=Math.floor(numberRemaining/Math.pow(10,i));
            numberRemaining=numberRemaining%Math.pow(10,i);
        }
        return returnString;
    }
    //copied from general.js
    function moneyRepresentation(number){
        if(number<0){
            return "-" + moneyRepresentationMagnitude(Math.abs(number));
        }else{
            return moneyRepresentationMagnitude(number);
        }
    }

    function moneyRepresentationMagnitude(number){
        
        if(number>=1&&number<100000){ //shortcut
            return Math.round(number*10)/10; //1 d.p. e.g. 10.0, 99999.9
        }else if(number<0.0001){
            return number; //surrender
        }else if(number<0.01){
            return Math.round(number*10000)/10000; //0.0005
        }else if(number<1){
            return Math.round(number*100)/100; //0.05
        }else if(number<999500){
            return Math.round(number/1000)+"k"; //100k
        }else if(number<9995000){
            return Math.round(number/10000)/100+"M"; //1.00M
        }else if(number<99950000){
            return Math.round(number/100000)/10+"M"; //10.0M
        }else if(number<999500000){
            return Math.round(number/1000000)+"M"; //100M
        }else if(number<9995000000){
            return Math.round(number/10000000)/100+"B"; //1.00B
        }else if(number<99950000000){
            return Math.round(number/100000000)/10+"B"; //10.0B
        }else if(number<999500000000){
            return Math.round(number/1000000000)+"B"; //100B
        }else{
            return number; //surrender
        }
    }
}


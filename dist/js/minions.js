// initCalculateMinionsProfit(0, 12, 25, -3, 0, 1).then(()=>{
    
//     //async await
//     printTable();

//     //enable double scroll
//     $("#minionsTable").doubleScroll();
    
//     $("#overallSettings").prop('disabled', false);

//     minions.forEach((minion,index)=>{
//         $("#individualSettings"+index).prop('disabled', false);
//     })
// });

let minecraftName;
let individualModalMinionIndex = 0;

//FUNCTIONS TO RESPOND TO USER INPUT
function openIndividualSettings(minionIndex){
    console.log("open("+minionIndex);
    individualModalMinionIndex = minionIndex;
    
    //personalise the individual settings
    $("#individualModalLabel").html(minions[minionIndex].name);
    $("#individualTier").val(minions[minionIndex].tier);
    $("#individualFuel").val(minions[minionIndex].fuel);
    $("#individualDiamondSpreading").prop("checked",minions[minionIndex].useDiamondSpreading);
    $("#individualSellingTo").val(minions[minionIndex].npcPreference);
    $("#individualSellingMethod").val(minions[minionIndex].sellingMethod);
    
    //tier 12?
    if(minions[minionIndex].tierDelay.length==12){
        $("#individualTierOption12").show();
    }else{
        $("#individualTierOption12").hide();
    }
    //hide all the options and dropdowns first
    for(i=0;i<10;i++){
        $("#individualProduct"+i).hide();
        for(j=0;j<5;j++){
            $("#individualProduct"+i+"Option"+j).hide();
        }
    }

    //create the dropdown for each product
    minions[minionIndex].products.forEach((product,index)=>{
        //console.log(product);
        $("#individualProduct"+index).show();
        product.variants.forEach((variant,index2)=>{
            $("#individualProduct"+index+"Option"+index2).show();
            $("#individualProduct"+index+"Option"+index2).html(variant);
            $("#individualProduct"+index+"Option"+index2).val(index2);
            if(index2==product.variantIndex){
                $("#individualProduct"+index+"Option"+index2).prop("selected",true);
            }
        });
        //unenchanted form
        $("#individualProduct"+index+"Option"+product.variants.length).show();
        $("#individualProduct"+index+"Option"+product.variants.length).html(product.item);
        $("#individualProduct"+index+"Option"+product.variants.length).val(-1);
        if(-1==product.variantIndex){
            $("#individualProduct"+index+"Option"+product.variants.length).prop("selected",true);
        }
        //if does not exist
        $("#individualProduct"+index+"Option"+(product.variants.length+1)).show();
        $("#individualProduct"+index+"Option"+(product.variants.length+1)).html("No "+product.item);
        $("#individualProduct"+index+"Option"+(product.variants.length+1)).val(-4);
        if(-4==product.variantIndex){
            $("#individualProduct"+index+"Option"+(product.variants.length+1)).prop("selected",true);
        }
    });

    //add dropdown for diamond spreading
    console.log(minions[minionIndex].diamondSpreadingVariantUsed);
    diamondSpreading.variants.forEach((variant, index2)=>{
        $("#individualProductDiamondSpreadingOption"+index2).show();
        $("#individualProductDiamondSpreadingOption"+index2).html(variant);
        $("#individualProductDiamondSpreadingOption"+index2).val(index2);
        if(index2==minions[minionIndex].diamondSpreadingVariantUsed){
            console.log("#individualProductDiamondSpreadingOption"+index2);
            $("#individualProductDiamondSpreadingOption"+index2).prop("selected",true);
        }
    });
    $("#individualProductDiamondSpreadingOption"+diamondSpreading.variants.length).show();
    $("#individualProductDiamondSpreadingOption"+diamondSpreading.variants.length).html(diamondSpreading.item);
    $("#individualProductDiamondSpreadingOption"+diamondSpreading.variants.length).val(-1);
    if(-1==minions[minionIndex].diamondSpreadingVariantUsed){
        console.log("#individualProductDiamondSpreadingOption"+diamondSpreading.variants.length);
        $("#individualProductDiamondSpreadingOption"+diamondSpreading.variants.length).prop("selected","selected");
    }

    if(minions[minionIndex].useDiamondSpreading){
        $("#individualProductDiamondSpreading").show();
    }else{
        $("#individualProductDiamondSpreading").hide();
    }
    
}
function applyIndividualSettings(){
    let tier = $("#individualTier").children("option:selected").val();
    let minionIndex = individualModalMinionIndex;
    console.log("apply("+minionIndex);
    let fuel = $("#individualFuel").val();
    if(fuel<0){
        fuel=0;
        $("#individualFuel").val(0);
    }
    let diamondSpreading = $("#individualDiamondSpreading").prop("checked");
    let productForm = new Array();
    minions[minionIndex].products.forEach((product,index)=>{
        productForm.push($("#individualProduct"+index).children("option:selected").val());
    });
    productForm.push($("#individualProductDiamondSpreading").children("option:selected").val());
    let sellingMethod = $("#individualSellingMethod").children("option:selected").val();
    let sellingTo = $("#individualSellingTo").children("option:selected").val();
    
    calculateMinionProfit(minions[minionIndex],sellingMethod,tier,fuel,productForm,sellingTo,diamondSpreading*2);// to bypass initial minion state
    
    let minionName = minions[minionIndex].name;
    printTable();

    //search for that minion after sorted and change it to orange, and display an alert msg
    minions.forEach((minion,index)=>{
        if(minion.name==minionName){
            $("#individualSettings"+index).addClass("btn-warning");
            $("#individualSettings"+index).removeClass("btn-blue");
            alert("Successful! "+minionName+" is now moved to position "+(index+1));
        }else{
            $("#individualSettings"+index).addClass("btn-blue");
            $("#individualSettings"+index).removeClass("btn-warning");
        }
    })

}



function overallSettings(){
    let fuel = $("#overallFuel").val();
    if(fuel<0){
        fuel=0;
        $("#overallFuel").val(0);
    }
    let diamondSpreading = $("#overallDiamondSpreading").prop("checked");
    let productForm = $("#overallProductForm").children("option:selected").val();
    let sellingMethod = $("#overallSellingMethod").children("option:selected").val();
    let sellingTo = $("#overallSellingTo").children("option:selected").val();

    let useProfile = $("#overallUseProfile").prop("checked");
    if(useProfile){
        if(!$("#overallProfileName").val()){ //if it is empty, use default tiers instead
            let tier = $("#overallTier").children("option:selected").val();
            
            calculateMinionsProfit(sellingMethod, tier, fuel, productForm, sellingTo, diamondSpreading)
            printTable();

            $("#overallUseProfile").prop("checked", false)
            toggleUseProfile();
            return;
        }
        if($("#overallProfileName").val()!=minecraftName){
            //i.e. new profile
            //AJAX
            $.get("/api/get-profile-api/"+$("#overallProfileName").val(),(profilesAjax) => {
                console.log(profilesAjax);
                //error message from ajax call
                if(profilesAjax==null){
                    alert("Error occured when finding the profile. The player does not exist, or has not played Skyblock before.");
                    return;
                }
                let profile = profilesAjax[0];
                for(let i=0;i<5;i++){
                    $("#overallProfileProfileOption"+i).hide();
                    $("#overallProfileProfileOption").prop("selected",null);
                }
                
                $("#overallProfileProfile").show();
                $("#overallProfileProfile").val(0);
                minions.forEach((minion,index6)=>{
                    minion.profilesTier = new Array(5);
                });
                profilesAjax.forEach((profile,index)=>{ 
                    $("#overallProfileProfileOption"+index).html(profile.cuteName);
                    $("#overallProfileProfileOption"+index).show();
                    
                    //initialise tier to be 0
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
                console.log(profile.cuteName);

                //let the first profile minion information to be put on html
                minions.forEach((minion,index5)=>{
                    calculateMinionProfit(minion,sellingMethod,minion.profilesTier[0],fuel, productForm, sellingTo, diamondSpreading)
                });
                
                minecraftName = $("#overallProfileName").val();

                printTable();
                //change back their color
                minions.forEach((minion,index)=>{
                    $("#individualSettings"+index).addClass("btn-blue");
                    $("#individualSettings"+index).removeClass("btn-warning");
                })
            });
        }else{
            //just get from the values stored
            let profileIndex = $("#overallProfileProfile").children("option:selected").val();
            minions.forEach((minion,index5)=>{
                calculateMinionProfit(minion,sellingMethod,minion.profilesTier[profileIndex],fuel, productForm, sellingTo, diamondSpreading)
            });
        }
            
    }else{
        let tier = $("#overallTier").children("option:selected").val();

        calculateMinionsProfit(sellingMethod, tier, fuel, productForm, sellingTo, diamondSpreading);
        
    }
    
    printTable();
    //change back their color
    minions.forEach((minion,index)=>{
        $("#individualSettings"+index).addClass("btn-blue");
        $("#individualSettings"+index).removeClass("btn-warning");
    })
}

//Called after each change
function printTable(){
    //sort: descending order by profit
    minions.sort((a,b) =>{
        return b.profit-a.profit;
    });

    minions.forEach((minion,index)=>{
        let roundedProfit = moneyRepresentation(minion.profit);
        $("#minion"+index+"Name").html(minion.name + "<br />(" + roundedProfit + ")");
        $("#minion"+index+"Tier").html(minion.tier);
        $("#minion"+index+"Items").html(minion.items);
        $("#minion"+index+"ItemsPerHour").html(minion.itemsPerHour);
        $("#minion"+index+"BazaarPrices").html(minion.bazaarPrices);
        $("#minion"+index+"Profit").html(roundedProfit);
        if(minion.warning){
            $("#minion"+index+"Warning").show();
            $("#minion"+index+"Warning").html(minion.warning);
        }else{
            $("#minion"+index+"Warning").hide();
        }
    });
}

//functions to provide interactions
function toggleUseProfile(){
    let useProfile = $("#overallUseProfile").prop("checked");
    if(useProfile){
        $("#useProfile").removeClass("d-none");
        $("#useTier").addClass("d-none");
    }else{
        $("#useTier").removeClass("d-none");
        $("#useProfile").addClass("d-none");
    }
}


function toggleIndividualDiamondSpreading(){
    let useDiamondSpreading = $("#individualDiamondSpreading").prop("checked");
    if(useDiamondSpreading){
        $("#individualProductDiamondSpreading").removeClass("d-none");
    }else{
        $("#individualProductDiamondSpreading").addClass("d-none");
    }
}

function toggleCalculationType(){
    let calculationType = $("#overallCalculationType").children("option:selected").val();
    if(calculationType==1){
        $("#autoCalculationType").removeClass("d-none");
        $("#manualCalculationType").addClass("d-none");
    }else{
        $("#manualCalculationType").removeClass("d-none");
        $("#autoCalculationType").addClass("d-none");
    }
}

function toggleMinionChest(){
    console.log("toggleMinionChest");
    let superCompactor = $("#overallSuperCompactor").children("option:selected").val();
    console.log($("#overallSuperCompactor").children("option:selected").val());
    if(superCompactor<=1){
        $("#minionChest").removeClass("d-none");
    }else{
        $("#minionChest").addClass("d-none");
    }
}

function generateLink(){
    let keys = [], values = [];

    //general
    if($("#overallUseProfile").prop("checked")&&$("#overallProfileName").val()!=0){
        keys.push("name");
        values.push($("#overallProfileName").val());
        if($("#overallProfileProfile")&&$("#overallProfileProfile").children("option:selected").val()==0){{
            keys.push("profile");
            values.push($("#overallProfileProfile").children("option:selected").val());
        }}
    }else if($("#overallTier").children("option:selected").val()!=12){
        keys.push("tier");
        values.push($("#overallTier").children("option:selected").val());
    }
    if($("#overallFuel").val()!=25){
        keys.push("fuel");
        values.push($("#overallFuel").val());
    }

    //advanced
    if($("#overallCalculationType").children("option:selected").val()==1){
        if($("#overallOfflineTime").val()!=24){
            keys.push("offlineTime");
            values.push($("#overallOfflineTime").val());
        }

        if($("#overallSuperCompactor").children("option:selected").val()==3){
            if(!$("#overallDiamondSpreading").prop("checked")){
                keys.push("diamondSpreading");
                values.push(0);
            }
        }else{
            keys.push("superCompactor");
            values.push($("#overallSuperCompactor").children("option:selected").val());
            keys.push("diamondSpreading");
            values.push($("#overallDiamondSpreading").prop("checked")? 1 : 0);
        }
        // if($("#overallSuperCompactor").children("option:selected").val()<=1){
        //     if($("#overallMinionChest").children("option:selected").val()!=9){
        //         keys.push("minionChest");
        //         values.push($("#overallMinionChest").children("option:selected").val());
        //     }
        //     if($("#overallAutomaticShipping").children("option:selected").val()!=0.5){
        //         keys.push("automaticShipping");
        //         values.push($("#overallAutomaticShipping").children("option:selected").val());
        //     }
        // }
    }else{
        keys.push("calculationType");
        values.push($("#overallCalculationType").children("option:selected").val());
        if($("#overallProductForm").children("option:selected").val()!=-2){
            keys.push("productForm");
            values.push($("#overallProductForm").children("option:selected").val());
        }
        if($("#overallDiamondSpreadingDwarvenCompactor").children("option:selected").val()!=2){
            keys.push("diamondSpreading");
            values.push($("#overallDiamondSpreadingDwarvenCompactor").children("option:selected").val());
        }
    }
    
    //minor
    if($("#overallSellingTo").children("option:selected").val()!=1){
        keys.push("sellingTo");
        values.push($("#overallSellingTo").children("option:selected").val());
    }
    if($("#overallSellingMethod").children("option:selected").val()!=1){
        keys.push("sellingMethod");
        values.push($("#overallSellingMethod").children("option:selected").val());
    }
    if($("#overallTax").val()!=1){
        keys.push("tax");
        values.push($("#overallTax").val());
    }
    let string = "/minions/?"
    for(let i=0;i<keys.length;i++){
        string += keys[i]+"="+values[i]+"&";
    }
    string += "/#minionsTable";
    window.location.href=string;
}

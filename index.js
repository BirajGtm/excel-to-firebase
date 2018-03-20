node_xj = require("xls-to-json");
  

realParser = (result) => {
    const finalResult = result.map((value)=>{
        return {
            regdNo:value.regdNo.toUpperCase(),
            name:value.name.toUpperCase(),
            dues:value.dues
        }   
    });
    const arrayToObject = (finalResult) =>
        finalResult.reduce((obj, item) => {
        obj[item.regdNo] = item
        return obj;
    },{});
    console.log(JSON.stringify(arrayToObject(finalResult),null,4));
}

node_xj({
    input: "./students.xlsx",  // input xls 
    output: "./output.json", // output json   // specific sheetname 
}, function(err, result) {
    if(err) {
        console.error(err);
    } else {
        realParser(result);
    }
});
let Defines = {
    useObjectRocket: false,
    undefined: true,
};
let ConnectString = "123";
if (Defines.useObjectRocket){
    console.log("Use objectRocket!");
    ConnectString = "mongodb://ajaxliu:0927972235@iad2-c18-1.mongo.objectrocket.com:52279,iad2-c18-0.mongo.objectrocket.com:52279,iad2-c18-2.mongo.objectrocket.com:52279/caseDesign?replicaSet=9cb1e8e9c4564222965a058a8041a23d";
}
else{
    console.log("Use Local MongoDB!");
    ConnectString = "mongodb://localhost:27017/caseDesign";
    }

module.exports = { Defines, ConnectString };
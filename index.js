let length = 0;
const ALPHA  = 0;
//dictionary buat cutnya
/**Describe cut quality of the diamond. Quality in increasing order Fair, Good, Very Good, Premium, Ideal */
let dictForCut = {
   "Fair" : 0.2, 
   "Good" : 0.4, 
   "Very Good" : 0.6, 
   "Premium":0.8 , 
   "Ideal":1
}
//dictionary buat color
/**
 * Color of the diamond, with D being the best and J the worst
 */
let dictForColor = {
   "D" : 1,
   "E" : 6/7,
   "F" : 5/7,
   "G" : 4/7,
   "H" : 3/7,
   "I" : 3/7,
   "J" : 1/7,
}
//dictionary buat clarity 
/*How obvious inclusions are within the diamond:(in order from best to worst, FL = flawless, I3= level 3 inclusions)
FL,IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3 */
let dictForClarity = {
   "FL" : 11/11,
   "IF" : 10/11, 
   "VVS1" : 9/11, 
   "VVS2": 8/11, 
   "VS1": 7/11, 
   "VS2" : 6/11, 
   "SI1" : 5/11,
   "SI2" : 4/11,
   "I1" : 3/11,
   "I2" : 2/11,
   "I3" : 1/11, 
}

//getting the json into a loadable data
fetch("./diamond.json")
.then(response => {
   return response.json();
})
.then(data => {
   //pindah ke diamondData biar jelas
   let diamondData = data;
   console.log(diamondData);
   //init
   length = diamondData.length;
   //dah tinggal di coding
   
});


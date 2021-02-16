let length = 0;
const ALPHA  = 0;
//dictionary buat cutnya
let dictForCut = {
   "Fair" : 0.2, 
   "Good" : 0.4, 
   "Very Good" : 0.6, 
   "Premium":0.8 , 
   "Ideal":1
}
//dictionary buat color
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
let dictForClarity = {

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


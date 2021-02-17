let length = 0;
const ALPHA = 0.01;
const MAX_PRICE = 18823;
const MAX_CARAT = 5.01;
const MAX_DEPTH = 79;
const MAX_TABLEWIDTH = 95;
const NUM_OF_X = 6;
const NUM_OF_THETA = NUM_OF_X + 1;

//inisialisasi semua unsur yang akan digunakan dalam linear reg (belum semua)
let xCut = [];
let xColor = [];
let xClarity = [];
let xCarat = [];
let xDepthTotal = [];
let xTableWidth = [];

//inisialisasi tempat Y data akan berdiam
let Ydata = [];

// inisialisasi tempat Y sesuai rumus theta nantinya
let Y = [];

//panjang dari diamond data

//threshold itu batasannya agar looping selesai / konvergen
const THRESHOLD = 0.1;

let theta = [];

//dictionary buat cutnya
/**Describe cut quality of the diamond. Quality in increasing order Fair, Good, Very Good, Premium, Ideal */
let dictForCut = {
  Fair: 0.2,
  Good: 0.4,
  "Very Good": 0.6,
  Premium: 0.8,
  Ideal: 1,
};
//dictionary buat color
/**
 * Color of the diamond, with D being the best and J the worst
 */
let dictForColor = {
  D: 1,
  E: 6 / 7,
  F: 5 / 7,
  G: 4 / 7,
  H: 3 / 7,
  I: 3 / 7,
  J: 1 / 7,
};
//dictionary buat clarity
/*How obvious inclusions are within the diamond:(in order from best to worst, FL = flawless, I3= level 3 inclusions)
FL,IF, VVS1, VVS2, VS1, VS2, SI1, SI2, I1, I2, I3 */
let dictForClarity = {
  FL: 11 / 11,
  IF: 10 / 11,
  VVS1: 9 / 11,
  VVS2: 8 / 11,
  VS1: 7 / 11,
  VS2: 6 / 11,
  SI1: 5 / 11,
  SI2: 4 / 11,
  I1: 3 / 11,
  I2: 2 / 11,
  I3: 1 / 11,
};

//getting the json into a loadable data
fetch("./diamond.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    //pindah ke diamondData biar jelas
    let diamondData = data;
    length = diamondData.length;
    //mengambil data data dari json yang ada dan dipisah ke array array agar lebih mudah dikerjakan
    getYfromData(
      Ydata,
      xTableWidth,
      xDepthTotal,
      xCarat,
      xColor,
      xCut,
      xClarity,
      diamondData
    );

    // mempermudah visualisasi dari setiap array yang telah di buat
    // console.log(Ydata,"DATA");
    // console.log(xTableWidth,"TABLE"); 1
    // console.log(xDepthTotal,"DEPTH"); 2
    // console.log(xCarat,"CARAT");      3
    // console.log(xColor,"COLOR");      4
    // console.log(xCut,"CUT");          5
    // console.log(xClarity,"CLARITY");  6

    //proses masukkan data dari price ke array Y
    for (let i = 0; i < length; i++) {
      Y.push(Ydata[i]);
    }

    //proses membuat theta 0 - 6 karena menggunakan 6 variabel
    //NUM OF THETA = NUM_OF_X + 1;
    for (let i = 0; i < NUM_OF_THETA; i++) {
      theta[i] = 0;
    }
    let cost = 100;
    let ctr = 1;

    //x hanya untuk mencatat setiap theta
    let x = "";
    for (let i = 0; i < NUM_OF_THETA; i++) {
      theta[i] = theta[i] - (sumTheta(i) * ALPHA) / length;
      x += `Theta ${i} - ${theta[i]}
      `;
    }

    //threshold max itu 0.1 / 10%
    while (cost > THRESHOLD) {
      let x = "";
      for (let i = 0; i < NUM_OF_THETA; i++) {
        theta[i] = theta[i] - (sumTheta(i) * ALPHA) / length;
        x += `Theta ${i} - ${theta[i]}
         `;
      }
      cost = (1 / length) * 2 * sumWithNewTheta();

      //ngeprint output dari setiap iterasi
      console.log(`Iteration Number - ${ctr} |
       ${x} | COST : ${cost}`);
      ctr++;
    }

    //ngeprint hasil dari price yang ditebak dan price yang sebenarnya
    console.log(Y, Ydata);
  });

function sumWithNewTheta() {
  //mendapatkan nilai y yang baru
  let ans = 0;
  for (let i = 0; i < length; i++) {
    let x1 = theta[1] * xTableWidth[i];
    let x2 = theta[2] * xDepthTotal[i];
    let x3 = theta[3] * xCarat[i];
    let x4 = theta[4] * xColor[i];
    let x5 = theta[5] * xCut[i];
    let x6 = theta[6] * xClarity[i];
    Y[i] = theta[0] + x1 + x2 + x3 + x4 + x5 + x6;

    let sum = Math.pow(Y[i] - Ydata[i], 2);
    ans += sum;
  }
  return ans;
}

function sumTheta(num) {
  //ngitung semua theta yang ada
  let ans = 0;
  for (let i = 0; i < length; i++) {
    if (num == 0) {
      ans += theta[num] - Y[i];
    } else if (num == 1) {
      ans += (theta[num] - Y[i]) * xTableWidth[i];
    } else if (num == 2) {
      ans += (theta[num] - Y[i]) * xDepthTotal[i];
    } else if (num == 3) {
      ans += (theta[num] - Y[i]) * xCarat[i];
    } else if (num == 4) {
      ans += (theta[num] - Y[i]) * xColor[i];
    } else if (num == 5) {
      ans += (theta[num] - Y[i]) * xCut[i];
    } else if (num == 6) {
      ans += (theta[num] - Y[i]) * xClarity[i];
    }
  }
  return ans;
}

function getYfromData(
  Ydata,
  xTableWidth,
  xDepthTotal,
  xCarat,
  xColor,
  xCut,
  xClarity,
  diamondData
) {
  for (let i = 0; i < length; i++) {
    //memasukkan data dari harga diamond yang menjadi acuan Y
    Ydata.push(normalizedPrice(diamondData[i]["price"]));
    xClarity.push(translateToNumber("clarity", diamondData[i]["clarity"]));
    xColor.push(translateToNumber("color", diamondData[i]["color"]));
    xCut.push(translateToNumber("cut", diamondData[i]["cut"]));
    xCarat.push(normalizedCarats(diamondData[i]["carat"]));
    xDepthTotal.push(normalizedDepth(diamondData[i]["depth"]));
    xTableWidth.push(normalizedTable(diamondData[i]["table"]));
  }
}

// normalisasi harga
function normalizedPrice(number) {
  return number / MAX_PRICE;
}

// normalisasi carat
function normalizedCarats(num) {
  return num / MAX_CARAT;
}

// normalisasi depth
function normalizedDepth(num) {
  return num / MAX_DEPTH;
}

// normalisasi table
function normalizedTable(num) {
  return num / MAX_TABLEWIDTH;
}

// hanya untuk translate ke angka yang ada dalam dictionary
function translateToNumber(type, string) {
  if (type == "clarity") {
    return dictForClarity[string];
  } else if (type == "color") {
    return dictForColor[string];
  } else if (type == "cut") {
    return dictForCut[string];
  } else {
    console.log("failed to process");
  }
}

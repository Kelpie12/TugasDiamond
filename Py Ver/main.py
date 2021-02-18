import csv

filename = "../newdiamonds.csv"
#semua data dari diamond
diamondData = list()

#baca file agar bisa pindah ke dalam diamond data
with open(filename, 'r') as data:
    for line in csv.DictReader(data):
        diamondData.append(line)



# output dari price dengan theta yang kita buat
price_output = list()
# price data yang diambil dari data asli
price_data = list()



# variabel yang digunakan ( x, y, z, carat, cut, clarity, color)
X = list()
Y = list()
Z = list()
carat = list()
cut = list()
clarity = list()
color = list()
table = list()
depth = list()
cost = 100

#CONSTANT
MAX_PRICE = 18823
MAX_CARAT = 5.01
MAX_X = 10.74
MAX_Y = 58.9
MAX_Z = 31.8
NUM_OF_X = 6
NUM_OF_THETA = NUM_OF_X + 1
theta = [0] * NUM_OF_THETA
THRESHOLD = 0.025
ALPHA = 0.01
LENGTH = len(diamondData)


#DICTIONARY
DICT_CUT = {
  "Fair": 1/5,
  "Good": 2/5,
  "Very Good": 3/5,
  "Premium": 4/5,
  "Ideal": 5/5,
}
DICT_COLOR = {
  "D": 1,
  "E": 6 / 7,
  "F": 5 / 7,
  "G": 4 / 7,
  "H": 3 / 7,
  "I": 2 / 7,
  "J": 1 / 7,
}
DICT_CLARITY = {
  "FL": 11 / 11,
  "IF": 10 / 11,
  "VVS1": 9 / 11,
  "VVS2": 8 / 11,
  "VS1": 7 / 11,
  "VS2": 6 / 11,
  "SI1": 5 / 11,
  "SI2": 4 / 11,
  "I1": 3 / 11,
  "I2": 2 / 11,
  "I3": 1 / 11,
}

def normalizedCarat(x):
    return x/MAX_CARAT
def normalizedPrice(x):
    return x/MAX_PRICE
def normalizedX(x):
    return x/MAX_X
def normalizedY(x):
    return x/MAX_Y
def normalizedZ(x):
    return x/MAX_Z
def normalized_table_and_depth(x):
    return x/100


def translate(input,type):
    if(type == 'clarity'):
        return DICT_CLARITY[input]
    elif (type == 'color'):
        return DICT_COLOR[input]
    else:
        return DICT_CUT[input]

#looping untuk semua datanya
for data in diamondData:
    # price_data.append(normalizedPrice(float(data['price'])))
    # price_output.append(normalizedPrice(float(data['price'])))
    #
    # X.append(normalizedX(float(data['x'])))
    # Y.append(normalizedY(float(data['y'])))
    # Z.append(normalizedZ(float(data['z'])))
    #
    # clarity.append(translate(data['clarity'], 'clarity'))
    # color.append(translate(data['color'], 'color'))
    # cut.append(translate(data['cut'], 'cut'))
    #
    # carat.append(normalizedCarat(float(data['carat'])))
    # table.append(normalized_table_and_depth(float(data['table'])))
    # depth.append(normalized_table_and_depth(float(data['depth'])))

    price_data.append(float(data['price']))
    price_output.append(float(data['price']))

    X.append(float(data['x']))
    Y.append(float(data['y']))
    Z.append(float(data['z']))

    carat.append(float(data['carat']))
    table.append(float(data['table']))
    depth.append(float(data['depth']))

#for tracing
# for i in range(LENGTH):
#     #print(price_data[i])
#     #print(price_output[i] == price_data[i])
#     #print(X[i])
#     #print(Y[i])
#     #print(Z[i])
#     #print(clarity[i],color[i],cut[i],carat[i])
#     #print(table[i])
#     #print(depth[i])

def sum_theta(paramI):
    ans = 0
    for i in range(LENGTH):
        if paramI == 0:
            ans += theta[paramI] - price_output[i]
        elif paramI == 1:
            ans += (theta[paramI] - price_output[i]) * X[i]
        elif paramI == 2:
            ans += (theta[paramI] - price_output[i]) * Y[i]
        elif paramI == 3:
            ans += (theta[paramI] - price_output[i]) * Z[i]
        elif paramI == 4:
            ans += (theta[paramI] - price_output[i]) * carat[i]
        elif paramI == 5:
            ans += (theta[paramI] - price_output[i]) * table[i]
        elif paramI == 6:
            ans += (theta[paramI] - price_output[i]) * depth[i]
        # if paramI == 0:
        #     ans += theta[paramI] - price_output[i]
        # elif paramI == 1:
        #     ans += (theta[paramI] - price_output[i]) * X[i]
        # elif paramI == 2:
        #     ans += (theta[paramI] - price_output[i]) * Y[i]
        # elif paramI == 3:
        #     ans += (theta[paramI] - price_output[i]) * Z[i]
        # elif paramI == 4:
        #     ans += (theta[paramI] - price_output[i]) * clarity[i]
        # elif paramI == 5:
        #     ans += (theta[paramI] - price_output[i]) * color[i]
        # elif paramI == 6:
        #     ans += (theta[paramI] - price_output[i]) * cut[i]
        # elif paramI == 7:
        #     ans += (theta[paramI] - price_output[i]) * carat[i]
        # elif paramI == 8:
        #     ans += (theta[paramI] - price_output[i]) * table[i]
        # elif paramI == 9:
        #     ans += (theta[paramI] - price_output[i]) * depth[i]
    return ans

def sum_with_new_theta():
    get_new_price_output()
    ans = 0
    for i in range(LENGTH):
        sum = (price_output[i] - price_data[i])**2
        ans += sum

    return ans
def get_new_price_output():
    for i in range(LENGTH):
        x1 = theta[1] * X[i]
        x2 = theta[2] * Y[i]
        x3 = theta[3] * Z[i]
        # x4 = theta[4] * clarity[i]
        # x5 = theta[5] * color[i]
        # x6 = theta[6] * cut[i]
        x7 = theta[4] * carat[i]
        x8 = theta[5] * table[i]
        x9 = theta[6] * depth[i]
        # price_output[i] = theta[0] + x1 + x2 + x3 + x4 + x5 + x6 + x7 + x8 + x9
        price_output[i] = theta[0] + x1 + x2 + x3 + x7 + x8 + x9
        #price_output[i] = theta[0] + x1 + x2 + x3 + x6 + x7

ctr = 0
file = open("getIteration.txt","w")
while(cost >= THRESHOLD):
    for i in range(NUM_OF_THETA):
        theta[i] = theta[i] - sum_theta(i) * ALPHA / LENGTH

    cost = 1 / (LENGTH * 2) * sum_with_new_theta()
    file.write("Iterasi KE - " + str(ctr) + " | Cost : " + str(cost) + "\n")
    ctr += 1

file.close()
print("done")

final = open("Output.txt","w")
diff = list()

for i in range(LENGTH):
    final.write(str(i) + ". " + str(price_output[i]) + " | " + str(price_data[i]) + "\n")
    diff.append(price_output[i] - price_data[i])

final.write("\n \n MAX DIFFERENCE : " + str(max(diff)) + " \n  MIN DIFFERENCE : " + str(min(diff)))
final.close()

print("done final")
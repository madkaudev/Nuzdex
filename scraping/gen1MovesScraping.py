# Import statements
import requests
from bs4 import BeautifulSoup
import pandas as pd
import re 

# Making a GET request to initial site
request = requests.get("https://www.serebii.net/attackdex-rby/absorb.shtml")

# Print status code
print(request)

# Parsing the HTML
soup = BeautifulSoup(request.content, "html.parser")

# Find all move links
links = []
for link in soup.main.find_all('option'):
    links.append(link.get('value'))

# Remove 'None' values and make full valid links
links = [link for link in links if link != None]
links = ["https://www.serebii.net" + link for link in links]

# Function to extract data from move page
def extract_move_data(tag):
    series = []
    rows = tag.find_all("tr")
    ## Loop through rows
    for i in range(len(rows)):
        if i % 2 == 1:
            ### Loop through data points in row
            tds = rows[i].find_all("td")
            for j in range(len(tds)):
                #### If the data is the type, do a special procedure
                if tds[j].find("a"):
                    series.append(tds[j].find("a")['href'])
                #### Otherwise return normal value
                else:
                    series.append(tds[j].contents[0].strip())
    return series

# Create a dataframe to store all move data
gen1Moves = pd.DataFrame()
gen1Moves = pd.DataFrame(columns=["Name", "Type", "PP", "Power", "Accuracy", "Description", "Effect", "EffectRate", "TM", "Priority", "Target"])

# Loop through option links to extract all move data and store in dataframe
for i in range(len(links)):
    request = requests.get(links[i])
    soup = BeautifulSoup(request.content, "html.parser")
    tableDextable = soup.find(attrs={"class": "dextable"})
    move = extract_move_data(tableDextable)
    print("Saving data for: " + move[0])
    gen1Moves.loc[i] = move

# Function to extract type from link string
def extract_type(link):
    regex = r'/([^/]+)\.shtml$'
    return re.search(regex, link).group(1).capitalize()

# Define physical and special split
physical = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel"]
special = ["Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark"]

# Function to find if move is Physical, Special, or Status and adds column to dataframe
def extract_category(row):
    if row["Power"] == "0":
        return "Status"
    elif row["Type"] in physical:
        return "Physical"
    else:
        return "Special"

# Function to convert the effect rate to a number or N/A
def convert_effect_rate(rate):
    if rate == "-- %":
        return "N/A"
    else:
        regex = r'\d+'
        rate = re.search(regex, rate).group(0)
        return int(rate)
    
# Function to convert empty secondary rate to N/A
def convert_effect(effect):
    if not effect.strip():
        return "N/A"
    else:
        return effect
    
# Function to convert power to N/A, 1HKO, or not change
def convert_power(power):
    if power == "0" or power == "1":
        return "N/A"
    else:
        return power

# Function to round accuracy numbers
def round_accuracy(accuracy):
    return round(float(accuracy))

# Function to convert CritRate to number or N/A
def convert_crit_rate(rate):
    if rate.strip() == "" or rate == "-- %":
        return "N/A"
    else:
        regex = r'\d+'
        rate = re.search(regex, rate).group(0)
        return int(rate)

# Apply data cleaning functions
gen1Moves["Type"] = gen1Moves["Type"].apply(extract_type)
gen1Moves.insert(2, "Category", "")
gen1Moves["Category"] = gen1Moves.apply(extract_category, axis=1)
gen1Moves["EffectRate"] = gen1Moves["EffectRate"].apply(convert_effect_rate)
gen1Moves["Effect"] = gen1Moves["Effect"].apply(convert_effect)
gen1Moves["Power"] = gen1Moves["Power"].apply(convert_power)
gen1Moves["Accuracy"] = gen1Moves["Accuracy"].apply(round_accuracy)
gen1Moves.insert(8, "CritRate", "")
gen1Moves["CritRate"] = gen1Moves["CritRate"].apply(convert_crit_rate)

# Drop columns
gen1Moves = gen1Moves.drop(["TM"], axis=1)

# Save to CSV file
gen1Moves.to_csv("CSVS/gen1Moves.csv", index=True, index_label="Id")
    
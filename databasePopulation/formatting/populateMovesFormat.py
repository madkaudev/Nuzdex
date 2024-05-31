# Import statements
import pandas

# Ask user for what generation csv to read from
generation = input("What generation of moves do you want to read?: ")

# Read CSV
gen1Moves = pandas.read_csv("CSVs/gen" + generation + "Moves.csv", keep_default_na=False)

# Create index and add index to dataframe
dfIndex = [num for num in range(len(gen1Moves)) if True]
gen1Moves.index = dfIndex

# Open file
file = open("databasePopulation/formatting/populateGen" + generation + "Moves.txt", "w")

# Go through dataframe
index = 0
for i in range(len(gen1Moves)):
    ## Add values of dataframe to values dictionary
    values = {}
    values["Index"] = str(index)
    values["Generation"] = int(gen1Moves.loc[i, "Generation"])
    values["Name"] = str(gen1Moves.loc[i, "Name"])
    values["Type"] = str(gen1Moves.loc[i, "Type"])
    values["Category"] = str(gen1Moves.loc[i, "Category"])
    values["PP"] = int(gen1Moves.loc[i, "PP"])

    if gen1Moves.loc[i, "Power"] == "N/A":
        values["Power"] = str(gen1Moves.loc[i, "Power"])
    else:
        values["Power"] = int(gen1Moves.loc[i, "Power"])

    if gen1Moves.loc[i, "Accuracy"] == "N/A":
        values["Accuracy"] = str(gen1Moves.loc[i, "Accuracy"])
    else:
        values["Accuracy"] = int(gen1Moves.loc[i, "Accuracy"])

    values["Description"] = str(gen1Moves.loc[i, "Description"])
    values["Effect"] = str(gen1Moves.loc[i, "Effect"])

    if gen1Moves.loc[i, "EffectRate"] == "N/A":
        values["EffectRate"] = str(gen1Moves.loc[i, "EffectRate"])
    else:
        values["EffectRate"] = int(gen1Moves.loc[i, "EffectRate"])

    if gen1Moves.loc[i, "CritRate"] == "N/A":
        values["CritRate"] = str(gen1Moves.loc[i, "CritRate"])
    else:
        values["CritRate"] = int(gen1Moves.loc[i, "CritRate"])

    values["Priority"] = int(gen1Moves.loc[i, "Priority"])
    values["Target"] = str(gen1Moves.loc[i, "Target"])

    ## Create moveCreate string for each row
    moveCreateString = "moveCreate(" + values["Index"] + "," + str(values["Generation"]) + "," + "\"" + values["Name"] + "\"" + "," + "\"" + values["Type"] + "\"" + "," + "\"" + values["Category"] + "\"" + "," + str(values["PP"]) + "," 

    if values["Power"] == "N/A":
        moveCreateString += "\"" + values["Power"] + "\"" + ","
    else:
        moveCreateString += str(values["Power"]) + ","

    if values["Accuracy"] == "N/A":
        moveCreateString += "\"" + values["Accuracy"] + "\"" + ","
    else:
        moveCreateString += str(values["Accuracy"]) + ","

    moveCreateString += "\"" + values["Description"] + "\"" + "," + "\"" + values["Effect"] + "\"" +","

    if values["EffectRate"] == "N/A":
        moveCreateString += "\"" + values["EffectRate"] + "\"" + ","
    else:
        moveCreateString += str(values["EffectRate"]) + ","

    if values["CritRate"] == "N/A":
        moveCreateString += "\"" + values["CritRate"] + "\"" + ","
    else:
        moveCreateString += str(values["CritRate"]) + ","

    moveCreateString += str(values["Priority"]) + "," + "\"" + values["Target"] + "\"" + "),"
 
    file.write(moveCreateString + "\n")
    index += 1

# Close file
file.close()

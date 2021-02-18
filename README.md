# CSV-Converter-Demo

## Overview

The CSV Converter Demo is a demo version of an app I built to help a company, Trade Labels, rapidly and easily modify field names in CSV files. The company is migrating their database from Microsoft Access to Airtable, and in the process, they are changing field names. During the months-long transition, they will need to convert between their Access and Airtable names to use their various existing systems. This converter allows Trade Labels to do that in seconds rather than minutes. 

## Libraries and Technologies
This converter uses Node's File system, csvtojson, and json2csv libraries to modify and convert the file. The converter uses an Airtable base as the converter key. Finaly the client side of the app utilizes React.js.

## Use

A demo unconverted file is included in this repo, and is titled demo_data.csv. To use the converter, download this file, open the [live link](https://csv-converter-demo.herokuapp.com/), upload the file, and press convert. The file will be converted according to the Airtable base found [here](https://airtable.com/shrfWQF03aAhUnTJ9). 




["ADDED_SUGAR+"]: record.field["ADDED_SUGAR+"],
["ALLERGEN_TL"]: record.field["ALLERGEN_TL"],
["ALLERGEN_VENDOR"]: record.field["ALLERGEN_VENDOR"],
["BRAND_NAME"]: record.field["BRAND_NAME"],
["CAL_FAT"]: record.field["CAL_FAT"],
["CALCIUM+"]: record.field["CALCIUM+"],
["CALORIES+"]: record.field["CALORIES+"],
["CHOLES+"]: record.field["CHOLES+"],
["Country"]: record.field["Country"],
["DAILY_CARB+"]: record.field["DAILY_CARB+"],
["DAILY_CHOLES+"]: record.field["DAILY_CHOLES+"],
["DAILY_FAT+"]: record.field["DAILY_FAT+"],
["DAILY_FIBER+"]: record.field["DAILY_FIBER+"],
["DAILY_SATFAT+"]: record.field["DAILY_SATFAT+"],
["DAILY_SOD+"]: record.field["DAILY_SOD+"],
["DAILY_SUGAR+"]: record.field["DAILY_SUGAR+"],
["DIET_FIBER+"]: record.field["DIET_FIBER+"],
["DISTB_BY"]: record.field["DISTB_BY"],
["Distb_Pro1"]: record.field["Distb_Pro1"],
["DISTBCODE"]: record.field["DISTBCODE"],
["FSIZE"]: record.field["FSIZE"],
["ING_ONLY"]: record.field["ING_ONLY"],
["INGREDIENT"]: record.field["INGREDIENT"],
["IRON+"]: record.field["IRON+"],
["LABEL_TYPE"]: record.field["LABEL_TYPE"],
["NGMO_CERT"]: record.field["NGMO_CERT"],
["OG NGMO Cert"]: record.field["OG NGMO Cert"],
["OG_CERT"]: record.field["OG_CERT"],
["POTASS+"]: record.field["POTASS+"],
["product line 1"]: record.field["product line 1"],
["product line 2"]: record.field["product line 2"],
["product line 3"]: record.field["product line 3"],
["PRODUCT_NA"]: record.field["PRODUCT_NA"],
["PROTEIN+"]: record.field["PROTEIN+"],
["SAT_FAT+"]: record.field["SAT_FAT+"],
["SELLING_PO"]: record.field["SELLING_PO"],
["SERV_SIZE+"]: record.field["SERV_SIZE+"],
["serving size 1+"]: record.field["serving size 1+"],
["serving size 2+"]: record.field["serving size 2+"],
["SODIUM+"]: record.field["SODIUM+"],
["TF_ITEM_"]: record.field["TF_ITEM_"],
["TOTAL_CARB+"]: record.field["TOTAL_CARB+"],
["TOTAL_FAT+"]: record.field["TOTAL_FAT+"],
["TOTAL_SUGAR+"]: record.field["TOTAL_SUGAR+"],
["TRANS_FAT+"]: record.field["TRANS_FAT+"],
["VIT_D+"]: record.field["VIT_D+"],
["VITAMIN_A"]: record.field["VITAMIN_A"],
["VITAMIN_C"]: record.field["VITAMIN_C"],

QTY
PRICE
PLU_NMR
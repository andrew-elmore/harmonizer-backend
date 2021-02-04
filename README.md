# CSV-Converter-Demo

## Overview

The CSV Converter Demo is a demo version of an app I built to help a company, Trade Labels, rapidly and easily modify field names in CSV files. The company is migrating their database from Microsoft Access to Airtable, and in the process, they are changing field names. During the months-long transition, they will need to convert between their Access and Airtable names to use their various existing systems. This converter allows Trade Labels to do that in seconds rather than minutes. 

## Libraries and Technologies
This converter uses Node's File system, csvtojson, and json2csv libraries to modify and convert the file. The converter uses an Airtable base as the converter key. Finaly the client side of the app utilizes React.js.

## Use

A demo unconverted file is included in this repo, and is titled demo_data.csv. To use the converter, download this file, open the [live link](https://csv-converter-demo.herokuapp.com/), upload the file, and press convert. The file will be converted according to the Airtable base found [here](https://airtable.com/shrfWQF03aAhUnTJ9). 





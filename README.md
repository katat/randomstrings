Random-Strings
=============
This is a demo showing how to recognize the types of the strings(integer/real number/alphabet/alphanumeric), generating randomly of these strings in different types, and read/recognize the strings from the file.

###Setup###
Make sure you have installed the nodejs and npm on the machine.

Then download the dependencies by `npm install`

###Execute###
Make sure you are the repository folder and in the shell command line.

To generate a file containing the random strings, run `node src generate`. This creates a file `output.txt`

To read the random strings in the `output.txt`, do the recognition and output to the screen, run `node src read`

###Unit Tests###
To run the unit tests, make sure you have the mocha `npm install -g mocha`

Then run `grunt` at the repository folder, it should then outputs the test results.

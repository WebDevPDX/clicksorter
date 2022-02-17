## Clicksorter Assignment

This is a assignment solution for click sorting

### Execution

`npm run solution`

This will start the algorithm, load the `clicks.json` file, sort it and write the result subset into the `resultset.json` file

### Testing

`npm run test`

This will run the unit tests created for the assignment.

### Known Weaknesses

The provided clicks.json file was sorted by timestamp. The current algorithm relies on this sorting, especially around returning the first, most expensive click in a period. If two clicks are tied for the same amount it will return the first click in the provided file (which, sorted by timestamp won't make a difference).

Currently there is no check in place to verify that the `clicks.json` file is present. As node is throwing an execution error if that is the case, I did not feel the need to implement my own verification. Similarly if the file is empty, node will throw an error. If the file contains at least an empty array, an empty array will be returned.

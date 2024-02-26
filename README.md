# python-pretty-data-structures README

Tool to prettify a python data structure:
- [x] list of objects
- [x] object
- [x] touple

## Features

Intended:
- Takes single quotes into account. Should have option to keep single quotes.
- Should work in Python file, too. (Might need more complex parser).


## TODO (Roadmap):
### Dev:
#### Corner cases:
- [ ] proper documentation
- [ ] error handling
    - [ ] handle  errors where there's nothing in the document
    - [ ] handle other possible errors
- [ ] handle cases where there's a mix between single and double quotes
    - [ ] handle escaping double quotes between single quotes
- [ ] settings:
    - [x] indentation setting
    - [x] convert to json
    - [ ] max line depth - no need for this
 - [x] use custom parser in python
   - [ ] run with `cat samples/touple.txt | python src/parsers/parse_to_ast.py --indent=4`
 - [ ] connect with TS and test in UI

#### Nice do have:
- [ ] work on a selection inside a python file
- [ ] identify only the data structure
- [ ] right click (context menu) action on a line
- [ ] tests

### Publishing
- [ ] To be completed

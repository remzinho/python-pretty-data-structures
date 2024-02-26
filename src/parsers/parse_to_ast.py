import ast
import sys
import json
import argparse
from pprint import pp
from customprettyprint import pprint


parser = argparse.ArgumentParser()
parser.add_argument("--indent", default=4, type=int,  help="Indentation on each level in number of space chars.")
args = parser.parse_args()

def ast_to_dict(node):
    if not isinstance(node, ast.AST):
        return node
    result = {'_type': node.__class__.__name__}
    for field in node._fields:
        value = getattr(node, field)
        if isinstance(value, list):
            result[field] = [ast_to_dict(x) for x in value]
        else:
            result[field] = ast_to_dict(value)
    return result

source_code = sys.stdin.read()

try:
    result = json.loads(source_code)
except json.JSONDecodeError:
    parsed_ast = ast.parse(source_code)
    result = ast.literal_eval(source_code)

## Debugging via comparison
## TODO: move comparison to ipynb
# print("--pretty print standard:")
# pp(result, compact=False)

# print("--json dumps:")
# print(json.dumps(
#     result,
#     sort_keys=True,
#     indent=4,
#     separators=(',', ': ')
# ))

# print('--custom pprint')
pprint(result,indent_size=args.indent)

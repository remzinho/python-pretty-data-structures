#!/usr/bin/env python3
from functools import partial

def _pprint_dict(o, depth, indent_size, end):
    print("{")
    for k, v in sorted(o.items()):
        pprint(k, depth + 1, indent_size, end=": ")
        pprint(v, depth + 1, indent_size, indent=False, end=",\n")
    print(" " * depth * indent_size + "}", end=end)

def _pprint_sequence(o, depth, indent_size, end, delim):
    print(delim[0])
    for v in o:
        pprint(v, depth + 1, indent_size, end=",\n")
    print("  " * depth * indent_size + delim[1], end=end)

def _pprint_list(o, depth, indent_size, end):
    _pprint_sequence(o, depth, indent_size, end, "[]")

def _pprint_tuple(o, depth, indent_size, end):
    _pprint_sequence(o, depth, indent_size, end, "()")

def _pprint_set(o, depth, indent_size, end):
    _pprint_sequence(o, depth, indent_size, end, "{}")

def _pprint_repr(o, depth, indent_size, end):
    print(repr(o), end=end)

def _pprint_instance(o, depth, indent_size, end):
    mod = "" if o.__class__.__module__ == "__main__" else (o.__class__.__module__ + ".")
    print(mod + o.__class__.__name__, end=" ")
    pprint(o.__dict__, depth, indent_size, indent=False, end=end)

PPRINT_FUNCS = {
    list: _pprint_list,
    tuple: _pprint_tuple,
    dict: _pprint_dict,
    set: _pprint_set,
    frozenset: _pprint_set,
}

def get_pprint_func(o, indent_size):
    if hasattr(o, '__pprint__'):
        return o.__pprint__
    else:
        func = PPRINT_FUNCS.get(type(o), _pprint_repr)
        return partial(func, indent_size=indent_size)

def pprint(o, depth=0, indent_size=4, *, indent=True, end="\n"):
    if indent:
        print(" " * depth * indent_size, end="")
    func = get_pprint_func(o, indent_size)
    func(o, depth, end=end)

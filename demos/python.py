# To add an item to the top of the stack, use append()
class stack(list):
    ''' push() to add an item to the top of the stack '''
    push = list.append


# non-recursive quicksort
def quicksort(items):
    nItems = len(items)
    if nItems < 2:
        return items
    todo = stack([(0, nItems - 1)])
    while todo:
        elem_idx, pivot_idx = low, high = todo.pop()
        elem = items[elem_idx]
        pivot = items[pivot_idx]
        while pivot_idx > elem_idx:
            if elem > pivot:
                items[pivot_idx] = elem
                pivot_idx -= 1
                items[elem_idx] = elem = items[pivot_idx]
            else:
                elem_idx += 1
                elem = items[elem_idx]
        items[pivot_idx] = pivot

        lsize = pivot_idx - low
        hsize = high - pivot_idx
        if lsize <= hsize:
            if 1 < lsize:
                todo.push((pivot_idx + 1, high))
                todo.push((low, pivot_idx - 1))
        else:
            todo.push((low, pivot_idx - 1))
        if 1 < hsize:
            todo.push((pivot_idx + 1, high))
    return items


if __name__ == '__main__':
# run the sorting function
    from random import randint
    for _ in range(99):
        test = [str(randint(0, 100)) for _ in range(randint(15, 99))]
        assert (quicksort(test[:]) == sorted(test)), test
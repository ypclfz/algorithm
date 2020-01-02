import React from 'react'
import {Switch, Route} from 'react-router-dom'
import StraightInsertionSort from '../page/StraightInsertionSort'
import HeapSort from '../page/HeapSort'
import QuickSort from '../page/QuickSort'
import MergeSort from '../page/MergeSort'
import BinarySort from '../page/BinarySort'
import StraightSelectSort from '../page/StraightSelectSort'
import BubbleSort from '../page/BubbleSort'
import RadixSort from '../page/RadixSort'
import CountingSort from '../page/CountingSort'
import Queue from '../page/Queue'
import Stack from '../page/Stack'
// import LinkedList from '../page/LinkedList'

class Routes extends React.Component {
  render () {
    // <Route path="/linked_list" component={LinkedList} />
    return (
      <Switch>
        <Route path="/straight_insertion_sort" component={StraightInsertionSort} />
        <Route path="/heap_sort" component={HeapSort} />
        <Route path="/quick_sort" component={QuickSort} />
        <Route path="/merge_sort" component={MergeSort} />
        <Route path="/binary_sort" component={BinarySort} />
        <Route path="/straight_select_sort" component={StraightSelectSort} />
        <Route path="/bubble_sort" component={BubbleSort} />
        <Route path="/radix_sort" component={RadixSort} />
        <Route path="/counting_sort" component={CountingSort} />
        <Route path="/queue" component={Queue} />
        <Route path="/stack" component={Stack} />
        
      </Switch>
    )
  }
}
export default Routes

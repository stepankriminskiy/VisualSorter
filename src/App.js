import React, { Component } from 'react';
import SortingVisualizer from './SortingVisualizer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [], // the array of bars to be sorted
      newArray: false, //to disrupt current sorting if new array is pressed
      selectedAlgorithm: 'Bubble Sort', // default algorithm
      numberOfBars: 50, // default number of bars
      sortingSpeed: 50, // default sorting speed

    };
  }
  
  //generate a new random array of bars
  generateRandomArray = () => {
    
    const newArray = [];
    const { numberOfBars } = this.state;
    for (let i = 0; i < numberOfBars; i++) {
      // create objects with 'value' and 'backgroundColor' properties
      newArray.push({
        val: Math.floor(Math.random() * 300) + 1, // random values between 1 and 300
        backgroundColor: 'blue', // default background color
      });
    }
    this.setState({ array: newArray});
    this.setState({ newArray: true});
  };

  // handler for the slider input for number of bars
  handleBarSliderChange = (event) => {
    this.setState({ numberOfBars: parseInt(event.target.value) });
  };

  // handler for the slider input for sorting speed
  handleSpeedSliderChange = (event) => {
    this.setState({ sortingSpeed: parseInt(event.target.value) });
  };

  handleAlgorithmChange = (algorithm) => {
    this.setState({ selectedAlgorithm: algorithm });
  };
  delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  bubbleSort = async () => {
    const { array } = this.state;
    const n = array.length;
  
    //copy of the array
    const newArray = [...array];
  
    if (this.state.newArray) {
      this.setState({newArray: false});
      return;
    }
    for (let i = 0; i < n - 1; i++) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      for (let j = 0; j < n - i - 1; j++) {
        if (this.state.newArray) {
          this.setState({newArray: false});
          return;
        }
        newArray[j].backgroundColor = 'yellow';
        newArray[j + 1].backgroundColor = 'yellow';
        this.setState({ array: newArray});
        await this.delay(400 - this.state.sortingSpeed); 
        // compare adjacent values
        if (newArray[j].val > newArray[j + 1].val) {


          // swap them if wrong order
          const temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;

          
          newArray[j].backgroundColor = 'red';
          newArray[j + 1].backgroundColor = 'green'; 
  
          // update array for visualization and add delay based on speed
          this.setState({ array: newArray});
          await this.delay(400 - this.state.sortingSpeed); // delay for visualization
        }

        newArray[j].backgroundColor = 'blue';
        newArray[j + 1].backgroundColor = 'blue';
      }
      // set the bar as sorted
      newArray[n - i - 1].backgroundColor = 'purple';
      // reset all non-sorted bars to blue after loop around
      for (let i = 0; i < n; i++) {
        if (newArray[i].backgroundColor !== 'purple') {
          newArray[i].backgroundColor = 'blue';
          }
        }
    }
    /*set the last bars to sorted at the end of the algorithm*/
    for (let i = 0; i < n; i++){
      newArray[i].backgroundColor = 'purple';
    }
    this.setState({ array: newArray });
  };
  
  
  insertionSort = async () => {
    const { array } = this.state;
    const n = array.length;
    
    const newArray = [...array];
    for (let i = 1; i < n; i++) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      let currentElement = newArray[i];
      let j = i - 1;
      
      newArray[i].backgroundColor = 'red';
      // compare the current element with elements to its left and move them to the right
      while (j >= 0 && newArray[j].val > currentElement.val) {
        if (this.state.newArray) {
          this.setState({newArray: false});
          return;
        }
        
        newArray[j + 1] = newArray[j];
        
        
        newArray[j].backgroundColor = 'yellow';
        this.setState({ array: [...newArray] });
        await this.delay(400 - this.state.sortingSpeed);
        newArray[j].backgroundColor = 'blue';

        j--;
        
      }

      newArray[j + 1] = currentElement;
      
      /*delay to show the spot moved to*/
      this.setState({ array: [...newArray] });
      await this.delay(400 - this.state.sortingSpeed);
      /*reset it back to blue once inserted*/
      newArray[j+1].backgroundColor = 'blue';
      this.setState({ array: [...newArray] });

    }
    for (let i = 0; i < n; i++){
      newArray[i].backgroundColor = 'purple';
    }
    this.setState({ array: newArray });

  }
  selectionSort = async () => {
    if (this.state.newArray) {
      this.setState({newArray: false});
      return;
    }
    const { array } = this.state;
    const n = array.length;
  
    const newArray = [...array];
  
    for (let i = 0; i < n - 1; i++) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      let minIndex = i;
  
      for (let j = i + 1; j < n; j++) {
        if (this.state.newArray) {
          this.setState({newArray: false});
          return;
        }
        newArray[j].backgroundColor = 'yellow';
        this.setState({ array: [...newArray] });
        await this.delay(400 - this.state.sortingSpeed);
        newArray[j].backgroundColor = 'blue';
        if (newArray[j].val < newArray[minIndex].val) {
          newArray[minIndex].backgroundColor = 'blue';
          minIndex = j;
          newArray[j].backgroundColor = 'red';
        }
      }
  
      // swap with found minimum
      const temp = newArray[minIndex];
      newArray[minIndex] = newArray[i];
      newArray[i] = temp;
  
      // highlight bars
      newArray[minIndex].backgroundColor = 'yellow';
      newArray[i].backgroundColor = 'red';
  
      // visualization delay
      this.setState({ array: [...newArray] });
      await this.delay(400 - this.state.sortingSpeed);
  
      // reset color to blue after swap, and swapped to purple because it's sorted
      newArray[minIndex].backgroundColor = 'blue';
      newArray[i].backgroundColor = 'purple';
    }
  
    // set the entire array to purple when the sorting is complete
    for (let k = 0; k < n; k++) {
      newArray[k].backgroundColor = 'purple';
    }
    this.setState({ array: [...newArray] });
  }

  /* code gotten and modified from https://www.geeksforgeeks.org/merge-sort/ */
  mergeSort = async () => {
    const { array } = this.state;

    // copy of array
    const newArray = [...array];
    async function merge(left, middle, right) {
      const n1 = middle - left + 1;
      const n2 = right - middle;

      const leftArray = newArray.slice(left, left + n1);
      const rightArray = newArray.slice(middle + 1, middle + 1 + n2);

      let i = 0;
      let j = 0;
      let k = left;

      while (i < n1 && j < n2) {
        if (this.state.newArray) {
          this.setState({newArray: false});
          return;
        }
        newArray[left + i].backgroundColor = 'yellow';
        newArray[middle + 1 + j].backgroundColor = 'yellow';
        this.setState({ array: [...newArray] });
        await this.delay(400 - this.state.sortingSpeed);
  
        if (leftArray[i].val <= rightArray[j].val) {
          newArray[k] = leftArray[i];
          i++;
        } else {
          newArray[k] = rightArray[j];
          j++;
        }
        k++;
      }
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
    while (i < n1) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      newArray[k] = leftArray[i];
      i++;
      k++;
    }
    while (j < n2) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      newArray[k] = rightArray[j];
      j++;
      k++;
    }

    for (let x = left; x <= right; x++) {
      if (this.state.newArray) {
        this.setState({newArray: false});
        return;
      }
      newArray[x].backgroundColor = 'blue';
    }
  }
  async function mergeSortHelper(left, right) {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSortHelper.call(this, left, middle);
      await mergeSortHelper.call(this, middle + 1, right);
      await merge.call(this, left, middle, right);
    }
  }
  await mergeSortHelper.call(this, 0, newArray.length - 1);

  for (let k = 0; k < newArray.length; k++) {
    newArray[k].backgroundColor = 'purple';
  }

  this.setState({ array: [...newArray] });

};
  
  // call corresponding function when sort is clicked based off selection
  startSorting = async () => {
    this.setState({newArray: false});
    switch(this.state.selectedAlgorithm){
      case 'Bubble Sort':
        await this.bubbleSort();
        break;
      case 'Insertion Sort':
        await this.insertionSort();
        break;
      case 'Selection Sort':
        await this.selectionSort();
        break;
      case 'Merge Sort':
        await this.mergeSort();
        break;
      default:
        break;
    }
    
  };  

  

  render() {
    const { array, numberOfBars, sortingSpeed } = this.state;

    return (
      
      <div>
      <div>
        {/* slider for number of bars */}
        <label>Number of Bars: {numberOfBars}</label>
        <input
          type="range"
          min="10"
          max="150"
          value={numberOfBars}
          onChange={this.handleBarSliderChange}
        />
      </div>
      <div>
        {/* slider for sorting speed */}
        <label>Sorting Speed : {sortingSpeed}</label>
        <input
          type="range"
          min="1"
          max="400"
          value={sortingSpeed}
          onChange={this.handleSpeedSliderChange}
        />
      </div>
      <button onClick={this.generateRandomArray}>New Array</button>
      
      {/* selector for sorting algorithm */}
      <div className="algorithm-selector">
        <span>Select Sorting Algorithm:</span>
        <select
          value={this.selectedAlgorithm}
          onChange={(e) => this.handleAlgorithmChange(e.target.value)}
        >
          <option value="Bubble Sort">Bubble Sort</option>
          <option value="Insertion Sort">Insertion Sort</option>
          <option value="Merge Sort">Merge Sort</option>
          <option value="Selection Sort">Selection Sort</option>
          {/* add options for other sorting algorithms */}
        </select>
      </div>

      {/* button to start the sorting process */}
      <button onClick={this.startSorting}>Start Sorting</button>

      <SortingVisualizer array={array} /> {/*pass array to SortingVisualizer to display array*/}
    </div>
      
    );
  }
}

export default App;

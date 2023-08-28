import React, { Component } from 'react';

class SortingVisualizer extends Component {
  render() {
    const { array } = this.props;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value.val}px`,
              backgroundColor: value.backgroundColor || 'blue', // set to default blue if none selected
            }}
          ></div>
        ))}
      </div>
    );
  }
}

export default SortingVisualizer;



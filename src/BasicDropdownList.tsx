import React from "react";
// import Downshift, {
//   UseDownshiftProps,
//   UseDownshiftState,
//   UseDownshiftGetItemPropsOptions,
// } from "downshift";

import Downshift from "downshift";

// interface Item {
//   value: string;
// }

interface Item {
  value: string;
}

interface BasicDownshiftProps {
  items: Item[];
  labelText: string;
  handlethechange: (selection: Item | null) => void;
}

const BasicDownshift: React.FC<BasicDownshiftProps> = ({
  items,
  labelText,
  handlethechange,
}) => {
  // let items = props.myItems;
  // let items = myItems;

  return (
    <Downshift<Item>
      onChange={handlethechange}
      itemToString={(item) => (item ? item.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <label {...getLabelProps()}>{labelText}</label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(
                    (item) => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : "white",
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};

export default BasicDownshift;

// To render this component in your application:
// import BasicDownshift from './BasicDownshift';
//
// ReactDOM.render(<BasicDownshift />, document.getElementById('root'));

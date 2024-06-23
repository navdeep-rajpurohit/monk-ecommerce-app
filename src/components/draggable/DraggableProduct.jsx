import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ROW: "row",
};

const DraggableProduct = ({ index, id, moveRow, children }) => {
  const [, ref] = useDrag({
    type: ItemTypes.ROW,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ROW,
    hover(item) {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  return <tr ref={(node) => ref(drop(node))}>{children}</tr>;
};

export default DraggableProduct;

import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ROW: "row",
};

const DraggableProduct = ({ index, moveRow, children }) => {
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

  return (
    <div ref={(node) => ref(drop(node))}>
      <div>{children}</div>
    </div>
  );
};

export default DraggableProduct;

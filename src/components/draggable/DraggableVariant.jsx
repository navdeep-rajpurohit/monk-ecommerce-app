import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  ROW: "row",
  VARIANT: "variant",
};

const DraggableVariant = ({
  variant,
  index,
  moveVariant,
  productId,
  children,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.VARIANT,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveVariant(dragIndex, hoverIndex, productId);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.VARIANT,
    item: { type: ItemTypes.VARIANT, id: variant.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return <tr ref={ref}>{children}</tr>;
};

export default DraggableVariant;

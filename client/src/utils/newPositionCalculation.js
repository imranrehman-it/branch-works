const calculateNewPosition = (parentX, parentY, numChildren, index) => {
    const cardWidth = 250;
    const numberChildren = numChildren;
    
    const newX = parentX - (cardWidth * numberChildren / 2) + (index * cardWidth);
    const newY = parentY + 500;
    return {x: newX, y: newY};
};

module.exports = calculateNewPosition;
export const noop = () => null

export const generateLabelPosition = (startPos, endPos) => {
  let centerX = 0,
    centerY = 0
  let startNodeHeight = !!startPos.nodeHeight ? startPos.nodeHeight : 0

  if (startPos.portType === "top" && endPos.portType === "top") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y < endPos.y ? startPos.y - 55 : endPos.y - 55

    return { centerX, centerY }
  }

  if (startPos.portType === "top" && endPos.portType === "right") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y - 55
    if (centerX <= startPos.x - 65 && startPos.y >= endPos.y + 60) {
      centerX = startPos.x - 65
    }
    if (centerX <= startPos.x - 65 && startPos.y < endPos.y + 60) {
      centerX =
        startPos.x - 65 + (startPos.y - endPos.y - 60) >
        (startPos.x + endPos.x) / 2 - 50
          ? startPos.x - 65 + (startPos.y - endPos.y - 60)
          : (startPos.x + endPos.x) / 2 - 50
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "top" && endPos.portType === "bottom") {
    centerX = startPos.x + 40
    centerY = startPos.y - 55
    if (centerX >= endPos.x - 60) {
      centerX = endPos.x - 60
    }
    if (startPos.x >= endPos.x) {
      centerX = startPos.x - 60
    }
    if (startPos.x >= endPos.x && centerY <= endPos.y + 60) {
      centerX =
        startPos.x - 60 - (endPos.y - centerY + 60) > startPos.x - 140
          ? startPos.x - 60 - (endPos.y - centerY + 60)
          : startPos.x - 140
    }
    return { centerX, centerY }
  }

  if (startPos.portType === "top" && endPos.portType === "left") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y - 55 < endPos.y - 25 ? startPos.y - 55 : endPos.y - 25

    if (centerX >= endPos.x - 160 && startPos.y - 30 > endPos.y) {
      centerX =
        endPos.x - 160 > startPos.x - 60 ? endPos.x - 160 : startPos.x - 60
    }
    if (startPos.x >= centerX && startPos.y - 30 > endPos.y) {
      centerY =
        endPos.y -
          25 +
          ((startPos.x - centerX) * (startPos.y - endPos.y + 25)) / 60 >
        startPos.y - 55
          ? startPos.y - 55
          : endPos.y -
            25 +
            ((startPos.x - centerX) * (startPos.y - endPos.y + 25)) / 60
    }
    if (centerY === startPos.y - 55 && centerX > endPos.x) {
      centerX =
        startPos.x - 60 - (centerX - endPos.x) <
        (startPos.x + endPos.x) / 2 - 50
          ? (startPos.x + endPos.x) / 2 - 50
          : startPos.x - 60 - (centerX - endPos.x)
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "right" && endPos.portType === "top") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y - 25 < endPos.y - 55 ? startPos.y - 25 : endPos.y - 55

    if (startPos.y < endPos.y - 30 && centerX + 120 >= endPos.x) {
      centerY =
        startPos.y -
          25 +
          ((startPos.x - endPos.x + 150) * (endPos.y - startPos.y - 30)) / 120 >
        endPos.y - 55
          ? endPos.y - 55
          : startPos.y -
            25 +
            ((startPos.x - endPos.x + 150) * (endPos.y - startPos.y - 30)) / 120
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "right" && endPos.portType === "right") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y - 25
    if (centerX < startPos.x + 35) {
      centerX = startPos.x + 35
    }
    if (centerX >= endPos.x + 30 && startPos.y < endPos.y) {
      centerY =
        startPos.y + (startPos.x - endPos.x) < (startPos.y + endPos.y) / 2
          ? startPos.y + (startPos.x - endPos.x) - 20
          : (startPos.y + endPos.y) / 2
    }
    if (centerX >= endPos.x + 30 && startPos.y >= endPos.y) {
      centerY =
        startPos.y - (startPos.x - endPos.x) - 30 > (startPos.y + endPos.y) / 2
          ? startPos.y - (startPos.x - endPos.x) - 30
          : (startPos.y + endPos.y) / 2
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "right" && endPos.portType === "bottom") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y + 5

    if (startPos.y > endPos.y + 30 && centerX + 160 >= endPos.x) {
      centerX =
        endPos.x - 160 < startPos.x - 30 ? startPos.x - 30 : endPos.x - 160
    }

    if (startPos.y > endPos.y + 30 && centerX <= startPos.x) {
      centerY =
        endPos.y +
        5 +
        ((startPos.x - centerX) * (startPos.y - endPos.y - 30)) / 60
    }
    return { centerX, centerY }
  }

  if (startPos.portType === "right" && endPos.portType === "left") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y - 25

    if (centerX + 160 >= endPos.x) {
      centerX = endPos.x - 160
    }
    if (centerX < startPos.x + 30 && startPos.y <= endPos.y) {
      centerY =
        endPos.y -
          25 -
          ((startPos.x + 30 - centerX) *
            (endPos.y - startPos.y - startNodeHeight)) /
            60 >
        startPos.y + startNodeHeight - 25
          ? endPos.y -
            25 -
            ((startPos.x + 30 - centerX) *
              (endPos.y - startPos.y - startNodeHeight)) /
              60
          : startPos.y + startNodeHeight - 25
      centerX = centerX < startPos.x - 30 ? startPos.x - 30 : centerX
      centerY = centerY >= endPos.y - 25 ? endPos.y - 25 : centerY
    }
    if (centerX < startPos.x + 30 && startPos.y > endPos.y) {
      centerY =
        endPos.y -
          25 +
          ((startPos.x + 30 - centerX) *
            (startPos.y + startNodeHeight - endPos.y)) /
            60 <
        startPos.y - startNodeHeight - 25
          ? endPos.y -
            25 +
            ((startPos.x + 30 - centerX) *
              (startPos.y + startNodeHeight - endPos.y)) /
              60
          : startPos.y - startNodeHeight - 25

      centerX = centerX < startPos.x - 30 ? startPos.x - 30 : centerX
      centerY = centerY <= endPos.y - 25 ? endPos.y - 25 : centerY
    }
    if (startPos.x >= endPos.x - 60 && startPos.y > endPos.y) {
      centerY = startPos.y - startNodeHeight - 25
    }
    if (startPos.x >= endPos.x - 60 && startPos.y < endPos.y) {
      centerY = startPos.y + startNodeHeight - 25
    }
    if (startPos.x + 30 - 120 >= endPos.x - 30 && centerX >= endPos.x - 30) {
      centerX =
        endPos.x - 30 >= (startPos.x + endPos.x) / 2
          ? endPos.x - 30
          : (startPos.x + endPos.x) / 2
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "bottom" && endPos.portType === "top") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y - 55

    return { centerX, centerY }
  }

  if (startPos.portType === "bottom" && endPos.portType === "right") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y + 5

    return { centerX, centerY }
  }

  if (startPos.portType === "bottom" && endPos.portType === "bottom") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y > endPos.y ? startPos.y + 5 : endPos.y + 5

    return { centerX, centerY }
  }

  if (startPos.portType === "bottom" && endPos.portType === "left") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y + 5

    return { centerX, centerY }
  }

  if (startPos.portType === "left" && endPos.portType === "top") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y - 55

    if (startPos.x > endPos.x && startPos.y < endPos.y - 30) {
      centerY =
        endPos.y - 55 - (startPos.x - endPos.x) <= startPos.y - 25
          ? startPos.y - 25
          : endPos.y - 55 - (startPos.x - endPos.x)
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "left" && endPos.portType === "right") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = startPos.y - startNodeHeight - 25

    if (startPos.x > endPos.x) {
      centerY =
        startPos.y - startNodeHeight - 25 + (startPos.x - endPos.x) * 1.5 <
        startPos.y - 25
          ? startPos.y - startNodeHeight - 25 + (startPos.x - endPos.x) * 1.5
          : startPos.y - 25
      centerY = centerY > endPos.y - 25 ? endPos.y - 25 : centerY
    }
    if (centerX + 120 <= startPos.x - 30) {
      centerY =
        endPos.y - 25 - (centerX + 120 - startPos.x + 30) < startPos.y - 25
          ? endPos.y - 25 - (centerX + 120 - startPos.x + 30)
          : startPos.y - 25
    }
    if (startPos.y > endPos.y && startPos.x > endPos.x) {
      centerY = endPos.y - 25
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "left" && endPos.portType === "bottom") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y + 5

    if (startPos.y >= endPos.y + 30 && startPos.x - 30 >= endPos.x) {
      centerY = startPos.y - 25
    }

    return { centerX, centerY }
  }

  if (startPos.portType === "left" && endPos.portType === "left") {
    centerX = (startPos.x + endPos.x) / 2 - 50
    centerY = endPos.y - 25

    if (centerX >= endPos.x - 35 - 120) {
      centerX = endPos.x - 35 - 120
    }
    if (centerX <= startPos.x - 30 && startPos.y <= endPos.y) {
      centerY =
        endPos.y - 25 - (startPos.x - 30 - centerX) >
        (startPos.y + endPos.y) / 2
          ? endPos.y - 25 - (startPos.x - 30 - centerX)
          : (startPos.y + endPos.y) / 2
    }
    if (centerX <= startPos.x - 30 && startPos.y > endPos.y) {
      centerY =
        endPos.y - 25 + (startPos.x - 30 - centerX) <
        (startPos.y + endPos.y) / 2
          ? endPos.y - 25 + (startPos.x - 30 - centerX)
          : (startPos.y + endPos.y) / 2
    }

    return { centerX, centerY }
  }

  return { centerX, centerY }
}

import * as React from "react"
import { noop } from "../../utils"
import { LinkDefault } from "./Link.default"
import { getLinkPosition } from "./utils"

export const LinkWrapper = React.memo(
  ({
    config,
    Component = LinkDefault,
    link,
    onLinkMouseEnter,
    onLinkMouseLeave,
    onLinkClick,
    onLabelDoubleClick,
    isAllowAddLinkLabel,
    isSelected,
    isHovered,
    fromNode,
    toNode
  }) => {
    const startPos = getLinkPosition(fromNode, link.from.portId)

    const endPos =
      toNode && link.to.portId
        ? getLinkPosition(toNode, link.to.portId)
        : link.to.position

    // Don't render the link yet if there is no end pos
    // This will occur if the link was just created
    if (!endPos) {
      return null
    }

    return (
      <Component
        config={config}
        link={link}
        startPos={startPos}
        endPos={endPos}
        onLinkMouseEnter={config.readonly ? noop : onLinkMouseEnter}
        onLinkMouseLeave={config.readonly ? noop : onLinkMouseLeave}
        onLabelDoubleClick={onLabelDoubleClick}
        onLinkClick={config.readonly ? noop : onLinkClick}
        isSelected={isSelected}
        isHovered={isHovered}
        isAllowAddLinkLabel={isAllowAddLinkLabel}
      />
    )
  }
)

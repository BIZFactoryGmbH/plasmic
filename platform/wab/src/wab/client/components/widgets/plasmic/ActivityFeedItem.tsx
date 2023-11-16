// This is a skeleton starter React component generated by Plasmic.
// Feel free to edit as you see fit.
import React, { ReactNode } from "react";
import { AvatarGallery } from "../../studio/Avatar";
import {
  PlasmicActivityFeedItem__VariantsArgs,
  PlasmicActivityFeedItem,
} from "./PlasmicActivityFeedItem";

export interface ActivityFeedItemData {
  id: string;
  sortIndex: number;
  userId?: string | null;
  state?: PlasmicActivityFeedItem__VariantsArgs["state"];
  title?: ReactNode;
  subtitle?: ReactNode;
  userPic?: ReactNode;
}

interface ActivityFeedItemProps {
  item: ActivityFeedItemData;
  selected: boolean;
  onClick?: () => void;
  // className prop is required for positioning instances of
  // this Component
  className?: string;
  children?: never;
}

function ActivityFeedItem(props: ActivityFeedItemProps) {
  const { state, title, subtitle, userPic } = props.item;
  return (
    <PlasmicActivityFeedItem
      variants={{
        state,
        selected: props.selected ? "selected" : undefined,
      }}
      args={{
        title,
        subtitle,
        userPic,
      }}
      root={{
        onClick: props.onClick,
        // className prop needs to be piped to the root element of this component
        className: props.className,
      }}
    />
  );
}

export default ActivityFeedItem as React.FunctionComponent<ActivityFeedItemProps>;
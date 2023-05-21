import React from "react";
import HomeIcon from "../icons/HomeIcon";
import TrendingIcon from "../icons/TrendingIcon";
import SubscriptionIcon from "../icons/SubscriptionIcon";

const SideBar = () => {
  return (
    <div className="col-span-1 bg-yt-nav h-screen m-8">
      <div className="divide-y divide-yt-icon">
        <ul className="sm:pb-8">
          <ListItem title="Home" link="/">
            <HomeIcon />
          </ListItem>
          <ListItem title="Trending" link="/trending">
            <TrendingIcon />
          </ListItem>
          <ListItem title="Subscriptions" link="/subscriptions">
            <SubscriptionIcon />
          </ListItem>
        </ul>
        <ul className="sm:pt-8">
          <ListItem title="Home" link="/">
            <HomeIcon />
          </ListItem>
          <ListItem title="Trending" link="/trending">
            <TrendingIcon />
          </ListItem>
          <ListItem title="Subscriptions" link="/subscriptions">
            <SubscriptionIcon />
          </ListItem>
        </ul>
      </div>
    </div>
  );
};

const ListItem = (props) => {
  return (
    <li className="flex flex-row items-center gap-6 hover:bg-yt-hoverColor p-2 cursor-pointer">
      {props.children}
      <a href={props.link} className="text-white mx-2 sm:mx-8 px-2 text-medium">
        {props.title}
      </a>
    </li>
  );
};

export default SideBar;

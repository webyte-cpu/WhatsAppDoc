import { Icon } from "@ui-kitten/components";
import React from "react";

const HomeIcon = (props) => <Icon {...props} name="home" />;
const LogoutIcon = (props) => <Icon {...props} name="log-out-outline" />;
const ProfileIcon = (props) => <Icon {...props} name='person' />;
const Request = (props) => <Icon {...props} name='people-outline' />;

const Icons = {
  HOME: HomeIcon,
  LOGOUT: LogoutIcon,
  PROFILE: ProfileIcon,
  REQUEST: Request,  
}

export default Icons;
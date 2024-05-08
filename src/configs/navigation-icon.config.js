import React from 'react'
import { FaNetworkWired, FaCarBattery } from 'react-icons/fa6'
import { TbBatteryAutomotive, TbUserCircle, TbSettings, TbHome, TbHierarchy2, TbHierarchy3 } from "react-icons/tb";
import { LiaCarBatterySolid } from "react-icons/lia";


const navigationIcon = {
    home: <TbHome />,
    battery: <TbBatteryAutomotive />,
    company: <TbHierarchy3 />,
    users: <TbUserCircle />,
    settings: <TbSettings />
}

export default navigationIcon

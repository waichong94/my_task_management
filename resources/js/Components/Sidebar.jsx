import { useState } from "react";
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Sidebar({ links, menus }) {
    const [open, setOpen] = useState(true);
    const [active, setActive] = useState(route().current());

    return (
        <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20"
          } bg-dark-purple p-5 pt-8 relative duration-300`}
        >
          <img
            src="/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <Link href="/">
            <div className="flex gap-x-4 items-center">
              <div className="flex">
                  <div className="shrink-0 flex items-center">
                    <ApplicationLogo width={`${!open ? "30" : ""}`} />
                  </div>
              </div>
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${
                  !open && "scale-0"
                }`}
              >
                Oxyminds
              </h1>
            </div>
          </Link>
          <ul className="pt-6">
            {menus.map((Menu, index) => (
              <Link href={route(Menu.route)} key={index}>
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                    JSON.parse(Menu.route_group).some((route) => {
                      return route === active;
                    }) && "bg-light-white"
                  } `}
                >
                  <FontAwesomeIcon icon={Menu.icon} />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                          {Menu.name}
                      
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
}
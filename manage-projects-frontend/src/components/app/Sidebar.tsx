import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { IoAddSharp, IoClose, IoEllipsisVertical, IoLogOut, IoMenu, IoSettings } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { userAtom } from '../../states/user.atom';
import { getYourProfile, isAuthenticated, logout } from '../../services/UserService';

interface SidebarOption {
  text: string;
  icon: IconType;
  route: string;
}

export const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom)
  const location = useLocation();
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    if (isAuthenticated())
      handleGetProfile();
    else
      navigate("/login");
  }, [])

  const routes: SidebarOption[] = [
    { text: 'Dashboard', icon: IoAddSharp, route: '/app' },
  ]
  const options: SidebarOption[] = [
    { text: 'Settings', icon: IoSettings, route: '/settings' },
    { text: 'Log out', icon: IoLogOut, route: '/logout' }
  ]

  const getAvatarUrl = (fullName: string | undefined) => {
    if (!fullName) return "https://ui-avatars.com/api/?name=User&background=random";
    const encodedName = encodeURIComponent(fullName);
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
  };

  const handleGetProfile = async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const token = localStorage.getItem("token");
      const response = (await getYourProfile(token!));

      setUser({
        id: response.ourUser.id,
        name: response.ourUser.name,
        fullName: response.ourUser.fullName,
        email: response.ourUser.email
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setUser(null);
    await logout();
    navigate("/login");
  }

  const optionHandlers: Record<string, () => void> = {
    'Log out': handleLogout,
  };

  return <aside className="h-screen">
    <nav className="h-full flex flex-col bg-white border-r border-neutral-300 shadow-sm">
      <div className="p-4 pb-2 flex justify-between items-center">
        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
          {expanded ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      <ul className='flex-1 p-2'>
        {routes.map(({ text, icon: Icon, route }) => {
          const isActive = location.pathname.includes(route)

          return <li key={text} className={`min-h-[48px] relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            <Icon size={24} />
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

            {!expanded && (
              <div className={`text-nowrap absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                {text}
              </div>
            )}
          </li>
        })}
        <hr className='my-5' />
        {options.map(({ text, icon: Icon, route }) => {
          const isActive = location.pathname.includes(route)

          return <li key={text} onClick={optionHandlers[text]} className={`min-h-[48px] relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
            <Icon size={24} />
            <span className={`text-nowrap overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>

            {!expanded && (
              <div className={`text-nowrap absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                {text}
              </div>
            )}
          </li>
        })}
      </ul>

      <div className="border-t border-neutral-300 flex p-3">
        <img
          src={getAvatarUrl(user?.fullName)}
          alt={`${user?.fullName} avatar`}
          className="w-10 h-10 rounded-md"
        />
        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
          <div className="leading-4">
            <h4 className="font-semibold">{user?.fullName}</h4>
            <span className="text-xs text-gray-600">{user?.email}</span>
          </div>
          <IoEllipsisVertical />
        </div>
      </div>
    </nav>
  </aside>
}

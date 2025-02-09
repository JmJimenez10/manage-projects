import LogoIcon from '../../assets/icons/Logo'
import { GeneralLink } from '../common/GeneralLink'

export const NavHeader = () => {
    return (
        <div className='w-full bg-blue-950 flex justify-between items-center p-4 px-40'>
            <LogoIcon className='size-20' />

            <GeneralLink path='/login' text='Login' />
        </div>
    )
}


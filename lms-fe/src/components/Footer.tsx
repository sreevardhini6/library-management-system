import logo2 from '../assets/logo2.png'
import { Button } from './Button'


export const Footer = () => {

    return <div className="flex items-center w-full p-6 bg-slate-200 border-top-2 bg-opacity-30 border-black z-50  border-t-2">
        <img src={logo2} alt="logo" width="50" />
        <h1 className='flex whitespace-nowrap font-bold' >Vishwa Vishwani</h1>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
            <Button  size="sm">
                Privacy Policy
                    </Button>  <Button  size="sm">
              Terms & conditions
                    </Button> 
        </div>
    </div>
}
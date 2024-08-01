import Link from 'next/link';
import ShoppingCartLink from '../shoppingcartlink';
import { PackageIcon } from '../icons';
import UserAvatar from './useravatar';

function Header() {
   return (
      <header className="flex items-center h-16 px-4 border-b bg-background shadow-sm md:px-6">
         <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
         >
            <PackageIcon className="w-6 h-6" />
            <span className="sr-only">Ric&apos;s Bread & Butter</span>
            <h1 className="hidden text-lg font-semibold md:block">Ric&apos;s Bread & Butter</h1>
         </Link>
         <div className="ml-auto flex items-center gap-4">
            <ShoppingCartLink />
            <Link href="#" prefetch={false}>
               <UserAvatar />
            </Link>
         </div>
      </header>
   );
}

export default Header;

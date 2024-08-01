import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import UserIcon from '../icons/usericon';

function UserAvatar() {
   return (
      <Avatar className="h-12 w-12 bg-muted rounded-full">
         <AvatarImage src="" />
         <AvatarFallback>
            <UserIcon className="w-6 h-6" />
         </AvatarFallback>
      </Avatar>
   );
}

export default UserAvatar;

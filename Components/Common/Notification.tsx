import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/Components/ui/popover"
  import { FaRegBell } from "react-icons/fa";


  export default function Notification() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-(--profile-image-border-color) cursor-pointer bg-slate-50">
                    <FaRegBell className="text-1xl text-[#64748b]" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-sm p-0" side="bottom" align="end">
                <div className="p-4">
                    <p className=" font-medium">Notifications</p>
                </div>
            </PopoverContent>
        </Popover>
    );
  }
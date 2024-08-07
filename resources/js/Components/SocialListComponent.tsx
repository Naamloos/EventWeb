import { Social } from "@/types/Social";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { Link } from "@inertiajs/react";
import { IconPickerItem } from "react-fa-icon-picker-alen";

export default function SocialListComponent({socials} : {socials: Social[]}) {
    library.add(fab);
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {socials.map((social) => (
          <li key={social.id} className="flex justify-between gap-x-6 py-3 px-5">
            <div className="flex min-w-0 gap-x-4">
                {/* @ts-ignore */}
                <IconPickerItem icon={social.icon} className="flex-none text-black" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{social.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{social.url}</p>
                <Link href={route('socials.destroy', {id: social.id})} method="delete" className="text-sm font-semibold text-red-600 hover:text-red-900 pr-2">Delete</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

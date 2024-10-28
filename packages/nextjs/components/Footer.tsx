import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="container mx-auto mb-6 lg:mb-6">
      <div className="w-full flex flex-col gap-6 justify-center items-center lg:flex-row lg:gap-0">
        <div>
          <Image src="crosses-1.svg" alt="crosses" className="w-[200px] lg:w-[500px]" width={306} height={50} />
        </div>
        <ul className="menu menu-horizontal w-full">
          {/* Footer links */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a href="https://github.com/BuidlGuidl/nodes" target="_blank" rel="noreferrer" className="link">
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> at
              </p>
              <a
                className="flex justify-center items-center gap-1"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="link">BuidlGuidl</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
          </div>
        </ul>
        <div>
          <Image src="crosses-2.svg" alt="crosses" className="w-[200px] lg:w-[500px]" width={306} height={50} />
        </div>
      </div>
    </div>
  );
};

import React from "react";

type NavbarItemProps = {
  label: string;
};

export default function NavbarItem({ label }: NavbarItemProps) {
  return (
    <div className='hover:text-grey-300 cursor-pointer text-white transition'>
      {label}
    </div>
  );
}

import { Plus, type LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { ReactNode } from "react";

type PropType = {
  title: string;
  description: string;
  icon?: LucideIcon;
  onClick?: (val: any) => void;
  button?: string;
  notification?: ReactNode;
  loading?: boolean
};

interface Props {
  header: PropType;
}
function Header({ header }: Props) {
  const Icon = header?.icon;

  return (
    <header className="flex   justify-between gap-3  items-center">
      <div>
        <h1 className="font-medium sm:text-2xl text-xl flex gap-1 items-center">
          {Icon && <Icon className="text-primary" />}
          {header.title}
        </h1>
        <p className="text-text text-sm ">{header.description}</p>
      </div>
      {header.button && (
        <Button loading={header.loading} onClick={header.onClick}>
          <Plus />
          <span className="sm:block hidden"> {header.button}</span>
        </Button>
      )}
      {header?.notification}
    </header>
  );
}

export default Header;

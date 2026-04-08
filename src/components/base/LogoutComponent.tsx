import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LogoutComponent() {
  const { signout } = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    await signout();
    navigate("/");
  };
  return (
    <Button
      onClick={logout}
      variant={"ghost"}
      className=" justify-start text-text"
    >
      <LogOut size={18} />
      <p className="md:block hidden">Sign Out</p>
    </Button>
  );
}

export default LogoutComponent;

import { Heart } from "lucide-react";
import Card from "../components/base/Card";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import Tab from "../components/base/Tab";

function Auth() {
  const authTabs = [
    {
      value: "signin",
      tab: "Sign In",
      content: <LoginForm />,
    },
    {
      value: "signup",
      tab: "Sign Up",
      content: <SignUpForm />,
    },
  ];

  return (
    <main className="bg-background px-6 md:px-0 flex py-20 items-center justify-center">
      <div className="w-xl space-y-4 ">
        <div data-aos="zoom-in"  className="p-3 w-fit text-white mx-auto rounded-xl bg-primary">
          <Heart />
        </div>

        <p className="font-medium text-xl  text-center">Welcome to Moments</p>
        <p className="text-sm text-text  text-center">
          Start creating unforgettable memories
        </p>

        <Card className="border border-accent/20">
          <Tab tabs={authTabs} />
        </Card>
      </div>
    </main>
  );
}

export default Auth;
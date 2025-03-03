import { LoginForm } from "@/components/auth/Login";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <CardTitle className="capitalize">
            <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-slate-900 to-primary text-transparent bg-clip-text py-2">
              Welcome to voting app
            </h1>
          </CardTitle>
          <CardDescription>Login to vote your favorite clashes</CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}

export default Login;

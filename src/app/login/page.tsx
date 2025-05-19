import LoginForm from './LoginForm';

export default function LoginPage() {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-md rounded-lg border">
        <h2 className="text-center text-xl mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

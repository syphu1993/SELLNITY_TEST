import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-md rounded-lg border">
        <h2 className="text-center text-xl mb-4">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

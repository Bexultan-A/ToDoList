import LoginForm from "@/components/LoginForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">to your to-do account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

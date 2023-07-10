import GoogleButton from '@/components/GoogleButton';

export default async function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-xl">
      <div className="text-4xl mb-5">Sign in</div>
      <GoogleButton />
    </div>
  );
}

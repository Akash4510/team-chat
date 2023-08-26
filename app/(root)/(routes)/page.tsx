import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from '@/components/mode-toggle';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello Discord Clone</h1>
      <p>This is a protected route</p>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
};

export default Home;

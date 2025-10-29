"use client";

import Header from "@/components/Header/Header";

export default function Home() {
<<<<<<< HEAD
  return <Header />;
=======
  const { user, setUser, logout, refreshUser } = useUser();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const router = useRouter();

  return (
    <div>
      {!user && (
        <>
          <Button
            title={"Войти"}
            onClick={() => setIsLoginModalOpen(true)}
            icon={<ProfileIcon />}
          />
          <LoginModal
            getProfile={async (token) => {
              const data = await getProfile(token);
              setUser(data);
            }}
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        </>
      )}
      {user && (
        <>
          <Button
            onClick={() => router.push("/profile")}
            icon={<ProfileIcon />}
          />
        </>
      )}
      <Header />
    </div>
  );
>>>>>>> 90b41b270e9a67161a330b44968a5a45aab49186
}

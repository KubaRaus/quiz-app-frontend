"use client";

import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Twój Profil
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Informacje o Twoim koncie
          </p>
        </div>

        <div className="lg:w-2/3 w-full mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="bg-gray-100 rounded p-8">
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      {user?.email}
                    </h2>
                    <p className="text-gray-600">Użytkownik</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">UID</p>
                    <p className="text-sm text-gray-900 font-mono">
                      {user?.uid}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Konto utworzone</p>
                    <p className="text-lg text-gray-900">
                      {user?.metadata?.creationTime
                        ? new Date(
                            user.metadata.creationTime
                          ).toLocaleDateString("pl-PL")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ostatnie logowanie</p>
                    <p className="text-lg text-gray-900">
                      {user?.metadata?.lastSignInTime
                        ? new Date(
                            user.metadata.lastSignInTime
                          ).toLocaleDateString("pl-PL")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

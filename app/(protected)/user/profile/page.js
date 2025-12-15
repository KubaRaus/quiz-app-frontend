"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { updateProfile } from "firebase/auth";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  // Załaduj aktualne dane użytkownika do formularza
  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        setDataLoading(true);

        // Załaduj dane z Authentication
        setDisplayName(user.displayName || "");
        setPhotoURL(user.photoURL || "");

        // Załaduj adres z Firestore
        try {
          const snapshot = await getDoc(doc(db, "users", user?.uid));
          if (snapshot.exists()) {
            const data = snapshot.data();
            const address = data.address;

            if (address) {
              setStreet(address.street || "");
              setCity(address.city || "");
              setZipCode(address.zipCode || "");
            }
          }
        } catch (error) {
          console.error("Error loading user data: ", error);
          // Nie wyświetlamy błędu jeśli użytkownik nie ma jeszcze dokumentu
        } finally {
          setDataLoading(false);
        }
      }
    };

    loadUserData();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Aktualizacja profilu w Authentication
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      // Zapis adresu do Firestore
      await setDoc(doc(db, "users", user?.uid), {
        displayName: displayName,
        email: user?.email,
        photoURL: photoURL,
        address: {
          street: street,
          city: city,
          zipCode: zipCode,
        },
        updatedAt: new Date(),
      });

      console.log("Profile and address updated successfully");
      setSuccess("Profil i adres zostały zaktualizowane pomyślnie!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      if (error.code === "permission-denied") {
        setError(
          "Brak uprawnień do zapisu danych. Sprawdź reguły bezpieczeństwa Firestore."
        );
      } else {
        setError("Błąd aktualizacji profilu: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Edytuj Profil
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Zaktualizuj informacje o swoim koncie
          </p>
        </div>

        <div className="lg:w-2/3 w-full mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="bg-gray-100 rounded-lg p-8">
                {/* Avatar Preview */}
                <div className="flex items-center justify-center mb-8 pb-8 border-b border-gray-200">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {displayName?.charAt(0)?.toUpperCase() ||
                        user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Success Alert */}
                {success && (
                  <div
                    role="alert"
                    className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded"
                  >
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm">{success}</p>
                    </div>
                  </div>
                )}

                {/* Error Alert */}
                {error && (
                  <div
                    role="alert"
                    className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded"
                  >
                    <div className="flex items-start">
                      <svg
                        className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="font-medium">Błąd aktualizacji profilu</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={onSubmit}>
                  {/* Display Name */}
                  <div className="relative mb-4">
                    <label
                      htmlFor="displayName"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Nazwa wyświetlana
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Wprowadź swoją nazwę"
                      disabled={dataLoading}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-wait"
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email (tylko do odczytu)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email || ""}
                      readOnly
                      disabled
                      className="w-full bg-gray-200 rounded border border-gray-300 text-base outline-none text-gray-500 py-2 px-3 leading-8 cursor-not-allowed"
                    />
                  </div>

                  {/* Photo URL */}
                  <div className="relative mb-4">
                    <label
                      htmlFor="photoURL"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Adres URL zdjęcia profilowego
                    </label>
                    <input
                      type="url"
                      id="photoURL"
                      name="photoURL"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      disabled={dataLoading}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-wait"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Wprowadź URL do swojego zdjęcia profilowego
                    </p>
                  </div>

                  {/* Address Section */}
                  <div className="mb-6 pb-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Adres
                    </h3>

                    {/* Street */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="street"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Ulica
                      </label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="np. Marszałkowska 123"
                        disabled={dataLoading}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-wait"
                      />
                    </div>

                    {/* City */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="city"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Miasto
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="np. Warszawa"
                        disabled={dataLoading}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-wait"
                      />
                    </div>

                    {/* Zip Code */}
                    <div className="relative mb-4">
                      <label
                        htmlFor="zipCode"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Kod pocztowy
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="np. 00-001"
                        disabled={dataLoading}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out disabled:bg-gray-100 disabled:cursor-wait"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || dataLoading}
                    className="w-full text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {dataLoading
                      ? "Ładowanie danych..."
                      : loading
                      ? "Zapisywanie..."
                      : "Zapisz zmiany"}
                  </button>
                </form>

                {/* Account Info */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Informacje o koncie
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">UID:</span>
                      <span className="text-gray-900 font-mono text-xs">
                        {user?.uid}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Konto utworzone:</span>
                      <span className="text-gray-900">
                        {user?.metadata?.creationTime
                          ? new Date(
                              user.metadata.creationTime
                            ).toLocaleDateString("pl-PL")
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ostatnie logowanie:</span>
                      <span className="text-gray-900">
                        {user?.metadata?.lastSignInTime
                          ? new Date(
                              user.metadata.lastSignInTime
                            ).toLocaleDateString("pl-PL")
                          : "N/A"}
                      </span>
                    </div>
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

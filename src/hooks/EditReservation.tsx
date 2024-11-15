import toast from "react-hot-toast";

interface LoginReservation {
  email: string;
  password: string;
}

export const LoginReservation = async ({
  email,
  password,
}: LoginReservation) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || `Error en la solicitud: ${response.status}`
      );
    }

    const data = await response.text();
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in LoginReservation:", error);
    }

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }

    return null;
  }
};

interface GetReservation {
  email: string;
  token: string;
}

export const GetReservation = async ({ email, token }: GetReservation) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in GetReservation:", error);
    }

    if (error instanceof Error) {
      console.warn(error.message);
    } else {
      toast.error("Something went wrong");
    }

    return null;
  }
};

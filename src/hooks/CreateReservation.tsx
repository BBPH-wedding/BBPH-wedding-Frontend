import toast from "react-hot-toast";

interface CreateReservation {
  email: string;
  password: string;
}

export const postReservation = async ({
  email,
  password,
}: CreateReservation) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
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
      console.warn("Error in postReservation:", error);
    }

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Something went wrong");
    }

    return null;
  }
};

interface ConfirmReservation {
  confirmationToken: string;
  email: string;
}

export const reservationConfirmation = async ({
  confirmationToken,
  email,
}: ConfirmReservation) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/confirm`,
      {
        method: "POST",
        body: JSON.stringify({
          confirmationToken,
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const token = await response.text();
    return token;
  } catch (error) {
    toast.error("Invalid code");
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in reservationConfirmation:", error);
    }
    return null;
  }
};

interface Person {
  firstName: string;
  lastName: string;
}
interface CompleteReservation {
  token: string;
  email: string;
  status: string;
  notes: string;
  phoneNumber: string;
  peopleComing: Person[];
}

export const completeReservation = async ({
  token,
  email,
  status,
  notes,
  phoneNumber,
  peopleComing,
}: CompleteReservation) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations`,
      {
        method: "PATCH",
        body: JSON.stringify({
          email,
          status,
          notes,
          phoneNumber,
          peopleComing,
        }),
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
    toast.error("Try again later");
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in completeReservation:", error);
    }
    return null;
  }
};

interface ResendCode {
  email: string;
}

export const resendCode = async ({ email }: ResendCode) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/re-send-token/${email}`
    );

    if (!response.ok) {
      throw new Error(`Error in the request: ${response.status}`);
    }

  } catch (error) {
    toast.error("Try again later");
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in resendCode:", error);
    }
    return null;
  }
};

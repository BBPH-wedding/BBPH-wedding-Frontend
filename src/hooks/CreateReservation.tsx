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
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.text();
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in postReservation:", error);
    }
    return null;
  }
};

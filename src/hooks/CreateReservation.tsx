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
      console.error("Error al enviar la reserva:", response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error general:", error);
    return null;
  }
};

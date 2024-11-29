export interface Pagination {
  page: number;
  limit: number;
  status?: string;
  token: string;
}

export const getReservations = async ({
  page = 1,
  limit = 10,
  status,
  token,
}: Pagination) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/reservations?page=${page}&limit=${limit}`;

    if (status) {
      url += `&status=${status}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in getReservations:", error);
    }
    return null;
  }
};

export const exportToExcel = async (token: string | null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/export`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reservations.xlsx");
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReservation = async (
  email: string,
  token: string | null
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${email}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Error in deleteReservation:", error);
    }
    return null;
  }
};

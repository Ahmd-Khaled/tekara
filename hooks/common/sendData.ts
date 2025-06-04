import Cookies from "js-cookie";


let userToken = "";
if (typeof window !== "undefined") {
  userToken = Cookies.get("token") || localStorage.getItem("token") || "";
}

export const sendData = async <T>(
  url: string,
  data: T,
  locale: string
): Promise<any> => {


  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": locale || "en",
      },
    });

    if (!res.ok) {
      console.error("Request failed:", res.statusText);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const API_END_POINT = "https://kdt-frontend.todo-api.programmers.co.kr";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const json = res.json();
      return json;
    }

    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
};

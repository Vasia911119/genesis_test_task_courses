import axios from "axios";

const API_BASE_URL = "https://api.wisey.app/api/v1";

async function getToken() {
  if (
    !localStorage.getItem("wiseyToken") ||
    localStorage.getItem("wiseyToken") === ""
  ) {
    const response = await axios.get(
      `${API_BASE_URL}/auth/anonymous?platform=subscriptions`
    );
    const token = response.data.token;
    localStorage.setItem("wiseyToken", token);
    return token;
  } else {
    const token = localStorage.getItem("wiseyToken");
    return token;
  }
}

export async function getCourses() {
  const token = await getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API_BASE_URL}/core/preview-courses`, {
    headers,
  });
  return response.data;
}

export async function getCourseById(courseId) {
  const token = await getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(
    `${API_BASE_URL}/core/preview-courses/${courseId}`,
    { headers }
  );
  return response.data;
}

export async function getLessonsForCourse(courseId) {
  const token = await getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(
    `${API_BASE_URL}/core/preview-courses/${courseId}/lessons`,
    { headers }
  );
  return response.data;
}

export async function getLessonById(id) {
  const token = await getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const response = await axios.get(`${API_BASE_URL}/lessons/${id}`, {
    headers,
  });
  return response.data;
}

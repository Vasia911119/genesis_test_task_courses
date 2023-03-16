import axios from "axios";

const API_BASE_URL = "https://api.wisey.app/api/v1";

async function getToken() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/anonymous?platform=subscriptions`
    );
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCourses() {
  try {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${API_BASE_URL}/core/preview-courses`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCourseById(courseId) {
  try {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(
      `${API_BASE_URL}/core/preview-courses/${courseId}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLessonsForCourse(courseId) {
  try {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(
      `${API_BASE_URL}/core/preview-courses/${courseId}/lessons`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getLessonById(id) {
  try {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${API_BASE_URL}/lessons/${id}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

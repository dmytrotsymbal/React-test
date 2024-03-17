const API_BASE_URL = "https://localhost:7091/api"; // Базовый URL для всех API-запросов

//=======================================================================

export const getEmployees = async (pageNumber, pageSize) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/employees?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getEmployee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const searchEmployees = async (name) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/employees/search?name=${name}`
    );
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "There was a problem with the fetch operation during search:",
      error
    );
    throw error;
  }
};

export const createEmployee = async (employeeData) => {
  // получает данные с формы
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      // базовый ЮРЛ/название контроллера
      method: "POST", // метод пост
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData), // преобразует объект employeeData в строку JSON для отправки
    });
    if (!response.ok) {
      throw new Error("Failed to create new employee");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const putEmployee = async (id, employeeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update employee with ID ${id}. Status: ${response.status}`
      );
    }

    if (response.status !== 204) {
      return response.json();
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete employee");
    }
    return await response.text();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const getEmployeesCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/count`);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

//=======================================================================

// функция для получения всех событий
export const getEvents = async (pageNumber, pageSize) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/events?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ); // базовый ЮРЛ/название контроллера для событий
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    const data = await response.json();
    console.log("Data received from getEvents:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

export const getEventsCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/count`); // базовый ЮРЛ/название контроллера для событий
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    const data = await response.json();
    console.log("Data received from getEventsCount:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};

import axiosConfig from "./api.config";
import { API_ENDPOINTS, HTTP_STATUS, ERROR_MESSAGES } from "./constants";

export class TodoApi {
  constructor() {
    this.api = axiosConfig.getInstance();
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  async RetryRequest(requestFn, retries = this.maxRetries) {
    try {
      return await requestFn();
    } catch (error) {
      const shouldRetry =
        !error.response ||
        (error.response.status >= 500 && error.response.status < 599);

      if (shouldRetry && retries > 0) {
        await this.delay(this.retryDelay);
        return this.RetryRequest(requestFn, retries - 1);
      }

      throw error;
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAllTodos() {
    return this.RetryRequest(async () => {
      
      try {
        
        const response = await this.api.get(API_ENDPOINTS.TODOS);
        
        console.log(response.data);
        return response.data;
      } catch (error) {
        if (error.resolve?.status == HTTP_STATUS.NO_CONTENT) {
          return [];
        }
        throw this.handleError(error);
      }
    });
  }

  async createTodo(todoData) {
    if (!todoData || typeof todoData !== "object") {
      throw new Error("todoData is required and must be an object");
    }

    const { task, isCompleted } = todoData;

    if (!task || typeof task !== "string" || task.trim().length === 0) {
      throw new Error("Task is required and must be a non-empty string");
    }

    if (typeof isCompleted !== "boolean") {
      throw new Error("isCompleted must be a boolean");
    }

    return this.RetryRequest(async () => {
      try {
        const response = await this.api.post(API_ENDPOINTS.TODOS, {
          task: task.trim(),
          isCompleted: isCompleted,
        });
        return response.data;
      } catch (error) {
        throw this.handleError(error);
      }
    });
  }

  async updateTodo(todoId, updates) {
    
    if (!todoId) {
      throw new Error("todo id is required !");
    }

    if (
      !updates ||
      typeof updates !== "object" ||
      Object.keys(updates).length === 0
    ) {
      throw new Error("updates is required and must not be empty");
    }

    const allowedFields = ["task", "isCompleted"]
    const invalidFields = Object.keys(updates).filter(
      (key) => !allowedFields.includes(key)
    );

    if (invalidFields.length > 0) {
      throw new Error(`invalid fields : ${invalidFields.join(", ")}`);
    }

    if (
      updates.task !== undefined &&
      (typeof updates.task !== "string" || updates.task.trim().length === 0)
    ) {
      throw new Error("task must be a non-empty string")
    }

    if (
      updates.isCompleted !== undefined &&
      typeof updates.isCompleted !== "boolean"
    ) {
      throw new Error("is completed must be a boolean");
    }

    return this.RetryRequest(async () => {
      try {
        const response = await this.api.patch(
          `${API_ENDPOINTS.TODOS}/${todoId}`,
          updates
        );
        console.log(response.data);
        
        return response.data;
      } catch (error) {
        throw this.handleError(error);
      }
    });
  }

  async deleteTodo(todoId) {
    if (!todoId) {
      throw new Error("todo id is required !");
    }

    return this.RetryRequest(async () => {
      try {
        const response = await this.api.delete(
          `${API_ENDPOINTS.TODOS}/${todoId}`
        );
        return response.data;
      } catch (error) {
        throw this.handleError(error);
      }
    });
  }

  handleError(error) {
    if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;
      const userMessage = this.getUserFreiendlyMessage(status);

      return {
        type: "API_ERROR",
        status,
        message: serverMessage || userMessage,
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        type: "NETWORK_ERROR",
        message: serverMessage || userMessage,
      };
    } else {
      return {
        type: "UNKNOWN_ERROR",
        message: error.message || ERROR_MESSAGES.UNKNOWN_ERROR,
      };
    }
  }

  getUserFriendlyMessage(status) {
    const messages = {
      [HTTP_STATUS.BAD_REQUEST]: ERROR_MESSAGES.VALIDATION_ERROR,
      [HTTP_STATUS.UNAUTHORIZED]: ERROR_MESSAGES.UNAUTHORIZED,
      [HTTP_STATUS.FORBIDDEN]: ERROR_MESSAGES.FORBIDDEN,
      [HTTP_STATUS.NOT_FOUND]: ERROR_MESSAGES.NOT_FOUND,
      [HTTP_STATUS.TOO_MANY_REQUESTS]: ERROR_MESSAGES.RATE_LIMITED,
      [HTTP_STATUS.INTERNAL_SERVER_ERROR]: ERROR_MESSAGES.SERVER_ERROR,
      [HTTP_STATUS.BAD_GATEWAY]: ERROR_MESSAGES.SERVER_ERROR,
      [HTTP_STATUS.SERVICE_UNAVAILABLE]: ERROR_MESSAGES.SERVER_ERROR,
      [HTTP_STATUS.GATEWAY_TIMEOUT]: ERROR_MESSAGES.SERVER_ERROR,
    };

    return messages[status] || `An error occured (HTTP ${status})`;
  }
}

const todoApi = new TodoApi();

export default todoApi;
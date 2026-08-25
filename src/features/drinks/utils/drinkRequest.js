import { API_URL } from "../../../config/api";

export function getDrinkRequestConfig(drink) {
  const isEditing = drink !== null;

  return {
    isEditing,
    url: isEditing
      ? `${API_URL}/api/v1/drinks/${drink.id}`
      : `${API_URL}/api/v1/drinks`,
    method: isEditing ? "PATCH" : "POST",
  };
}
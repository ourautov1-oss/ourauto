"use server";

export async function addCar(formData: FormData) {
  const data = {
    make: formData.get("make"),
    model: formData.get("model"),
    year: formData.get("year"),
    price: formData.get("price"),
    mileage: formData.get("mileage"),
  };

  console.log("ADD CAR SUBMITTED:", data);

  return { success: true };
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, TrendingUp, Info } from "lucide-react";


type FormValues = {
  Item_Weight: number;
  Item_Visibility: number;
  Item_MRP: number;
  Item_Fat_Content: "Low Fat" | "Regular";
  Outlet_Size: "Small" | "Medium" | "High";
  Outlet_Location_Type: "Tier 1" | "Tier 2" | "Tier 3";
  Outlet_Type:
    | "Supermarket Type1"
    | "Supermarket Type2"
    | "Supermarket Type3"
    | "Grocery Store";
  New_Item_Type: "Food" | "Drinks" | "Non-Consumables";
};

const initialState: FormValues = {
  Item_Weight: "",
  Item_Visibility: "",
  Item_MRP: "",
  Item_Fat_Content: "Low Fat",
  Outlet_Size: "Small",
  Outlet_Location_Type: "Tier 1",
  Outlet_Type: "Supermarket Type1",
  New_Item_Type: "Food",
};

export default function FormPage() {
  const [values, setValues] = useState<FormValues>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      router.push(`/result?prediction=${encodeURIComponent(data.prediction)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <TrendingUp className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Product & Outlet Details
          </h1>
          <p className="text-muted-foreground text-lg">
            Fill in the information below to predict sales performance
          </p>
        </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-2xl shadow-md space-y-8"
      >
        {/* Product Information */}
        <div>
          <h2 className="text-lg font-medium mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex flex-col">
              <span>Item Weight (kg) *</span>
              <input
                required
                type="number"
                step="0.1"
                value={values.Item_Weight}
                onChange={(e) => set("Item_Weight", parseFloat(e.target.value))}
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </label>
            <label className="flex flex-col">
              <span>Item Visibility *</span>
              <input
                required
                type="number"
                step="0.01"
                value={values.Item_Visibility}
                onChange={(e) =>
                  set("Item_Visibility", parseFloat(e.target.value))
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </label>
            <label className="flex flex-col">
              <span>Item MRP (₹) *</span>
              <input
                required
                type="number"
                step="1"
                value={values.Item_MRP}
                onChange={(e) => set("Item_MRP", parseFloat(e.target.value))}
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </label>
          </div>
        </div>

        {/* Product Classification */}
        <div>
          <h2 className="text-lg font-medium mb-4">Product Classification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span>Item Fat Content *</span>
              <select
                placeholder="Select fat content"
                value={values.Item_Fat_Content}
                onChange={(e) =>
                  set(
                    "Item_Fat_Content",
                    e.target.value as FormValues["Item_Fat_Content"]
                  )
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              >
                {/* <option value="">Select fat content</option> */}
                <option>Low Fat</option>
                <option>Regular</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span>Item Category *</span>
              <select
                value={values.New_Item_Type}
                placeholder="Select item category"
                onChange={(e) =>
                  set(
                    "New_Item_Type",
                    e.target.value as FormValues["New_Item_Type"]
                  )
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              >
                {/* <option value="">Select item category</option> */}
                <option>Food</option>
                <option>Drinks</option>
                <option>Non-Consumables</option>
              </select>
            </label>
          </div>
        </div>

        {/* Outlet Information */}
        <div>
          <h2 className="text-lg font-medium mb-4">Outlet Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span>Outlet Size *</span>
              <select
                value={values.Outlet_Size}
                aria-placeholder="Select outlet size"
                onChange={(e) =>
                  set("Outlet_Size", e.target.value as FormValues["Outlet_Size"])
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              >
               {/* <option value="">Select outlet size</option> */}
                <option >Small</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span>Outlet Location Type *</span>
              <select
                value={values.Outlet_Location_Type}
                onChange={(e) =>
                  set(
                    "Outlet_Location_Type",
                    e.target.value as FormValues["Outlet_Location_Type"]
                  )
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              >
                {/* <option value="">Select location type</option> */}
                <option>Tier 1</option>
                <option>Tier 2</option>
                <option>Tier 3</option>
              </select>
            </label>
            <label className="flex flex-col">
              <span>Outlet Type *</span>
              <select
                value={values.Outlet_Type}
                onChange={(e) =>
                  set("Outlet_Type", e.target.value as FormValues["Outlet_Type"])
                }
                className="w-full p-2 rounded-lg border border-gray-300"
              >
                {/* <option value="">Select outlet type</option> */}
                <option>Supermarket Type1</option>
                <option>Supermarket Type2</option>
                <option>Supermarket Type3</option>
                <option>Grocery Store</option>
              </select>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setValues(initialState)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
          >
            Reset Form
          </button>
          <button
            disabled={submitting}
            type="submit"
            className="px-6 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Predicting..." : "Predict Sales"}
          </button>
        </div>
      </form>
    </main>
  );
}

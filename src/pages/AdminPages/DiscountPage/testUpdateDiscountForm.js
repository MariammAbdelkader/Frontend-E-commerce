import React, { useState } from "react";
import { updateDiscount } from "../../DiscountPage/DiscountServices";

const UpdateDiscountForm = () => {
  const [id, setId] = useState("");
  const [percentage, setPercentage] = useState("");
  const [type, setType] = useState("product");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    const result = await updateDiscount(type, parseInt(id), {
      percentage: parseFloat(percentage),
    });

    if (result.success) {
      setMessage(`✅ ${result.message}`);
    } else {
      setMessage(`❌ ${result.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Update Discount</h2>

      <label>
        ID:
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Percentage:
        <input
          type="number"
          step="0.1"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="product">Product</option>
          <option value="category">Category</option>
        </select>
      </label>
      <br />

      <button type="submit">Update</button>

      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdateDiscountForm;

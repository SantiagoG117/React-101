import React, { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import zod from "zod";

/* 
  ? Theory concepts useForm() hook and form validation
*/

const categories = ["Groceries", "Utilities", "Entertainment"];

//Define a schema
const schema = zod.object({
  description: zod
    .string()
    .min(3, { message: "Description must be at least 3 characters" }),
  amount: zod
    .number({ invalid_type_error: "Amount field is required" })
    .min(0.01, { message: "Amount must be more than 1 cent" })
    .max(1000000),
  category: zod.string().nonempty({ message: "Category field is required" }),
});

//Infer the type of the schema
type FormData = zod.infer<typeof schema>;

function AppExpenseTracker() {
  const [expenses, setExpenses] = useState<FormData[]>([]);
  const [currentCategory, setCurrentCategory] = useState("all categories");
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  //Event hanlders
  const handleOnAddExpense = (data: FieldValues) => {
    setExpenses([
      ...expenses,
      {
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
    //Clear the form
    reset();
  };

  const handleOnDelete = (index: number) => {
    setExpenses(expenses.filter((expense, i) => i !== index));
  };

  const handleOnSelectCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  const filterVisibleExpenses = expenses.filter(
    (expense) =>
      currentCategory === "all categories" ||
      expense.category === currentCategory
  );

  const calculateTotal = () => {
    console.log("Calculating total");
    return expenses
      .filter(
        (expense) =>
          currentCategory === "all categories" ||
          expense.category === currentCategory
      )
      .reduce((accumulate, expense) => accumulate + Number(expense.amount), 0)
      .toFixed(2);
  };

  return (
    <>
      {/* Form */}
      <form
        className="container mb-2 px-2 pt-2"
        onSubmit={handleSubmit(handleOnAddExpense)}
      >
        <div className="mb-2">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            step="0.01"
            className="form-control"
          />
        </div>
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}

        <div className="mb-2">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-control"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>

      {/* Filter */}
      <div className="container">
        <select className="form-select mb-2" onChange={handleOnSelectCategory}>
          <option value="all categories">All categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Expenses Table */}
      {filterVisibleExpenses.length !== 0 && (
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .filter(
                  (expense) =>
                    currentCategory === "all categories" ||
                    expense.category === currentCategory
                )
                .map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.description}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleOnDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>${calculateTotal()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}

export default AppExpenseTracker;

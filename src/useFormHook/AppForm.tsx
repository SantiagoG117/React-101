import React, { FormEvent, useRef } from "react";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//Define a schema
const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  age: z
    .number({ invalid_type_error: "Age field is required" })
    .min(18, { message: "Age must be at least 18." })
    .max(120),
});

/*
    Infer the type of the schema
        A type is a way to define the shape of data. It specifies what properties an object can have and what types those properties should be
        typeof opterator gets the type of the schema object
*/
type FormData = z.infer<typeof schema>;

function AppForm() {
  //Get a form object
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) }); //Integrate react-hook-form with zod

  const person = { name: "", age: 0 };

  const onSubmit = (data: FieldValues) => {
    person.name = data.name;
    person.age = data.age;
    console.log("Person:", person);
  };

  return (
    <form
      className="container mb-3 px-3 pt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="number" 
          className="form-control"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <button
        className="btn btn-primary mt-2"
        type="submit"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
}

export default AppForm;

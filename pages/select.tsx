import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SelectOptions = [
  {
    value: "one",
    label: "One",
  },
  {
    value: "two",
    label: "Two",
  },
  {
    value: "three",
    label: "Three",
  },
] as const;

type SelectOptionValues = typeof SelectOptions[number]["value"];

type RequestBody = {
  select: SelectOptionValues;
};

const schema = yup.object().shape({
  select: yup
    .mixed<SelectOptionValues>()
    .oneOf(SelectOptions.map((option) => option.value))
    .required("Required"),
});

interface Schema extends yup.InferType<typeof schema> {}

export default function Select() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema, { strict: true }),
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      select: data.select,
    };

    console.log(submitData);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            {...register("select", {
              setValueAs: (v) => (v ? v : undefined),
            })}
            defaultValue=""
          >
            <option value="" disabled>
              Please Select
            </option>
            {SelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.select && <p>{errors.select.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

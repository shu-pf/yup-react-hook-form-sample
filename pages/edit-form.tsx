import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type SelectEnum = "one" | "two" | "three";

type RequestBody = {
  text: string;
  number: number;
  select: SelectEnum | null;
};

const schema = yup.object().shape({
  text: yup.string().required("Text is required"),
  number: yup.string().matches(/^[0-9]+$/, "Must be only digits"),
  select: yup
    .string()
    .oneOf(["", "one", "two", "three"] as const)
    .defined(),
});

interface Schema extends yup.InferType<typeof schema> {}

const initialValues = {
  text: "text",
  number: 10,
  select: null,
};

export default function EditForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema, { strict: true }),
    defaultValues: {
      text: initialValues.text,
      number: initialValues.number.toString(),
      select: initialValues.select === null ? "" : initialValues.select,
    },
  });

  const onSubmit = (data: Schema) => {
    const submitData: RequestBody = {
      text: data.text,
      number: Number(data.number),
      select: data.select === "" ? null : data.select,
    };

    console.log(submitData);
  };

  return (
    <>
      <main>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input {...register("text")} />
            {errors.text && <p>{errors.text.message}</p>}
          </div>
          <div>
            <input {...register("number")} />
            {errors.number && <p>{errors.number.message}</p>}
          </div>
          <div>
            <select {...register("select")} defaultValue="">
              <option value="">Please Select</option>
              <option value="one">One</option>
              <option value="two">Two</option>
              <option value="three">Three</option>
            </select>
            {errors.select && <p>{errors.select.message}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}
